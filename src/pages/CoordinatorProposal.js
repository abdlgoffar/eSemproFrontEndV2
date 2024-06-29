
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, CssBaseline, FormLabel, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";
import { coordinatorPages } from "../helpers/constants";

import { getProposals } from "../api/coordinators";
import { useSession } from "../contexts/SessionContext";


function Fill(params) {
    const { token } = useSession();
    const [proposals, setProposals] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    function navigateToProposalDetail(id) {
        navigate(`/coordinators/proposal/detail/${id}`);
    }

    // Get data
    React.useEffect(() => {
        async function get() {
            try {
                const response = await getProposals(token);
                setProposals(response);
            } catch (error) {
                console.log('Error get coordinator proposal', error.message);
            } finally {
                setLoading(false);
            }
        }
        get();
    }, [token]);

    return (
        <Grid item xs={12} overflow={"scroll"} sx={{ background: "#FFFFFF" }} padding={3} borderRadius={2} marginLeft={3}>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell><FormLabel>No</FormLabel></TableCell>
                        <TableCell><FormLabel>Title</FormLabel></TableCell>
                        <TableCell><FormLabel>Upload Date</FormLabel></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                <CircularProgress />
                            </TableCell>
                        </TableRow>
                    ) : (
                        proposals.map((v, i) => (
                            <TableRow sx={{ cursor: "pointer" }} key={i} onClick={() => navigateToProposalDetail(v.id)}>
                                <TableCell><FormLabel>{i + 1}</FormLabel></TableCell>
                                <TableCell><FormLabel>{v.title}</FormLabel></TableCell>
                                <TableCell><FormLabel>{v.upload_date}</FormLabel></TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Grid>
    );
}

const CoordinatorProposal = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer title={"Daftar Proposal"} pages={coordinatorPages()} />

            {/* Content */}
            <Feed>
                <Fill />
            </Feed>

        </Box>

    )
}

export default CoordinatorProposal;