import { Box, CssBaseline, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";
import { examinerPages } from "../helpers/constants";

import { useNavigate } from "react-router-dom";


function createData(id, title, upload_at) {
    return { id, title, upload_at };
}


function Fill(params) {

    const navigate = useNavigate();
    function navigateToProposalDetail(proposalId) {
        navigate(`/examiners/proposal/detail`);
    }



    const rows = [
        createData(
            0,
            'Analisis SWOT Dalam Menentukan Strategi Pemasaran (Studi Kasus di Kantor Pos Kota Magelang 56100)',
            '2012-04-29',
        ),
        createData(
            1,
            'Hubungan Antara Persepsi Dukungan Organisasional dan Kreativitas Pada Desainer di Surabaya',
            '2024-05-19',

        )
    ];

    return (
        <Grid item xs={12} overflow={"scroll"} sx={{ background: "#FFFFFF" }} padding={3} borderRadius={2}>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>No:</TableCell>
                        <TableCell>Proposal title</TableCell>
                        <TableCell>Upload at</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((v, i) => (
                        <TableRow hover key={i} onClick={() => navigateToProposalDetail()}>
                            <TableCell>{i}</TableCell>
                            <TableCell>{v.title}</TableCell>
                            <TableCell>{v.upload_at}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </Grid>

    )
}


const ExaminerRevision = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer pages={examinerPages()} />

            {/* Content */}
            <Feed>
                <Fill />
            </Feed>

        </Box>

    )
}

export default ExaminerRevision;