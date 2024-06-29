import * as React from 'react';
import { Avatar, Box, CircularProgress, CssBaseline, FormLabel, Grid, ListItemAvatar, Paper, Stack, Typography, styled } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import { studentPages } from "../helpers/constants";
import Feed from "../components/Feed";
import ArticleIcon from "@mui/icons-material/Article";
import { useSession } from '../contexts/SessionContext';
import { useNavigate } from 'react-router-dom';
import { getProposals } from '../api/students';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
}));


function Fill(params) {

    const { token } = useSession();
    const [proposals, setProposals] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    function navigateToProposalDetail(id) {
        navigate(`/students/proposal/detail/${id}`);
    }

    // Get data
    React.useEffect(() => {
        async function get() {
            try {
                const response = await getProposals(token);
                setProposals(response);
            } catch (error) {
                console.log('Error get student proposal', error.message);
            } finally {
                setLoading(false);
            }
        }
        get();
    }, [token]);

    return (
        <Grid container spacing={3}>
            {loading ? (
                <Grid item xs={12} minHeight={"100vh"} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <CircularProgress />

                </Grid>
            ) : (
                proposals.length > 0 ? (
                    proposals.map((v, i) => (
                        <Grid sx={{ cursor: "pointer" }} item xs={12} key={i} onClick={() => navigateToProposalDetail(v.id)}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Stack marginBottom={1} spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" alignItems={"center"}>
                                    <Item elevation={0} sx={{ width: "5%" }}>
                                        <ListItemAvatar>
                                            <Avatar variant="rounded" sx={{ padding: "15px" }}>
                                                <ArticleIcon fontSize="large" />
                                            </Avatar>
                                        </ListItemAvatar>
                                    </Item>
                                    <Item elevation={0} sx={{ width: "80%" }}>
                                        <Typography
                                            variant="body1"
                                            fontSize={"1.1rem"}
                                            marginX={2}
                                            paddingX={3}
                                        >
                                            {v.title}
                                        </Typography>
                                    </Item>
                                    <Item sx={{ minWidth: "100%" }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: "#00b0ff",
                                                width: "100%",
                                                boxShadow:
                                                    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;",
                                            }}
                                            variant="rounded"
                                        >
                                            Proposal
                                        </Avatar>
                                    </Item>
                                </Stack>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: "78vh" }}>
                            <Typography variant="body1" color="text.secondary">
                                <FormLabel>PROPOSAL TIDAK TERSEDIA</FormLabel>
                            </Typography>
                        </Paper>
                    </Grid>
                )
            )}
        </Grid>
    );
}



const StudentProposal = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer title={"Daftar Proposal"} pages={studentPages()} />

            {/* Content */}
            <Feed>
                <Fill />
            </Feed>

        </Box>

    )
}

export default StudentProposal;