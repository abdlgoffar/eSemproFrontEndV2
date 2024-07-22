
import * as React from 'react';
import { Avatar, Box, Button, Chip, CircularProgress, CssBaseline, Divider, FormLabel, Grid, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Select, Typography, styled } from "@mui/material";

import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";
import { headStudyProgramPages } from "../helpers/constants";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Navigate, useParams } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import NotFound from './NotFound';
import { createProposalApprovalStatusRoomAndExaminer, getHeadStudyProgramProposalByProposalId } from "../api/headStudyPrograms";
import { getAllExaminers } from "../api/examiners";
import { getAllRooms } from "../api/rooms";
import { getNewProposalPdf, getOldProposalPdf, getProposalPdf } from '../api/proposals';

const LayoutGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));


function Fill(params) {

    const { proposalId } = useParams();
    const { token } = useSession();
    const [proposal, setProposal] = React.useState("");
    const [getLoading, setGetLoading] = React.useState(true);
    const [postLoading, setPostLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessages, setErrorMessages] = React.useState([]);
    const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
    const [redirectDataNotFound, setRedirectDataNotFound] = React.useState(false);
    const [disabledButton, setDisabledButton] = React.useState(false);
    const [examiners, setExaminers] = React.useState([]);
    const [rooms, setRooms] = React.useState([]);
    const [supervisors, setSupervisors] = React.useState([]);
    const [room, setRoom] = React.useState("");

    const [examinerOne, setExaminerOne] = React.useState(null);
    const [examinerTwo, setExaminerTwo] = React.useState(null);
    const [examinerThree, setExaminerThree] = React.useState(null);
    const [examiners_id, setExaminersId] = React.useState([]);

    const getStatusColor = (status) => {

        switch (status) {
            case 'rejected':
                return 'red';
            case 'pending':
                return '#6200ea';
            case 'revision':
                return '#ffd600';
            case 'approved':
                return 'green';
            default:
                return 'black';
        }
    };

    React.useEffect(() => {
        const updatedExaminersId = [];
        if (examinerOne !== null) updatedExaminersId.push(examinerOne);
        if (examinerTwo !== null) updatedExaminersId.push(examinerTwo);
        if (examinerThree !== null) updatedExaminersId.push(examinerThree);
        setExaminersId(updatedExaminersId);
    }, [examinerOne, examinerTwo, examinerThree]);

    // Get data
    React.useEffect(() => {
        async function get() {
            try {
                const response = await getAllExaminers(token);
                setExaminers(response.data);
            } catch (error) {
                console.log('Error get all examiners ', error.message);
            }
        }
        get()
    }, [token]);

    React.useEffect(() => {
        async function get() {
            try {
                const response = await getAllRooms(token);
                setRooms(response.data);
            } catch (error) {
                console.log('Error get all rooms ', error.message);
            }
        }
        get()
    }, [token]);

    // Clean state
    React.useEffect(() => {
        if (error === true) {
            setTimeout(() => {
                setError(false);
            }, 5000);
        }
    }, [error]);

    // Get data
    React.useEffect(() => {
        async function get() {
            try {
                const response = await getHeadStudyProgramProposalByProposalId(token, proposalId);
                if (response.proposal.head_study_program_approval_status === "approved") setDisabledButton(true);
                setRedirectDataNotFound(false);
                setProposal(response.proposal);
                setSupervisors(response.supervisors);
            } catch (error) {
                setRedirectDataNotFound(true);
                console.log('Error get proposal data by id ', error.message);
            } finally {
                setGetLoading(false);
            }
        }
        get();
    }, [proposalId, token]);



    const handleDownloadOldPdf = async () => {
        try {

            const response = await getOldProposalPdf(proposalId, token);

            // Check Content-Type header
            const contentType = response.headers.get('Content-Type');


            const url = window.URL.createObjectURL(new Blob([response], { type: contentType }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${proposal.title}`);
            document.body.appendChild(link);
            link.click();

            // clear URL
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            setGetLoading(true);
            console.error('Error get proposal pdf: ', error);
        }
    }

    const handleDownloadNewPdf = async () => {
        try {

            const response = await getNewProposalPdf(proposalId, token);

            // Check Content-Type header
            const contentType = response.headers.get('Content-Type');


            const url = window.URL.createObjectURL(new Blob([response], { type: contentType }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${proposal.title}`);
            document.body.appendChild(link);
            link.click();

            // clear URL
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            setGetLoading(true);
            console.error('Error get proposal pdf: ', error);
        }
    }



    async function createProposalApprovalStatusRoomAndExaminerSubmit(e) {
        e.preventDefault();

        setPostLoading(true);

        const body = {
            "room": room,
            "examiners": examiners_id
        }

        try {
            let response = await createProposalApprovalStatusRoomAndExaminer(body, token, proposalId);
            console.log(response);
            setPostLoading(false);
            setRedirectToReferrer(true);
        } catch (error) {
            setPostLoading(false);
            if (error.response) {
                setError(true);
                setErrorMessages(error.response.data.errors.messages);
            }
        }


    }


    if (redirectDataNotFound) return (<NotFound />)


    if (redirectToReferrer) return <Navigate to="/head-study-programs/proposal" />;

    return (
        <>
            {
                getLoading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                        }}
                    >
                        <CircularProgress />
                    </Box >
                ) : (
                    <Grid container spacing={3}>
                        {/* Row one */}
                        <Grid item xs={12}>
                            <form onSubmit={createProposalApprovalStatusRoomAndExaminerSubmit}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Grid container spacing={3}>
                                        <LayoutGrid item xs={12} md={3}>
                                            <Paper elevation={8} sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                                <Avatar alt="Remy Sharp"
                                                    variant="square"
                                                    src=""
                                                    sx={{

                                                        width: 200,
                                                        height: 200,
                                                    }}>

                                                </Avatar>
                                            </Paper>
                                            <Paper square variant="outlined" sx={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: 1, paddingY: 2 }}>
                                                <Typography variant="subtitle2">
                                                    Name: {proposal.name}
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    Nrp: {proposal.nrp}
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    Phone: {proposal.phone}
                                                </Typography>
                                            </Paper>

                                        </LayoutGrid>

                                        <LayoutGrid item xs={12} md={9}>
                                            <Typography variant="body1">
                                                {proposal.title}
                                            </Typography>
                                            <div style={{ width: "100%" }}>
                                                <Chip size='small' color="primary" variant="outlined" style={{ marginRight: "10px", marginTop: "10px" }} onClick={handleDownloadOldPdf} sx={{}} icon={<FileDownloadIcon />} label="Proposal" />
                                                <Chip size='small' color="primary" variant="outlined" style={{ marginTop: "10px" }} onClick={handleDownloadNewPdf} sx={{}} icon={<FileDownloadIcon />} label="Revisi" />
                                            </div>
                                            <Divider textAlign="left" sx={{ marginTop: 3 }}><Chip label={`Dosen Pembimbing`} size="small" /></Divider>

                                            {
                                                supervisors.map((v, i) => (
                                                    <List key={`supervisor-${i}`} sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper', padding: 0 }}>
                                                        <ListItem alignItems="flex-start">
                                                            <ListItemAvatar>
                                                                <Avatar alt="Remy Sharp" src="" />
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={v.name}
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography component="span" sx={{
                                                                            textTransform: 'uppercase',
                                                                            fontSize: '0.6rem',
                                                                            display: "block",
                                                                            color: getStatusColor(v.supervisor_approval_status)
                                                                        }}>
                                                                            {v.supervisor_approval_status}
                                                                        </Typography>
                                                                        {v.suggestion && (
                                                                            <React.Fragment>
                                                                                <Typography
                                                                                    sx={{ display: 'inline' }}
                                                                                    component="span"
                                                                                    variant="body2"
                                                                                    color="text.primary"
                                                                                >
                                                                                    {"Catatan  "}
                                                                                </Typography>
                                                                                <Typography
                                                                                    component="span"
                                                                                    variant="body2"
                                                                                    color="text.secondary"
                                                                                >
                                                                                    {v.suggestion}
                                                                                </Typography>
                                                                            </React.Fragment>
                                                                        )}
                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </ListItem>
                                                    </List>
                                                ))
                                            }
                                            <FormLabel htmlFor="examiner-1" sx={{ marginTop: 2 }}>
                                                Dosen Penguji 1
                                            </FormLabel>
                                            <Select
                                                id="examiner-1"
                                                variant="outlined"
                                                defaultValue={""}
                                                onChange={e => setExaminerOne(e.target.value)}>
                                                {
                                                    examiners.map((v, i) => (
                                                        <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            {(errorMessages.examiners && error) && <p style={{ color: 'red' }}>{errorMessages.examiners}</p>}
                                            {(errorMessages.supervisor_cannotbe_examiner && error) && <p style={{ color: "red" }}>{errorMessages.supervisor_cannotbe_examiner}</p>}
                                            <FormLabel htmlFor="examiner-2" sx={{ marginTop: 2 }}>
                                                Dosen Penguji 2
                                            </FormLabel>
                                            <Select
                                                id="examiner-2"
                                                variant="outlined"
                                                defaultValue={""}
                                                onChange={e => setExaminerTwo(e.target.value)}>
                                                {
                                                    examiners.map((v, i) => (
                                                        <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            {(errorMessages.examiners && error) && <p style={{ color: 'red' }}>{errorMessages.examiners}</p>}
                                            {(errorMessages.supervisor_cannotbe_examiner && error) && <p style={{ color: "red" }}>{errorMessages.supervisor_cannotbe_examiner}</p>}
                                            <FormLabel htmlFor="examiner-3" sx={{ marginTop: 2 }}>
                                                Dosen Penguji 3
                                            </FormLabel>
                                            <Select
                                                id="examiner-3"
                                                variant="outlined"
                                                defaultValue={""}
                                                onChange={e => setExaminerThree(e.target.value)}>
                                                {
                                                    examiners.map((v, i) => (
                                                        <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            {(errorMessages.examiners && error) && <p style={{ color: 'red' }}>{errorMessages.examiners}</p>}
                                            {(errorMessages.supervisor_cannotbe_examiner && error) && <p style={{ color: "red" }}>{errorMessages.supervisor_cannotbe_examiner}</p>}
                                            <FormLabel htmlFor="room" sx={{ marginTop: 2 }}>
                                                Kelas
                                            </FormLabel>
                                            <Select
                                                id="room"
                                                variant="outlined"
                                                defaultValue={""}
                                                onChange={e => setRoom(e.target.value)}>
                                                {
                                                    rooms.map((v, i) => (
                                                        <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            {(errorMessages.room && error) && <p style={{ color: 'red' }}>{errorMessages.room}</p>}
                                            <Button disabled={disabledButton} sx={{ marginY: 2, width: "100%" }} variant="outlined" type='submit'>
                                                {postLoading ? <CircularProgress sx={{ color: "#1975D1" }} size={24} /> : "Simpan"}
                                            </Button>
                                        </LayoutGrid>

                                    </Grid>
                                </Paper>
                            </form>

                        </Grid>

                    </Grid >
                )
            }
        </>


    )
}

const HeadStudyProgramProposalDetail = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer title={"Penentuan Dosen penguji dan Kelas"} pages={headStudyProgramPages()} />

            {/* Content */}
            <Feed>
                <Fill />
            </Feed>

        </Box>

    )
}

export default HeadStudyProgramProposalDetail;