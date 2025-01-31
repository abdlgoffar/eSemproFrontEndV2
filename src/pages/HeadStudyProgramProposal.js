





import * as React from 'react';
import { Box, CircularProgress, CssBaseline, Grid, Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";
import { headStudyProgramPages } from "../helpers/constants";

import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { getHeadStudyProgramProposal } from "../api/headStudyPrograms";

function Fill() {
    const { token } = useSession();
    const [proposals, setProposals] = React.useState([]);

    const [total, setTotal] = React.useState(0);
    const [perPage, setPerPage] = React.useState(5);
    const [page, setPage] = React.useState(1);

    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    function navigateToProposalDetail(id) {
        navigate(`/head-study-programs/proposal/detail/${id}`);
    }

    // Get data
    React.useEffect(() => {
        async function get() {
            setLoading(true); // Set loading to true while fetching data
            try {
                const response = await getHeadStudyProgramProposal(token, page);
                console.log(response.data);
                setProposals(response.data); // Adjust this according to your API response
                setTotal(response.total); // Adjust this according to your API response
                setPerPage(response.per_page); // Adjust this according to your API response
            } catch (error) {
                console.log('Error get head study program proposal', error.message);
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
                        <TableCell>Hasil Seminar</TableCell>
                        <TableCell>Kaprodi</TableCell>
                        <TableCell>Pembimbing</TableCell>
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
                                <TableCell>{v.student_name}</TableCell>
                                <TableCell>{v.nrp}</TableCell>
                                <TableCell>{v.title}</TableCell>
                                <TableCell>{v.coordinator_approval_status}</TableCell>
                                <TableCell>{v.head_study_program_approval_status}</TableCell>
                                <TableCell>{v.supervisors || "Tidak Ada"}</TableCell>
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

const HeadStudyProgramProposal = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarAndDrawer title={"Tentukan Penguji dan Kelas Ujian"} pages={headStudyProgramPages()} />
            <Feed>
                <Fill />
            </Feed>
        </Box>
    )
}

export default HeadStudyProgramProposal;
