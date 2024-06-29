import { Alert, Box, Button, CssBaseline, FormLabel, Grid, MenuItem, OutlinedInput, Paper, Select, Typography, styled } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";


import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { studentPages } from "../helpers/constants";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function Fill(params) {
    return (
        <Grid container spacing={3}>

            {/* Row one */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                    {/* Warning */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Alert severity="info" icon={<WarningRoundedIcon />}>
                            Pemberitahuan penting
                        </Alert>
                        <Typography variant="subtitle1" fontWeight="medium">
                            Informasi upload revisi proposal mahasiswa:
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            1. Dokumen yang sudah diupload tidak bisa diupdate atau diubah
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            2. Mahasiswa diwajibkan merevisi proposal dan meminta persetujuan hasil revisi kepada dosen pembimbing dan penguji
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            3. Dokumen yang diupload harus dalam format .pdf atau .docx
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            4. Pada bagian kanan atas Cover dokumen proposal diberikan keterangan revisi
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            5. Size maximal dokumen 2MB
                        </Typography>
                    </Box>

                    {/* Form */}

                </Paper>

            </Grid>

            {/* Row two */}
            <Grid item xs={12}>
                <form>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Grid container spacing={3}>
                            <FormGrid item xs={12}>
                                <FormLabel htmlFor="proposal-title" required>
                                    Proposal Title
                                </FormLabel>
                                <OutlinedInput
                                    id="proposal-title"
                                    placeholder="Please type proposal title"
                                />
                            </FormGrid>

                            <FormGrid item xs={6} md={6}>
                                <FormLabel htmlFor="proposal-date" required>
                                    Date
                                </FormLabel>
                                <OutlinedInput
                                    id="proposal-date"
                                    placeholder="Please type proposal date"
                                    type="date"
                                />
                            </FormGrid>

                            <FormGrid item xs={6} md={6}>
                                <FormLabel htmlFor="proposal-semester" required>
                                    Semester
                                </FormLabel>
                                <OutlinedInput
                                    id="proposal-semester"
                                    placeholder="Please type proposal semester"
                                />
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel htmlFor="proposal-supervisors-1" required>
                                    Supervisors 1
                                </FormLabel>
                                <Select id="proposal-supervisors-1">
                                    <MenuItem>Ten</MenuItem>
                                    <MenuItem>Twenty</MenuItem>
                                    <MenuItem>Thirty</MenuItem>
                                </Select>
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel htmlFor="proposal-supervisors-2" required>
                                    Supervisors 2
                                </FormLabel>
                                <Select id="proposal-supervisors-2">
                                    <MenuItem>Ten</MenuItem>
                                    <MenuItem>Twenty</MenuItem>
                                    <MenuItem>Thirty</MenuItem>
                                </Select>
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel htmlFor="proposal-examiners-1" required>
                                    Examiners 1
                                </FormLabel>
                                <Select id="proposal-examiners-1">
                                    <MenuItem>Ten</MenuItem>
                                    <MenuItem>Twenty</MenuItem>
                                    <MenuItem>Thirty</MenuItem>
                                </Select>
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel htmlFor="proposal-examiners-2" required>
                                    Examiners 2
                                </FormLabel>
                                <Select id="proposal-examiners-2">
                                    <MenuItem>Ten</MenuItem>
                                    <MenuItem>Twenty</MenuItem>
                                    <MenuItem>Thirty</MenuItem>
                                </Select>
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel htmlFor="proposal-examiners-3" required>
                                    Examiners 3
                                </FormLabel>
                                <Select id="proposal-examiners-3">
                                    <MenuItem>Ten</MenuItem>
                                    <MenuItem>Twenty</MenuItem>
                                    <MenuItem>Thirty</MenuItem>
                                </Select>
                            </FormGrid>
                            <FormGrid item xs={3} md={3}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    PDF
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </FormGrid>
                            <FormGrid item xs={9} md={9}>
                                <Button variant="outlined">UPLOAD</Button>
                            </FormGrid>
                        </Grid>
                    </Paper>
                </form>

            </Grid>

        </Grid>
    )
}






const StudentRevision = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer pages={studentPages()} />

            {/* Content */}
            <Feed>
                <Fill />
            </Feed>

        </Box>

    )

}


export default StudentRevision;