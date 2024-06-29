import * as React from 'react';

import { Avatar, Box, Button, Chip, CircularProgress, CssBaseline, Divider, FormLabel, Grid, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Select, Stack, Typography, styled } from "@mui/material";

import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";
import { coordinatorPages } from "../helpers/constants";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import GroupIcon from '@mui/icons-material/Group';
import { createProposalAssessmentStatus, getCoordinatorProposalByProposalId } from '../api/coordinators';
import { Navigate, useParams } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';
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
    const [assessmentProposal, setAssessmentProposal] = React.useState([]);

    const [AssestmentStatus, setAssestmentStatus] = React.useState("");

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
                const response = await getCoordinatorProposalByProposalId(token, proposalId);
                if (response.proposal.coordinator_approval_status === "accepted" || response.proposal.coordinator_approval_status === "revision") setDisabledButton(true);
                setRedirectDataNotFound(false);
                console.log(response);
                setProposal(response.proposal);
                setAssessmentProposal(response.assessment_proposal);
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

    async function createAssessmentStatusProposalSubmit(e) {
        e.preventDefault();

        setPostLoading(true);

        const body = {
            "coordinator_assessment_status": AssestmentStatus,
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


    if (redirectToReferrer) return <Navigate to="/coordinators/proposal" />;


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
                                            <Paper square variant="outlined" sx={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: 1 }}>
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
                                            <Typography variant="body1">
                                                {proposal.title}
                                            </Typography>
                                            <BrowserUpdatedIcon sx={{ marginY: 1, background: "#1976D2", color: "white", p: "0.5px" }} />

                                            <Divider textAlign="left" sx={{ marginTop: 5 }}><Chip label="Dosen penguji" size="small" /></Divider>

                                            {
                                                assessmentProposal.map((v, i) => (
                                                    <List
                                                        sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}
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
                                                                                color: getStatusColor2(v.examiner_assessment_status)
                                                                            }}
                                                                        >
                                                                            {v.examiner_assessment_status}
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



                                            <FormLabel htmlFor="status-approval" required sx={{ marginTop: 3 }}>
                                                Coordinator Assestment
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
                                            {(errorMessages.coordinator_assessment_status && error) && <p style={{ color: 'red' }}>{errorMessages.coordinator_assessment_status}</p>}
                                            <Button disabled={disabledButton} sx={{ marginY: 2, width: "100%" }} variant="outlined" type='submit'>
                                                {postLoading ? <CircularProgress sx={{ color: "#1975D1" }} size={24} /> : proposal.coordinator_approval_status}
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

const CoordinatorProposalDetail = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer title={"Pemutusan Nilai Proposal"} pages={coordinatorPages()} />

            {/* Content */}
            <Feed>
                <Fill />
            </Feed>

        </Box>

    )
}

export default CoordinatorProposalDetail;