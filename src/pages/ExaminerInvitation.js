
import * as React from 'react';
import { examinerPages } from "../helpers/constants";


import { Alert, AlertTitle, Box, CircularProgress, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";



import { getInvitations } from '../api/examiners';
import { useSession } from '../contexts/SessionContext';


function Fill(params) {

    const [invitations, setInvitations] = React.useState([]);
    const { token } = useSession();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function get() {
            try {
                const response = await getInvitations(token);
                console.log(response);
                setInvitations(response);
            } catch (error) {
                console.log('Error get invitations', error.message);
            } finally {
                setLoading(false);
            }
        }
        get()
    }, [token]);


    return (
        <Grid container spacing={3}>
            {loading ? (
                <Grid item xs={12} minHeight={"100vh"} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <CircularProgress />
                </Grid>
            ) : (
                invitations.length > 0 ? (
                    invitations.map((v, i) => (
                        <Grid item xs={12} key={i}>

                            <Paper elevation={3} style={{ padding: '20px', width: '100%', margin: 'auto' }}>
                                <Typography variant="h6" align="center" gutterBottom>
                                    Kepada
                                </Typography>
                                <Typography variant="h6" align="center" gutterBottom>
                                    Yth. Bapak/Ibu Dosen Dan Mahasiswa Pembahas Seminar Proposal Tugas Akhir
                                </Typography>
                                <Typography variant="body1" align="center" gutterBottom>
                                    Di – Tempat
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Dengan Hormat,
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Bersama ini kami mohon kehadiran Bapak/Ibu Dosen Dan Mahasiswa dalam kegiatan seminar proposal yang akan dilaksanakan pada:
                                </Typography>
                                <Box component="ul" pl={2}>
                                    <li>
                                        <Typography variant="body1">Hari/Tanggal: {` ${v.invitation_date}`}</Typography>
                                    </li>
                                    <li>
                                        <Typography variant="body1">Waktu: {` ${v.invitation_hour}`} WIB s.d selesai</Typography>
                                    </li>
                                    <li>
                                        <Typography variant="body1">Tempat: Ruang B.2.2</Typography>
                                    </li>
                                </Box>

                                <Typography variant="body1" paragraph>
                                    Demikian undangan ini disampaikan, atas perhatian dan kerja sama yang baik diucapkan terima kasih.
                                </Typography>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Alert severity="info">
                            <AlertTitle>Info</AlertTitle>
                            Undangan Tidak Tersedia
                        </Alert>
                    </Grid>
                )
            )}
        </Grid>
    )
}







const ExaminerInvitation = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer title={"Undangan Seminar Penguji"} pages={examinerPages()} />

            {/* Content */}
            <Feed>
                <Fill />
            </Feed>

        </Box>

    )
}

export default ExaminerInvitation;