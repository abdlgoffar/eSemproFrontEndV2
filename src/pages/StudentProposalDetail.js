import * as React from 'react';

import { Alert, Avatar, Box, Button, Chip, CircularProgress, CssBaseline, Grid, List, ListItem, ListItemText, Paper, Typography, styled } from "@mui/material";

import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";
import { studentPages } from "../helpers/constants";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { getStudentProposalByProposalId, revisionProposal } from '../api/students';
import { useParams } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';
import NotFound from './NotFound';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { getNewProposalPdf, getOldProposalPdf } from '../api/proposals';



const LayoutGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));



function Fill(params) {

    const [pdf, setPdf] = React.useState();
    const { proposalId } = useParams();
    const { token } = useSession();
    const [proposal, setProposal] = React.useState("");
    const [student, setStudent] = React.useState("");
    const [getLoading, setGetLoading] = React.useState(true);
    const [postLoading, setPostLoading] = React.useState(false);
    const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
    const [redirectDataNotFound, setRedirectDataNotFound] = React.useState(false);
    const [disabledButton, setDisabledButton] = React.useState(true);
    const [examiners, setExaminers] = React.useState([]);
    const [supervisors, setSupervisors] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [errorMessages, setErrorMessages] = React.useState([]);
    const [coordinators, setCoordinators] = React.useState([]);

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

    const getStatusColor2 = (status) => {

        switch (status) {
            case 'rejected':
                return 'red';
            case 'pending':
                return '#6200ea';
            case 'revision':
                return '#ffd600';
            case 'accepted':
                return 'green';
            default:
                return 'black';
        }
    };


    React.useEffect(() => {
        if (error === true) {
            setTimeout(() => {
                setError(false);
            }, 5000);
        }
    }, [error]);

    React.useEffect(() => {
        async function get() {
            try {
                const response = await getStudentProposalByProposalId(token, proposalId);
                setRedirectDataNotFound(false);
                if (response.proposal.coordinator_approval_status === "revision") setDisabledButton(false);
                setProposal(response.proposal);
                setExaminers(response.examiners);
                setSupervisors(response.supervisors);
                setStudent(response.student);
                setCoordinators(response.coordinator)
            } catch (error) {
                if (error.response) {
                    if (error.response.data.errors.messages.not_found) setRedirectDataNotFound(true);
                }
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



    async function revisionSubmit(e) {
        e.preventDefault();

        const form = new FormData();
        if (typeof pdf === "undefined" || pdf === null || pdf === "") {
            form.append("proposal_file", " ");
        } else {
            form.append("proposal_file", pdf);
        }
        setPostLoading(true);
        try {
            await revisionProposal(form, token, proposalId);
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

    if (redirectToReferrer) return window.location.reload();

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
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {/* Row one */}
                        <Grid item xs={12}>
                            <form onSubmit={revisionSubmit}>
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
                                                    Nama: {student.name}
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    Nrp: {student.nrp}
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    Phone: {student.phone}
                                                </Typography>
                                            </Paper>

                                        </LayoutGrid>

                                        <LayoutGrid item xs={12} md={9}>
                                            <Typography variant="body1" sx={{ background: "#EBEBEB", paddingY: 2, paddingX: 1, borderRadius: 1 }}>
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

                                            <Divider textAlign="left" sx={{ marginTop: 5 }}><Chip label={`Dosen penguji`} size="small" /></Divider>

                                            {
                                                examiners.map((v, i) => (
                                                    <List
                                                        sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper', padding: 0 }}
                                                        key={`examiner-${i}`}
                                                    >
                                                        <ListItem alignItems="flex-start" sx={{ paddingTop: 0, paddingBottom: 0 }}>
                                                            <ListItemAvatar>
                                                                <Avatar alt="Remy Sharp" src="" />
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={v.name}
                                                                secondary={
                                                                    <React.Fragment>
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

                                            <Divider textAlign="left" sx={{ marginTop: 5 }}><Chip label={`Dosen Coordinator`} size="small" /></Divider>

                                            {
                                                coordinators.map((v, i) => (
                                                    <List
                                                        sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper', padding: 0 }}
                                                        key={`examiner-${i}`}
                                                    >
                                                        <ListItem alignItems="flex-start" sx={{ paddingTop: 0, paddingBottom: 0 }}>
                                                            <ListItemAvatar>
                                                                <Avatar alt="Remy Sharp" src="" />
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={v.name}
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography
                                                                            component="span"
                                                                            sx={{
                                                                                textTransform: 'uppercase',
                                                                                fontSize: '0.6rem',
                                                                                display: "block",
                                                                                color: getStatusColor2(v.coordinator_approval_status)
                                                                            }}
                                                                        >
                                                                            {v.coordinator_approval_status}
                                                                        </Typography>

                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </ListItem>
                                                    </List>
                                                ))
                                            }




                                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} elevation={0}>

                                                {/* Warning */}
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 2,
                                                    }}
                                                >
                                                    <Alert severity="info" icon={<WarningRoundedIcon />}>
                                                        Proposal Anda Dinyatakan Sudah Lulus Apabila di "APPROVED" Dosen koordinator Anda.
                                                    </Alert>
                                                    <Typography variant="subtitle1" fontWeight="medium">
                                                        Informasi revisi proposal mahasiswa:
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        1. Upload file proposal terbaru anda yang sudah dilakukan revisi atau perbaikan
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        2. Dokumen yang diupload harus dalam format .pdf atau .docx
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        3. Pada bagian kanan atas Cover proposal diberikan keterangan revisi
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        4. Hubungi dosen pembimbing atau dosen penguji yang memberikan revisi untuk melakukan review ulang proposal anda.
                                                    </Typography>
                                                </Box>

                                                {/* Form */}

                                            </Paper>


                                            <Demo>
                                                <List>
                                                    <ListItem>
                                                        <ListItemAvatar>

                                                            <Button
                                                                component="label"
                                                                onChange={(e) => setPdf(e.target.files[0])}
                                                                role={undefined}
                                                                variant="contained"
                                                                tabIndex={-1}
                                                                startIcon={<CloudUploadIcon />}
                                                            >
                                                                File
                                                                <input type="file" style={{ display: 'none' }} />
                                                            </Button>

                                                        </ListItemAvatar>
                                                        <ListItemAvatar sx={{ marginLeft: 3 }}>
                                                            <Button disabled={disabledButton} sx={{ paddingX: 5 }} variant="outlined" type='submit'> {postLoading ? <CircularProgress sx={{ color: "#1975D1" }} size={24} /> : "Simpan Revisi"}
                                                            </Button>
                                                        </ListItemAvatar>
                                                    </ListItem>
                                                    {(errorMessages.proposal_file && error) && <Typography style={{ color: 'red' }}>{errorMessages.proposal_file}</Typography>}
                                                </List>
                                            </Demo>
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

const StudentProposalDetail = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer title={"Revisi Dan Status Proposal"} pages={studentPages()} />

            {/* Content */}
            <Feed>
                <Fill />
            </Feed>

        </Box>

    )
}

export default StudentProposalDetail;