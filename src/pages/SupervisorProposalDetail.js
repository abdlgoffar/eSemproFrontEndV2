import * as React from 'react';
import { Box, CircularProgress, Button, CssBaseline, Avatar, Grid, Paper, Typography, styled, FormLabel, Select, MenuItem, Chip } from "@mui/material";

import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";
import { supervisorPages } from "../helpers/constants";

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Navigate, useParams } from 'react-router-dom';
import { getNewProposalPdf, getOldProposalPdf } from '../api/proposals';

import { useSession } from '../contexts/SessionContext';
import NotFound from './NotFound';

import { getSupervisorProposalByProposalId, createProposalApprovalStatus } from '../api/supervisors';



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


    const [approvalStatus, setApprovalStatus] = React.useState("");
    const [suggestion, setSuggestion] = React.useState(null);


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
                const response = await getSupervisorProposalByProposalId(token, proposalId);
                console.log(response);
                if (response.supervisor_approval_status === "approved") setDisabledButton(true);
                setRedirectDataNotFound(false);
                setProposal(response);

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
    }, [proposalId, token, redirectDataNotFound]);




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

    async function createApprovalStatusProposalSubmit(e) {
        e.preventDefault();

        setPostLoading(true);

        const body = {
            "supervisor_approval_status": approvalStatus,
            "suggestion": suggestion
        }

        try {
            await createProposalApprovalStatus(body, token, proposalId);
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

    if (redirectToReferrer) return <Navigate to="/supervisors/proposal" />;

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
                            <form onSubmit={createApprovalStatusProposalSubmit}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Grid container spacing={3}>
                                        <LayoutGrid item xs={12} md={3}>
                                            <Paper elevation={8}
                                                sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                                <Avatar alt="Remy Sharp"
                                                    variant="square"
                                                    src=""
                                                    sx={{
                                                        width: 200,
                                                        height: 200,
                                                    }}>

                                                </Avatar>
                                            </Paper>
                                            <Paper square variant="outlined"
                                                sx={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: 1, paddingY: 2 }}>
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
                                            <Typography>
                                                {proposal.title}
                                            </Typography>
                                            <div style={{ width: "100%" }}>
                                                <Chip size='small' color="primary" variant="outlined" style={{ marginRight: "10px", marginTop: "10px" }} onClick={handleDownloadOldPdf} sx={{}} icon={<FileDownloadIcon />} label="Proposal" />
                                                <Chip size='small' color="primary" variant="outlined" style={{ marginTop: "10px" }} onClick={handleDownloadNewPdf} sx={{}} icon={<FileDownloadIcon />} label="Revisi" />
                                            </div>
                                            <FormLabel htmlFor="status-approval" sx={{ marginTop: 2 }}>
                                                Penilaian Dosen Pembimbing
                                            </FormLabel>
                                            <Select
                                                id="status-approval"
                                                variant="outlined"
                                                defaultValue={""}
                                                onChange={e => setApprovalStatus(e.target.value)}
                                            >
                                                <MenuItem value={"approved"} >{"approved"}</MenuItem>
                                                <MenuItem value={"rejected"}>{"rejected"}</MenuItem>
                                                <MenuItem value={"revision"}>{"revision"}</MenuItem>
                                            </Select>
                                            {(errorMessages.supervisor_approval_status && error) && <p style={{ color: 'red' }}>{errorMessages.supervisor_approval_status}</p>}

                                            <FormLabel htmlFor="suggestion" sx={{ marginTop: 2 }}>
                                                Saran Dosen Pembimbing
                                            </FormLabel>
                                            <textarea id='suggestion' rows={10} onChange={e => setSuggestion(e.target.value)} />
                                            {(errorMessages.if_rejected_gave_suggestion && error) && <p style={{ color: 'red' }}>{errorMessages.if_rejected_gave_suggestion}</p>}
                                            {(errorMessages.suggestion && error) && <p style={{ color: 'red' }}>{errorMessages.suggestion}</p>}

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

const SupervisorProposalDetail = () => {

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer title={"Penyetujuan Proposal"} pages={supervisorPages()} />

            {/* Content */}
            <Feed>
                <Fill />
            </Feed>
        </Box>

    )
}

export default SupervisorProposalDetail;