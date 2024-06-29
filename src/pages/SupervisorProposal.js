
import * as React from 'react';
import { Box, CircularProgress, CssBaseline, FormLabel, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";
import { supervisorPages } from "../helpers/constants";

import { useNavigate } from "react-router-dom";
import { getSupervisorProposal } from '../api/supervisors';
import { useSession } from '../contexts/SessionContext';



function Fill(params) {
    const { token } = useSession();
    const [proposals, setProposals] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    function navigateToProposalDetail(id) {
        navigate(`/supervisors/proposal/detail/${id}`);
    }

    // Get data
    React.useEffect(() => {
        async function get() {
            try {
                const response = await getSupervisorProposal(token);
                setProposals(response);
            } catch (error) {
                console.log('Error get supervisor proposal', error.message);
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
                        <TableCell><FormLabel>Name</FormLabel></TableCell>
                        <TableCell><FormLabel>Nrp</FormLabel></TableCell>
                        <TableCell><FormLabel>Title</FormLabel></TableCell>
                        <TableCell><FormLabel>Upload Date</FormLabel></TableCell>
                        <TableCell><FormLabel>Status</FormLabel></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                <CircularProgress />
                            </TableCell>
                        </TableRow>
                    ) : (
                        proposals.map((v, i) => (
                            <TableRow sx={{ cursor: "pointer" }} key={i} onClick={() => navigateToProposalDetail(v.id)}>
                                <TableCell><FormLabel>{i + 1}</FormLabel></TableCell>
                                <TableCell><FormLabel>{v.name}</FormLabel></TableCell>
                                <TableCell><FormLabel>{v.nrp}</FormLabel></TableCell>
                                <TableCell><FormLabel>{v.title}</FormLabel></TableCell>
                                <TableCell><FormLabel>{v.upload_date}</FormLabel></TableCell>
                                <TableCell><FormLabel>{v.supervisors_approval_status}</FormLabel></TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Grid>
    );
}

const SupervisorProposal = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer title={"Daftar Proposal"} pages={supervisorPages()} />

            {/* Content */}
            <Feed>
                <Fill />
            </Feed>

        </Box>

    )
}

export default SupervisorProposal;