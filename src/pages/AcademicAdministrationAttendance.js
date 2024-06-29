import { Box, CssBaseline, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import { academicAdministartionsPages } from "../helpers/constants";
import Feed from "../components/Feed";

function createData(id, name) {
    return { id, name };
}
const rows = [
    createData(
        0,
        'Abd. goffar',
    ),
    createData(
        1,
        'Rizal maulana',
    )
];



function Fill(params) {

    return (
        <Grid item xs={12} overflow={"scroll"} sx={{ background: "#FFFFFF" }} padding={3} borderRadius={2}>
            <Table size="small" >
                <TableHead>
                    <TableRow>
                        <TableCell>No:</TableCell>
                        <TableCell>Nama</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((v, i) => (
                        <TableRow hover key={i}>
                            <TableCell>{i}</TableCell>
                            <TableCell>{v.name}</TableCell>
                            <TableCell> Hadir</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </Grid>

    )
}


const AcademicAdministrationAttendance = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer title={"Daftar Absensi"} pages={academicAdministartionsPages()} />

            {/* Content */}
            <Feed>
                <Fill />
            </Feed>

        </Box>

    )

}


export default AcademicAdministrationAttendance;