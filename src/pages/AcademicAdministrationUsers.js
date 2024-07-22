import * as React from 'react';

import { Alert, Backdrop, Box, Button, Checkbox, CircularProgress, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, styled } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import { academicAdministartionsPages } from "../helpers/constants";
import Feed from "../components/Feed";
import { useSession } from "../contexts/SessionContext";
import { getAllHeadStudyProgram } from '../api/headStudyPrograms';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createUser, getUsersByRole } from '../api/users';
import CloseIcon from '@mui/icons-material/Close';
import ListAltIcon from '@mui/icons-material/ListAlt';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const roleList = [
    { id: 1, value: "examiners", name: "Examiner" },
    { id: 2, value: "coordinators", name: "Coordinator" },
    { id: 3, value: "supervisors", name: "Supervisor" },
    { id: 4, value: "head-study-programs", name: "Head Study Program" },
    { id: 5, value: "students", name: "Student" }
]

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


function Fill(params) {


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const { token } = useSession();
    const [error, setError] = React.useState(false);
    const [serverSucces, setServerSucces] = React.useState(false);
    const [errorMessages, setErrorMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [role, setRole] = React.useState("students");

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [nrp, setNrp] = React.useState("");
    const [headStudyProgramId, setHeadStudyProgramId] = React.useState("");
    const [selectedItems, setSelectedItems] = React.useState([]);

    const [users, setUsers] = React.useState([]);
    React.useEffect(() => {
        async function get() {
            try {
                const response = await getUsersByRole(role, token);
                setUsers(response);
            } catch (error) {
                console.log('Error get users by role ', error.message);
            }
        }
        get()
    }, [token, role]);


    React.useEffect(() => {
        if (serverSucces === true) {
            setTimeout(() => {
                setServerSucces(false);
                window.location.reload();
            }, 3000);
        }
    }, [serverSucces]);

    React.useEffect(() => {
        if (error === true) {
            setTimeout(() => {
                setError(false);

            }, 3000);
        }
    }, [error]);


    const handleChange = (event) => {
        const value = event.target.value;
        const checked = event.target.checked;

        if (checked) {
            //add array if checkbox checked
            setSelectedItems([...selectedItems, value]);
        } else {
            //delete array checkbox data if not checked
            setSelectedItems(selectedItems.filter(item => item !== value));
        }
    };


    // password input required
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // get data
    const [headStudyPrograms, setHeadStudyPrograms] = React.useState([]);
    React.useEffect(() => {
        async function get() {
            try {
                const response = await getAllHeadStudyProgram(token);
                console.log(response.data);
                setHeadStudyPrograms(response.data);
            } catch (error) {
                console.log('Error get all head study program ', error.message);
            }
        }
        get()
    }, [token]);


    async function createUserSubmit(e) {
        e.preventDefault();

        setLoading(true);

        const body = {
            "username": username,
            "password": password,
            "name": name,
            "phone": phone,
            "nrp": nrp,
            "head_study_program_id": headStudyProgramId,
            "address": address,
            "roles": selectedItems
        }

        try {
            await createUser(body, token);
            setServerSucces(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setError(true);
                setErrorMessages(error.response.data.errors.messages);
            } else if (error.request) {
                console.log('The request was made but no response was received');
            } else {
                console.log('Error', error.message);
            }
        }

    }

    return (
        <Grid container spacing={3}>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <Grid item xs={12}>
                        <FormLabel htmlFor="filter" >
                            Daftar Pengguna
                        </FormLabel>
                        <Select
                            sx={{ width: 300, display: "block" }}
                            id="filter"
                            variant="outlined"
                            onChange={e => setRole(e.target.value)}
                            defaultValue={""}>
                            {
                                roleList.map((v, i) => (
                                    <MenuItem key={i} value={v.value}>{v.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Grid item xs={12} overflow={"scroll"} sx={{ background: "#FFFFFF" }} padding={3} borderRadius={2} marginLeft={3}>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell><FormLabel>No</FormLabel></TableCell>
                                    <TableCell><FormLabel>Name</FormLabel></TableCell>
                                    <TableCell><FormLabel>Address</FormLabel></TableCell>
                                    <TableCell><FormLabel>Phone</FormLabel></TableCell>
                                </TableRow>
                            </TableHead>
                            {/* <TableBody>
                                <TableRow sx={{ cursor: "pointer" }} >
                                    <TableCell><FormLabel>{"1"}</FormLabel></TableCell>
                                    <TableCell><FormLabel>{"Abdul Goffar"}</FormLabel></TableCell>
                                    <TableCell><FormLabel>{"Jl. Jaksa Agung Suprapto"}</FormLabel></TableCell>
                                    <TableCell><FormLabel>{"098943546869"}</FormLabel></TableCell>
                                </TableRow>
                            </TableBody> */}
                            <TableBody>
                                {users.map((v, i) => (
                                    <TableRow key={i}>
                                        {
                                            (v.student !== null) &&
                                            <>
                                                <TableCell><FormLabel>{(i + 1)}</FormLabel></TableCell>
                                                <TableCell><FormLabel>{v.student.name}</FormLabel></TableCell>
                                                <TableCell><FormLabel>{v.student.address}</FormLabel></TableCell>
                                                <TableCell><FormLabel>{v.student.phone}</FormLabel></TableCell>
                                            </>
                                        }
                                        {
                                            (v.examiner !== null) &&
                                            <>
                                                <TableCell><FormLabel>{(i + 1)}</FormLabel></TableCell>
                                                <TableCell><FormLabel>{v.examiner.name}</FormLabel></TableCell>
                                                <TableCell><FormLabel>{v.examiner.address}</FormLabel></TableCell>
                                                <TableCell><FormLabel>{v.examiner.phone}</FormLabel></TableCell>
                                            </>
                                        }
                                        {
                                            (v.supervisor !== null) &&
                                            <>
                                                <TableCell><FormLabel>{(i + 1)}</FormLabel></TableCell>
                                                <TableCell><FormLabel>{v.supervisor.name}</FormLabel></TableCell>
                                                <TableCell><FormLabel>{v.supervisor.address}</FormLabel></TableCell>
                                                <TableCell><FormLabel>{v.supervisor.phone}</FormLabel></TableCell>

                                            </>
                                        }
                                        {
                                            (v.coordinator !== null) &&
                                            <>
                                                <TableCell><FormLabel>{(i + 1)}</FormLabel></TableCell>
                                                <TableCell><FormLabel>{v.coordinator.name}</FormLabel></TableCell>
                                                <TableCell><FormLabel>{v.coordinator.address}</FormLabel></TableCell>
                                                <TableCell><FormLabel>{v.coordinator.phone}</FormLabel></TableCell>
                                            </>
                                        }
                                        {
                                            (v.head_study_program !== null) &&
                                            <>
                                                <TableCell><FormLabel>{(i + 1)}</FormLabel></TableCell>
                                                <TableCell><FormLabel>{v.head_study_program.name}</FormLabel></TableCell>
                                                <TableCell><FormLabel>{v.head_study_program.address}</FormLabel></TableCell>
                                                <TableCell><FormLabel>{v.head_study_program.phone}</FormLabel></TableCell>
                                            </>
                                        }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {/* Table */}
                </DialogActions>
            </BootstrapDialog>
            <Grid item xs={12}>
                {
                    serverSucces && (
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={true}
                        >
                            <Alert severity="success" color="success">
                                This is a success. Create User Data Successfully
                            </Alert>
                        </Backdrop>
                    )
                }
                <form onSubmit={createUserSubmit}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Grid container spacing={3}>
                            <FormGrid item xs={12} md={12}>
                                <Divider textAlign="left" sx={{ display: "flex", }}> <ListAltIcon sx={{ cursor: "pointer" }} onClick={handleClickOpen} /> <p>Lihat Daftar pengguna</p></Divider>
                            </FormGrid>
                            <FormGrid item xs={12} md={6}>
                                <FormLabel htmlFor="username">
                                    Username
                                </FormLabel>
                                <TextField
                                    id="username"
                                    placeholder="Please type Username"
                                    variant="outlined"
                                    onChange={e => setUsername(e.target.value)}
                                    error={(error && (errorMessages.username || errorMessages.username_has_created || errorMessages.username_has_created))}
                                    helperText={error && (errorMessages.username || errorMessages.username_has_created || errorMessages.username_has_created)}
                                />
                            </FormGrid>

                            <FormGrid item xs={12} md={6}>
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
                                <TextField
                                    id="student-password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Please type  password"
                                    onChange={e => setPassword(e.target.value)}
                                    error={error && errorMessages.password}
                                    helperText={error && errorMessages.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormGrid>
                            <FormGrid item xs={12} md={6}>
                                <FormLabel htmlFor="name">
                                    Name
                                </FormLabel>
                                <TextField
                                    id="name"
                                    placeholder="Please type Name"
                                    variant="outlined"
                                    onChange={e => setName(e.target.value)}
                                    error={error && errorMessages.name}
                                    helperText={error && errorMessages.name}
                                />
                            </FormGrid>
                            <FormGrid item xs={12} md={6}>
                                <FormLabel htmlFor="phone">
                                    Phone
                                </FormLabel>
                                <TextField
                                    id="phone"
                                    placeholder="Please type Phone"
                                    variant="outlined"
                                    onChange={e => setPhone(e.target.value)}
                                    error={error && errorMessages.phone}
                                    helperText={error && errorMessages.phone}
                                />
                            </FormGrid>
                            <FormGrid item xs={12} md={6}>
                                <FormLabel htmlFor="address">
                                    Address
                                </FormLabel>
                                <TextField
                                    id="address"
                                    placeholder="Please type Address"
                                    variant="outlined"
                                    onChange={e => setAddress(e.target.value)}
                                    error={error && errorMessages.address}
                                    helperText={error && errorMessages.address}
                                />
                            </FormGrid>
                            <FormGrid item xs={12} md={6}>
                                <FormLabel htmlFor="nrp">
                                    Nrp
                                </FormLabel>
                                <TextField
                                    id="nrp"
                                    placeholder="Please type Nrp"
                                    variant="outlined"
                                    onChange={e => setNrp(e.target.value)}
                                    error={error && (errorMessages.nrp || errorMessages.nrp_incorrect)}
                                    helperText={error && (errorMessages.nrp || errorMessages.nrp_incorrect)}
                                />
                            </FormGrid>
                            <FormGrid item xs={12} md={12}>
                                <FormLabel>
                                    Kaprodi
                                </FormLabel>
                                <Select
                                    defaultValue={""}
                                    onChange={e => setHeadStudyProgramId(e.target.value)}
                                    fullWidth
                                >
                                    {
                                        headStudyPrograms.map((v, i) => (
                                            <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                                {(error && (errorMessages.head_study_program_id || errorMessages.hsp_incorrect)) && <p style={{ color: 'red' }}>{errorMessages.head_study_program_id || errorMessages.hsp_incorrect}</p>}
                            </FormGrid>
                            {/* <FormGrid item xs={12} md={2}>
                                <FormLabel>
                                    Role
                                </FormLabel>
                                {
                                    roleList.map((v, i) => (
                                        <FormControlLabel key={i} control={<Checkbox value={`${v.value}`} onChange={handleChange} checked={selectedItems.includes(`${v.value}`)} />} label={v.name} />
                                    ))
                                }
                                {(error && (errorMessages.roles || errorMessages.not_valid_role)) && <p style={{ color: 'red' }}>{errorMessages.roles || errorMessages.not_valid_role}</p>}
                            </FormGrid> */}
                            <FormGrid item xs={12} md={12}>
                                <FormLabel>
                                    Role
                                </FormLabel>
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {
                                        roleList.map((v, i) => (
                                            <FormControlLabel
                                                key={i}
                                                control={<Checkbox value={`${v.value}`} onChange={handleChange} checked={selectedItems.includes(`${v.value}`)} />}
                                                label={v.name}
                                            />
                                        ))
                                    }
                                </div>
                                {(error && (errorMessages.roles || errorMessages.not_valid_role)) &&
                                    <p style={{ color: 'red' }}>{errorMessages.roles || errorMessages.not_valid_role}</p>}
                            </FormGrid>

                            <FormGrid item xs={12} md={12}>
                                <Button
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    type='submit'
                                >
                                    {loading ? <CircularProgress sx={{ color: "white" }} size={24} /> : "Simpan"}
                                </Button>
                            </FormGrid>
                        </Grid>
                    </Paper>
                </form>
            </Grid>
        </Grid>
    )

}





const AcademicAdministrationUser = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer title={"Kelola Pengguna"} pages={academicAdministartionsPages()} />

            {/* Content */}
            <Feed>
                {/* <Fill /> */}
                <Fill />
            </Feed>

        </Box>

    )

}


export default AcademicAdministrationUser;