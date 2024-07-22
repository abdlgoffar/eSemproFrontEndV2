import * as React from 'react';
import { Alert, Backdrop, Box, Button, CircularProgress, CssBaseline, FormLabel, Grid, MenuItem, Paper, Select, TextField, Typography, styled } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";


import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { studentPages } from "../helpers/constants";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSession } from '../contexts/SessionContext';
import { getAllSupervisors } from '../api/supervisors';
import { createProposal, rollbackCreateProposal } from '../api/proposals';
import { createStudentsSupervisors } from '../api/students';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));


function Fill(params) {

    const [title, setTitle] = React.useState("");

    const [date, setDate] = React.useState("");

    const [pdf, setPdf] = React.useState();
    const { token } = useSession();
    const [error, setError] = React.useState(false);
    const [serverSucces, setServerSucces] = React.useState(false);
    const [serverFailed, setServerFailed] = React.useState(false);
    const [errorMessages, setErrorMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [supervisors, setSupervisors] = React.useState([]);
    const [period, setPeriod] = React.useState("");

    const [supervisorOne, setSupervisorOne] = React.useState(null);
    const [supervisorTwo, setSupervisorTwo] = React.useState(null);
    const [supervisorThree, setSupervisorThree] = React.useState(null);
    const [supervisors_id, setSupervisorsId] = React.useState([]);

    React.useEffect(() => {
        const updatedSupervisorsId = [];
        if (supervisorOne !== null) updatedSupervisorsId.push(supervisorOne);
        if (supervisorTwo !== null) updatedSupervisorsId.push(supervisorTwo);
        if (supervisorThree !== null) updatedSupervisorsId.push(supervisorThree);
        setSupervisorsId(updatedSupervisorsId);
    }, [supervisorOne, supervisorTwo, supervisorThree]);


    // Get data
    React.useEffect(() => {
        async function get() {
            try {
                const response = await getAllSupervisors(token);
                setSupervisors(response.data);
            } catch (error) {
                console.log('Error get all supervisors ', error.message);
            }
        }
        get()
    }, [token]);


    // Clean state
    React.useEffect(() => {
        if (error === true) {
            setTimeout(() => {
                setError(false);
            }, 5000);
        }
    }, [error]);

    React.useEffect(() => {
        if (serverSucces === true) {
            setTimeout(() => {
                setServerSucces(false);
                window.location.reload();
            }, 3000);
        }
    }, [serverSucces]);

    React.useEffect(() => {
        if (serverFailed === true) {
            setTimeout(() => {
                setServerFailed(false);
                window.location.reload();
            }, 3000);
        }
    }, [serverFailed]);

    async function createProposalSubmit(e) {
        e.preventDefault();

        setLoading(true);


        const form = new FormData();
        if (typeof pdf === "undefined" || pdf === null || pdf === "") {
            form.append("proposal_file", " ");
        } else {
            form.append("proposal_file", pdf);
        }
        form.append("title", title);
        form.append("upload_date", date);
        form.append("period", period);


        const body = {
            "supervisors": supervisors_id
        }

        let requestCreateProposal = false;
        let proposalId;

        try {

            //Request One
            let response = await createProposal(form, token);
            requestCreateProposal = true;
            proposalId = response.proposal.id;

            //Request Two
            await createStudentsSupervisors(body, token, response.proposal.id);
            setServerSucces(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setError(true);
                setErrorMessages(error.response.data.errors.messages);
                //Server Error
                if (error.response.data.errors.messages.create_proposal_data_failed || error.response.data.errors.messages.create_supervisor_data_failed) {
                    setServerFailed(true);
                }
                //Rollback 
                if (requestCreateProposal === true) {
                    try {
                        await rollbackCreateProposal(token, proposalId);
                    } catch (error) {
                        console.log('Error rollback create proposal ', error.message);
                    }
                }
            } else if (error.request) {
                console.log('The request was made but no response was received');
            } else {
                console.log('Error', error.message);
            }
        }
    }



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
                            Informasi upload proposal mahasiswa:
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            1. Dokumen yang sudah diupload tidak bole diubah Kecuali ada saran Revisi dari dosen pembimbing atau penguji.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            2. Dokumen yang diupload harus dalam format .pdf atau .docx
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            3. Upload Proposal yang sudah fix sesuai ketentuan.
                        </Typography>
                    </Box>

                    {/* Form */}

                </Paper>

            </Grid>
            {/* Row two */}
            <Grid item xs={12}>
                <form onSubmit={createProposalSubmit}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Grid container spacing={3}>
                            <FormGrid item xs={12}>
                                <FormLabel htmlFor="proposal-title" >
                                    Judul Proposal
                                </FormLabel>
                                <TextField
                                    id="proposal-title"
                                    placeholder="Please type proposal title"
                                    variant="outlined"
                                    error={error && errorMessages.title}
                                    helperText={error && errorMessages.title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </FormGrid>

                            <FormGrid item xs={6} md={6}>
                                <FormLabel htmlFor="proposal-date" >
                                    Tanggal
                                </FormLabel>
                                <TextField
                                    id="proposal-date"
                                    placeholder="Please type proposal date"
                                    variant="outlined"
                                    type="date"
                                    error={error && errorMessages.upload_date}
                                    helperText={error && errorMessages.upload_date}
                                    onChange={e => setDate(e.target.value)}
                                />
                            </FormGrid>

                            <FormGrid item xs={6} md={6}>
                                <FormLabel htmlFor="period" >
                                    Periode
                                </FormLabel>
                                <Select
                                    id="period"
                                    variant="outlined"
                                    defaultValue={""}
                                    onChange={e => setPeriod(e.target.value)}
                                >
                                    <MenuItem value={"Ganjil"} >{"Ganjil"}</MenuItem>
                                    <MenuItem value={"Genap"}>{"Genap"}</MenuItem>
                                </Select>
                                {(errorMessages.period && error) && <p style={{ color: 'red' }}>{errorMessages.period}</p>}
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel htmlFor="proposal-supervisors-1" >
                                    Pembimbing
                                </FormLabel>
                                <Select
                                    id="proposal-supervisors-1"
                                    variant="outlined"
                                    defaultValue={""}
                                    onChange={e => setSupervisorOne(e.target.value)}>
                                    {
                                        supervisors.map((v, i) => (
                                            <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                                {(errorMessages.supervisors && error) && <p style={{ color: 'red' }}>{errorMessages.supervisors}</p>}
                            </FormGrid>
                            <FormGrid item xs={12}>
                                <FormLabel htmlFor="proposal-supervisors-2" >
                                    Co Pembimbing
                                </FormLabel>
                                <Select
                                    id="proposal-supervisors-2"
                                    variant="outlined"
                                    defaultValue={""}
                                    onChange={e => setSupervisorTwo(e.target.value)}>
                                    {
                                        supervisors.map((v, i) => (
                                            <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                                {(errorMessages.supervisors && error) && <p style={{ color: 'red' }}>{errorMessages.supervisors}</p>}
                            </FormGrid>
                            {/* <FormGrid item xs={12}>
                                <FormLabel htmlFor="proposal-supervisors-3" >
                                    Supervisors 3
                                </FormLabel>
                                <Select
                                    id="proposal-supervisors-3"
                                    variant="outlined"
                                    defaultValue={""}
                                    onChange={e => setSupervisorThree(e.target.value)}>
                                    {
                                        supervisors.map((v, i) => (
                                            <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                                {(errorMessages.supervisors && error) && <p style={{ color: 'red' }}>{errorMessages.supervisors}</p>}
                            </FormGrid> */}
                            <FormGrid item xs={3} md={3}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    onChange={(e) => setPdf(e.target.files[0])}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    File
                                    <input type="file" style={{ display: 'none' }} />
                                </Button>
                                {(errorMessages.proposal_file && error) && <p style={{ color: 'red' }}>{errorMessages.proposal_file}</p>}
                            </FormGrid>
                            <FormGrid item xs={9} md={9}>
                                <Button variant="outlined" type='submit'> {loading ? <CircularProgress sx={{ color: "#1975D1" }} size={24} /> : "Upload"}
                                </Button>
                            </FormGrid>
                            <FormGrid item xs={12}>
                                {serverFailed ? (
                                    <Backdrop
                                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                        open={true}
                                    >
                                        <Alert severity="error" color="error">
                                            This is a success. Upload Proposal Data Failed
                                        </Alert>
                                    </Backdrop>
                                ) : (
                                    serverSucces && (
                                        <Backdrop
                                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                            open={true}
                                        >
                                            <Alert severity="success" color="success">
                                                This is a success. Upload Proposal Data Successfully
                                            </Alert>
                                        </Backdrop>
                                    )
                                )}
                            </FormGrid>
                        </Grid>
                    </Paper>
                </form>
            </Grid>
        </Grid>
    )
}






const StudentUpload = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer title={"Upload Proposal"} pages={studentPages()} />

            {/* Content */}
            <Feed>
                <Fill />
            </Feed>

        </Box>

    )

}


export default StudentUpload;