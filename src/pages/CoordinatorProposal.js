
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, CssBaseline, Grid, Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";
import { coordinatorPages } from "../helpers/constants";

import { getCoordinatorProposal } from "../api/coordinators";
import { useSession } from "../contexts/SessionContext";


function Fill() {
    const { token } = useSession();
    const [proposals, setProposals] = React.useState([]);

    const [total, setTotal] = React.useState(0);
    const [perPage, setPerPage] = React.useState(1);
    const [page, setPage] = React.useState(1);

    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    function navigateToProposalDetail(id) {
        navigate(`/coordinators/proposal/detail/${id}`);
    }

    // Get data
    React.useEffect(() => {
        async function get() {
            setLoading(true); // Set loading to true while fetching data
            try {
                const response = await getCoordinatorProposal(token, page);
                setProposals(response.data); // Adjust this according to your API response
                setTotal(response.total); // Adjust this according to your API response
                setPerPage(response.per_page); // Adjust this according to your API response
            } catch (error) {
                console.log('Error supervisor proposal', error.message);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        }
        get();
    }, [token, page]);

    const handlePageChange = (event, value) => {
        setPage(parseInt(value, 10));
    };

    return (
        <Grid item xs={12} overflow={"scroll"} sx={{ background: "#FFFFFF" }} padding={0} borderRadius={2} marginLeft={0}>
            <Table size="small">
                <TableHead sx={{ background: "#EBEBEB" }}>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Nrp</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Upload Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={7} align="center">
                                <CircularProgress />
                            </TableCell>
                        </TableRow>
                    ) : (
                        proposals.map((v, i) => (
                            <TableRow sx={{ cursor: "pointer" }} key={i} onClick={() => navigateToProposalDetail(v.id)}>
                                <TableCell>{(page - 1) * perPage + i + 1}</TableCell>
                                <TableCell>{v.name}</TableCell>
                                <TableCell>{v.nrp}</TableCell>
                                <TableCell>{v.title}</TableCell>
                                <TableCell>{v.upload_date}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {!loading && (
                <Box display="flex" justifyContent="center" marginY={3}>
                    <Pagination count={Math.ceil(total / perPage)} page={page} onChange={handlePageChange} variant="outlined" shape="rounded" />
                </Box>
            )}
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