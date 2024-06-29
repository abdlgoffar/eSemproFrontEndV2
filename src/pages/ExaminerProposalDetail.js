
import * as React from 'react';
import { Avatar, Box, Button, CircularProgress, CssBaseline, FormLabel, Grid, MenuItem, Paper, Select, Typography, styled } from "@mui/material";

import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";
import { examinerPages } from "../helpers/constants";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { Navigate, useParams } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';
import { createProposalAssessmentStatus, getExaminerProposalByProposalId } from '../api/examiners';
import NotFound from './NotFound';


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

    const [AssestmentStatus, setAssestmentStatus] = React.useState("");
    const [suggestion, setSuggestion] = React.useState(null);
    // Get data
    React.useEffect(() => {
        async function get() {
            try {
                const response = await getExaminerProposalByProposalId(token, proposalId);
                if (response.examiner_assessment_status === "accepted") setDisabledButton(true);
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


    async function createAssessmentStatusProposalSubmit(e) {
        e.preventDefault();

        setPostLoading(true);

        const body = {
            "examiner_assessment_status": AssestmentStatus,
            "suggestion": suggestion
        }

        try {
            await createProposalAssessmentStatus(body, token, proposalId);
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


    if (redirectToReferrer) return <Navigate to="/examiners/proposal" />;

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
                            <form onSubmit={createAssessmentStatusProposalSubmit}>
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
                                            <Paper square variant="outlined" sx={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: 1, paddingY: 1 }}>
                                                <Typography variant="caption">
                                                    Name: Abd Goffar
                                                </Typography>
                                                <Typography variant="caption">
                                                    Nrp: 211221006
                                                </Typography>
                                                <Typography variant="caption">
                                                    Phone: 082317673883
                                                </Typography>
                                            </Paper>

                                        </LayoutGrid>

                                        <LayoutGrid item xs={12} md={9}>
                                            <Typography>
                                                {proposal.title}
                                            </Typography>
                                            <BrowserUpdatedIcon sx={{ marginY: 1, background: "#1976D2", color: "white", p: "0.5px", cursor: "pointer" }} />


                                            <FormLabel htmlFor="suggestion" required>
                                                Examiner Suggestion
                                            </FormLabel>
                                            <textarea id='suggestion' rows={10} onChange={e => setSuggestion(e.target.value)} />
                                            {(errorMessages.if_rejected_or_revision_gave_suggestion && error) && <p style={{ color: 'red' }}>{errorMessages.if_rejected_or_revision_gave_suggestion}</p>}
                                            {(errorMessages.suggestion && error) && <p style={{ color: 'red' }}>{errorMessages.suggestion}</p>}
                                            <FormLabel htmlFor="status-approval" required>
                                                Examiner Assestment
                                            </FormLabel>
                                            <Select
                                                id="status-approval"
                                                variant="outlined"
                                                defaultValue={""}
                                                onChange={e => setAssestmentStatus(e.target.value)}
                                            >
                                                <MenuItem value={"accepted"} >{"accepted"}</MenuItem>
                                                <MenuItem value={"rejected"}>{"rejected"}</MenuItem>
                                                <MenuItem value={"revision"}>{"revision"}</MenuItem>
                                            </Select>
                                            {(errorMessages.examiner_assessment_status && error) && <p style={{ color: 'red' }}>{errorMessages.examiner_assessment_status}</p>}
                                            <Button disabled={disabledButton} sx={{ marginY: 2, width: "100%" }} variant="outlined" type='submit'>
                                                {postLoading ? <CircularProgress sx={{ color: "#1975D1" }} size={24} /> : proposal.examiner_assessment_status}
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

const ExaminerProposalDetail = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer title={"Penilaian Proposal"} pages={examinerPages()} />

            {/* Content */}
            <Feed>
                <Fill />
            </Feed>

        </Box>

    )
}

export default ExaminerProposalDetail;