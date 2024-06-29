



import * as React from 'react';
import { Alert, Box, Button, CircularProgress, CssBaseline, Divider, FormLabel, Grid, IconButton, InputAdornment, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField, Typography, styled } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";

import { academicAdministartionsPages } from "../helpers/constants";
import PropTypes from 'prop-types';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createCoordinator, createExaminer, createHeadStudyProgram, createStudent, createSupervisor, getUsersByRole } from "../api/users";
import { useSession } from "../contexts/SessionContext";
import { getAllHeadStudyProgram } from '../api/headStudyPrograms';




const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export const InputCheckbox = styled("input")(({ theme }) => ({
    height: "100%"
}));

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;



    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ background: "" }}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



function Fill(params) {

    const { token } = useSession();
    const [error, setError] = React.useState(false);
    const [serverSucces, setServerSucces] = React.useState(false);
    const [serverFailed, setServerFailed] = React.useState(false);
    const [errorMessages, setErrorMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const [usernameStudent, setUsernameStudent] = React.useState("");
    const [passwordStudent, setPasswordStudent] = React.useState("");
    const [nameStudent, setNameStudent] = React.useState("");
    const [addressStudent, setAddressStudent] = React.useState("");
    const [phoneStudent, setPhoneStudent] = React.useState("");
    const [nrpStudent, setNrpStudent] = React.useState("");
    const [headStudyProgramIdStudent, setHeadStudyProgramIdStudent] = React.useState("");

    const [usernameExaminer, setUsernameExaminer] = React.useState("");
    const [passwordExaminer, setPasswordExaminer] = React.useState("");
    const [nameExaminer, setNameExaminer] = React.useState("");
    const [addressExaminer, setAddressExaminer] = React.useState("");
    const [phoneExaminer, setPhoneExaminer] = React.useState("");

    const [usernameCoordinator, setUsernameCoordinator] = React.useState("");
    const [passwordCoordinator, setPasswordCoordinator] = React.useState("");
    const [nameCoordinator, setNameCoordinator] = React.useState("");
    const [addressCoordinator, setAddressCoordinator] = React.useState("");
    const [phoneCoordinator, setPhoneCoordinator] = React.useState("");

    const [usernameSupervisor, setUsernameSupervisor] = React.useState("");
    const [passwordSupervisor, setPasswordSupervisor] = React.useState("");
    const [nameSupervisor, setNameSupervisor] = React.useState("");
    const [addressSupervisor, setAddressSupervisor] = React.useState("");
    const [phoneSupervisor, setPhoneSupervisor] = React.useState("");

    const [usernameHeadStudyProgram, setUsernameHeadStudyProgram] = React.useState("");
    const [passwordHeadStudyProgram, setPasswordHeadStudyProgram] = React.useState("");
    const [nameHeadStudyProgram, setNameHeadStudyProgram] = React.useState("");
    const [addressHeadStudyProgram, setAddressHeadStudyProgram] = React.useState("");
    const [phoneHeadStudyProgram, setPhoneHeadStudyProgram] = React.useState("");

    const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);

    // tabs required
    const [value, setValue] = React.useState(0);
    const labels = ["students", "supervisors", "coordinators", "examiners", "head-study-programs"];
    const [role, setRole] = React.useState("students");

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setRole(labels[newValue]);
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




    // handle submit
    React.useEffect(() => {
        if (error === true) {
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    }, [error]);

    React.useEffect(() => {
        if (serverSucces === true) {
            setTimeout(() => {
                setServerSucces(false);
            }, 3000);
        }
    }, [serverSucces]);

    React.useEffect(() => {
        if (serverFailed === true) {
            setTimeout(() => {
                setServerFailed(false);
            }, 3000);
        }
    }, [serverFailed]);




    async function createHeadStudyProgramSubmit(e) {
        e.preventDefault();

        setLoading(true);

        const body = {
            "username": usernameHeadStudyProgram,
            "password": passwordHeadStudyProgram,
            "name": nameHeadStudyProgram,
            "phone": phoneHeadStudyProgram,
            "address": addressHeadStudyProgram,
        }

        try {
            await createHeadStudyProgram(body, token);
            setServerSucces(true);
            setRedirectToReferrer(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setError(true);
                setErrorMessages(error.response.data.errors.messages);
                if (error.response.data.errors.messages.create_user_data_failed) setServerFailed(true);
            } else if (error.request) {
                console.log('The request was made but no response was received');
            } else {
                console.log('Error', error.message);
            }
        }
    }

    async function createStudentSubmit(e) {

        e.preventDefault();

        setLoading(true);

        const body = {
            "username": usernameStudent,
            "password": passwordStudent,
            "name": nameStudent,
            "nrp": nrpStudent,
            "phone": phoneStudent,
            "address": addressStudent,
            "head_study_program_id": headStudyProgramIdStudent,
        }

        try {
            await createStudent(body, token);
            setServerSucces(true);
            setRedirectToReferrer(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setError(true);
                setErrorMessages(error.response.data.errors.messages);
                if (error.response.data.errors.messages.create_user_data_failed) setServerFailed(true);
            } else if (error.request) {
                console.log('The request was made but no response was received');
            } else {
                console.log('Error', error.message);
            }
        }
    }

    async function createExaminerSubmit(e) {
        e.preventDefault();

        setLoading(true);

        const body = {
            "username": usernameExaminer,
            "password": passwordExaminer,
            "name": nameExaminer,
            "phone": phoneExaminer,
            "address": addressExaminer,
        }

        try {
            await createExaminer(body, token);
            setServerSucces(true);
            setRedirectToReferrer(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setError(true);
                setErrorMessages(error.response.data.errors.messages);
                if (error.response.data.errors.messages.create_user_data_failed) setServerFailed(true);
            } else if (error.request) {
                console.log('The request was made but no response was received');
            } else {
                console.log('Error', error.message);
            }
        }
    }

    async function createCoordinatorSubmit(e) {
        e.preventDefault();

        setLoading(true);

        const body = {
            "username": usernameCoordinator,
            "password": passwordCoordinator,
            "name": nameCoordinator,
            "phone": phoneCoordinator,
            "address": addressCoordinator,
        }

        try {
            await createCoordinator(body, token);
            setServerSucces(true);
            setRedirectToReferrer(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setError(true);
                setErrorMessages(error.response.data.errors.messages);
                if (error.response.data.errors.messages.create_user_data_failed) setServerFailed(true);
            } else if (error.request) {
                console.log('The request was made but no response was received');
            } else {
                console.log('Error', error.message);
            }
        }
    }

    async function createSupervisorsSubmit(e) {
        e.preventDefault();

        setLoading(true);

        const body = {
            "username": usernameSupervisor,
            "password": passwordSupervisor,
            "name": nameSupervisor,
            "phone": phoneSupervisor,
            "address": addressSupervisor,
        }

        try {
            await createSupervisor(body, token);
            setServerSucces(true);
            setRedirectToReferrer(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setError(true);
                setErrorMessages(error.response.data.errors.messages);
                if (error.response.data.errors.messages.create_user_data_failed) setServerFailed(true);
            } else if (error.request) {
                console.log('The request was made but no response was received');
            } else {
                console.log('Error', error.message);
            }
        }
    }

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

    if (redirectToReferrer) {
        window.location.reload();
    }

    return (
        <Grid container spacing={3}>



            {/* Row two */}
            <Grid item xs={12}>
                <Paper sx={{ display: 'flex', flexDirection: 'column', marginBottom: 1, justifyContent: "start", alignItems: "center" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons>
                        {labels.map((label, index) => (
                            <Tab sx={{ textTransform: 'capitalize' }} key={index} label={label.toLowerCase()} {...a11yProps(index)} />
                        ))}
                    </Tabs>

                </Paper>
                <CustomTabPanel value={value} index={0}>
                    <form onSubmit={createStudentSubmit}>
                        <Paper variant="outlined" sx={{ px: 2, py: 4 }}>
                            <Grid container spacing={3}>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="student-username">
                                        Student username
                                    </FormLabel>
                                    <TextField
                                        id="student-username"
                                        placeholder="Please type student username"
                                        variant="outlined"
                                        fullWidth
                                        onChange={e => setUsernameStudent(e.target.value)}
                                        error={(error && (errorMessages.username || errorMessages.username_is_available))}
                                        helperText={error && (errorMessages.username || errorMessages.username_is_available)}
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="student-password">
                                        Student password
                                    </FormLabel>
                                    <TextField
                                        id="student-password"
                                        type={showPassword ? 'text' : 'password'}
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Please type student password"
                                        error={error && errorMessages.password}
                                        helperText={error && errorMessages.password}
                                        onChange={e => setPasswordStudent(e.target.value)}
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
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="student-name">
                                        Student name
                                    </FormLabel>
                                    <TextField
                                        id="student-name"
                                        placeholder="Please type student name"
                                        variant="outlined"
                                        fullWidth
                                        error={error && errorMessages.name}
                                        helperText={error && errorMessages.name}
                                        onChange={e => setNameStudent(e.target.value)}
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="student-nrp">
                                        Student nrp
                                    </FormLabel>
                                    <TextField
                                        id="student-nrp"
                                        placeholder="Please type student nrp"
                                        variant="outlined"
                                        fullWidth
                                        onChange={e => setNrpStudent(e.target.value)}
                                        error={error && errorMessages.nrp}
                                        helperText={error && errorMessages.nrp}
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="student-phone">
                                        Student phone
                                    </FormLabel>
                                    <TextField
                                        id="student-phone"
                                        placeholder="Please type student phone"
                                        variant="outlined"
                                        fullWidth
                                        onChange={e => setPhoneStudent(e.target.value)}
                                        error={error && errorMessages.phone}
                                        helperText={error && errorMessages.phone}
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="student-head-study-program">
                                        Head study program
                                    </FormLabel>
                                    <Select
                                        defaultValue={""}
                                        onChange={e => setHeadStudyProgramIdStudent(e.target.value)}
                                        id="student-head-study-program"
                                        fullWidth
                                    >
                                        {
                                            headStudyPrograms.map((v, i) => (
                                                <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    {(errorMessages.head_study_program_id && error) && <p style={{ color: 'red' }}>Mohon pilih kaprodi</p>}
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="student-address">
                                        Student address
                                    </FormLabel>
                                    <TextField
                                        id="student-address"
                                        placeholder="Please type student address"
                                        variant="outlined"
                                        fullWidth
                                        onChange={e => setAddressStudent(e.target.value)}
                                        error={error && errorMessages.address}
                                        helperText={error && errorMessages.address}
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    {serverFailed ? (
                                        <Alert severity="error">
                                            <Typography>Create Failed</Typography>
                                        </Alert>
                                    ) : (
                                        serverSucces && (
                                            <Alert severity="success">
                                                <Typography>Create success</Typography>
                                            </Alert>
                                        )
                                    )}
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <Button
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        type='submit'
                                    >
                                        {loading ? <CircularProgress sx={{ color: "white" }} size={24} /> : "Create"}
                                    </Button>
                                </FormGrid>
                            </Grid>
                        </Paper>
                    </form>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <form onSubmit={createSupervisorsSubmit}>
                        <Paper variant="outlined" sx={{ px: 2, py: 4 }}>
                            <Grid container spacing={3}>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="supervisor-username">
                                        Supervisor username
                                    </FormLabel>
                                    <TextField
                                        id="supervisor-username"
                                        placeholder="Please type supervisor username"
                                        variant="outlined"
                                        fullWidth
                                        onChange={e => setUsernameSupervisor(e.target.value)}
                                        error={(error && (errorMessages.username || errorMessages.username_is_available))}
                                        helperText={error && (errorMessages.username || errorMessages.username_is_available)}

                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="supervisor-password">
                                        Supervisor password
                                    </FormLabel>
                                    <TextField
                                        id="supervisor-password"
                                        type={showPassword ? 'text' : 'password'}
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Please type supervisor password"
                                        error={error && errorMessages.password}
                                        helperText={error && errorMessages.password}
                                        onChange={e => setPasswordSupervisor(e.target.value)}
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
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="supervisor-name">
                                        Supervisor name
                                    </FormLabel>
                                    <TextField
                                        id="supervisor-name"
                                        placeholder="Please type supervisor name"
                                        variant="outlined"
                                        fullWidth
                                        onChange={e => setNameSupervisor(e.target.value)}
                                        error={error && errorMessages.name}
                                        helperText={error && errorMessages.name}
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="supervisor-phone">
                                        Supervisor phone
                                    </FormLabel>
                                    <TextField
                                        id="supervisor-phone"
                                        placeholder="Please type supervisor phone"
                                        variant="outlined"
                                        fullWidth
                                        onChange={e => setPhoneSupervisor(e.target.value)}
                                        error={error && errorMessages.phone}
                                        helperText={error && errorMessages.phone}
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="supervisor-address">
                                        Supervisor address
                                    </FormLabel>
                                    <TextField
                                        id="supervisor-address"
                                        placeholder="Please type supervisor address"
                                        variant="outlined"
                                        fullWidth
                                        onChange={e => setAddressSupervisor(e.target.value)}
                                        error={error && errorMessages.address}
                                        helperText={error && errorMessages.address}
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    {serverFailed ? (
                                        <Alert severity="error">
                                            <Typography>Create Failed</Typography>
                                        </Alert>
                                    ) : (
                                        serverSucces && (
                                            <Alert severity="success">
                                                <Typography>Create success</Typography>
                                            </Alert>
                                        )
                                    )}
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <Button
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        type='submit'
                                    >
                                        {loading ? <CircularProgress sx={{ color: "white" }} size={24} /> : "Create"}
                                    </Button>
                                </FormGrid>
                            </Grid>
                        </Paper>
                    </form>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                    <form onSubmit={createCoordinatorSubmit}>
                        <Paper variant="outlined" sx={{ px: 2, py: 4 }}>
                            <Grid container spacing={3}>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="coordinator-username">
                                        Coordinator username
                                    </FormLabel>
                                    <TextField
                                        id="coordinator-username"
                                        placeholder="Please type coordinator username"
                                        variant="outlined"
                                        fullWidth
                                        onChange={e => setUsernameCoordinator(e.target.value)}
                                        error={(error && (errorMessages.username || errorMessages.username_is_available))}
                                        helperText={error && (errorMessages.username || errorMessages.username_is_available)}
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="coordinator-password">
                                        Coordinator password
                                    </FormLabel>
                                    <TextField
                                        id="coordinator-password"
                                        type={showPassword ? 'text' : 'password'}
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Please type coordinator password"
                                        onChange={e => setPasswordCoordinator(e.target.value)}
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
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="coordinator-name">
                                        Coordinator name
                                    </FormLabel>
                                    <TextField
                                        id="coordinator-name"
                                        placeholder="Please type coordinator name"
                                        variant="outlined"
                                        fullWidth
                                        onChange={e => setNameCoordinator(e.target.value)}
                                        error={error && errorMessages.name}
                                        helperText={error && errorMessages.name}
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="coordinator-phone">
                                        Coordinator phone
                                    </FormLabel>
                                    <TextField
                                        id="coordinator-phone"
                                        placeholder="Please type coordinator phone"
                                        variant="outlined"
                                        fullWidth
                                        onChange={e => setPhoneCoordinator(e.target.value)}
                                        error={error && errorMessages.phone}
                                        helperText={error && errorMessages.phone}
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="coordinator-address">
                                        Coordinator address
                                    </FormLabel>
                                    <TextField
                                        id="coordinator-address"
                                        placeholder="Please type coordinator address"
                                        variant="outlined"
                                        onChange={e => setAddressCoordinator(e.target.value)}
                                        fullWidth
                                        error={error && errorMessages.address}
                                        helperText={error && errorMessages.address}
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    {serverFailed ? (
                                        <Alert severity="error">
                                            <Typography>Create Failed</Typography>
                                        </Alert>
                                    ) : (
                                        serverSucces && (
                                            <Alert severity="success">
                                                <Typography>Create success</Typography>
                                            </Alert>
                                        )
                                    )}
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <Button
                                        type='submit'
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                    >
                                        {loading ? <CircularProgress sx={{ color: "white" }} size={24} /> : "Create"}
                                    </Button>
                                </FormGrid>
                            </Grid>
                        </Paper>
                    </form>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <form onSubmit={createExaminerSubmit}>
                        <Paper variant="outlined" sx={{ px: 2, py: 4 }}>
                            <Grid container spacing={3}>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="examiner-username">
                                        Examiner username
                                    </FormLabel>
                                    <TextField
                                        id="examiner-username"
                                        placeholder="Please type examiner username"
                                        variant="outlined"
                                        fullWidth
                                        onChange={e => setUsernameExaminer(e.target.value)}
                                        error={(error && (errorMessages.username || errorMessages.username_is_available))}
                                        helperText={error && (errorMessages.username || errorMessages.username_is_available)}
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="examiner-password">
                                        Examiner password
                                    </FormLabel>
                                    <TextField
                                        id="examiner-password"
                                        placeholder="Please type examiner password"
                                        type={showPassword ? 'text' : 'password'}
                                        variant="outlined"
                                        fullWidth
                                        onChange={e => setPasswordExaminer(e.target.value)}
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
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="examiner-name">
                                        Examiner name
                                    </FormLabel>
                                    <TextField
                                        id="examiner-name"
                                        placeholder="Please type examiner name"
                                        variant="outlined"
                                        onChange={e => setNameExaminer(e.target.value)}
                                        error={error && errorMessages.name}
                                        helperText={error && errorMessages.name}
                                        fullWidth
                                    />
                                </FormGrid>

                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="examiner-phone">
                                        Examiner phone
                                    </FormLabel>
                                    <TextField
                                        id="examiner-phone"
                                        placeholder="Please type examiner phone"
                                        variant="outlined"
                                        onChange={e => setPhoneExaminer(e.target.value)}
                                        error={error && errorMessages.phone}
                                        helperText={error && errorMessages.phone}
                                        fullWidth
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="examiner-address">
                                        Examiner address
                                    </FormLabel>
                                    <TextField
                                        id="examiner-address"
                                        placeholder="Please type examiner address"
                                        variant="outlined"
                                        onChange={e => setAddressExaminer(e.target.value)}
                                        error={error && errorMessages.address}
                                        helperText={error && errorMessages.address}
                                        fullWidth
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    {serverFailed ? (
                                        <Alert severity="error">
                                            <Typography>Create Failed</Typography>
                                        </Alert>
                                    ) : (
                                        serverSucces && (
                                            <Alert severity="success">
                                                <Typography>Create success</Typography>
                                            </Alert>
                                        )
                                    )}
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <Button
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        type='submit'
                                    >
                                        {loading ? <CircularProgress sx={{ color: "white" }} size={24} /> : "Create"}
                                    </Button>
                                </FormGrid>
                            </Grid>
                        </Paper>
                    </form>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={4}>
                    <form onSubmit={createHeadStudyProgramSubmit}>
                        <Paper variant="outlined" sx={{ px: 2, py: 4 }}>
                            <Grid container spacing={3}>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="head-study-program-username">
                                        Head study program username
                                    </FormLabel>
                                    <TextField
                                        id="head-study-program-username"
                                        placeholder="Please type head study program username"
                                        onChange={e => setUsernameHeadStudyProgram(e.target.value)}
                                        error={(error && (errorMessages.username || errorMessages.username_is_available))}
                                        helperText={error && (errorMessages.username || errorMessages.username_is_available)}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="head-study-program-password">
                                        Head study program password
                                    </FormLabel>
                                    <TextField
                                        id="head-study-program-password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Please type head study program password"
                                        onChange={e => setPasswordHeadStudyProgram(e.target.value)}
                                        error={error && errorMessages.password}
                                        helperText={error && errorMessages.password}
                                        variant="outlined"
                                        fullWidth
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
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="head-study-program-name">
                                        Head study program name
                                    </FormLabel>
                                    <TextField
                                        id="head-study-program-name"
                                        placeholder="Please type head study program name"
                                        onChange={e => setNameHeadStudyProgram(e.target.value)}
                                        error={error && errorMessages.name}
                                        helperText={error && errorMessages.name}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="head-study-program-phone">
                                        Head study program phone
                                    </FormLabel>
                                    <TextField
                                        id="head-study-program-phone"
                                        placeholder="Please type head study program phone"
                                        onChange={e => setPhoneHeadStudyProgram(e.target.value)}
                                        error={error && errorMessages.phone}
                                        helperText={error && errorMessages.phone}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FormGrid>
                                <FormGrid item xs={12}>
                                    <FormLabel htmlFor="head-study-program-address">
                                        Head study program address
                                    </FormLabel>
                                    <TextField
                                        id="head-study-program-address"
                                        placeholder="Please type head study program address"
                                        onChange={e => setAddressHeadStudyProgram(e.target.value)}
                                        error={error && errorMessages.address}
                                        helperText={error && errorMessages.address}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FormGrid>

                                <FormGrid item xs={12}>
                                    {serverFailed ? (
                                        <Alert severity="error">
                                            <Typography>Create Failed</Typography>
                                        </Alert>
                                    ) : (
                                        serverSucces && (
                                            <Alert severity="success">
                                                <Typography>Create success</Typography>
                                            </Alert>
                                        )
                                    )}
                                </FormGrid>

                                <FormGrid item xs={12}>
                                    <Button
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        type="submit"
                                    >
                                        {loading ? <CircularProgress sx={{ color: "white" }} size={24} /> : "Create"}
                                    </Button>
                                </FormGrid>
                            </Grid>
                        </Paper>
                    </form>
                </CustomTabPanel>
            </Grid>

            {/* Row one */}
            <Grid item xs={12} marginLeft={3} height={320} overflow={"scroll"} sx={{ background: "#FFFFFF" }} padding={2} borderRadius={2} >
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell><FormLabel>No</FormLabel></TableCell>
                            <TableCell> <FormLabel>Name</FormLabel></TableCell>
                            <TableCell><FormLabel>Address</FormLabel></TableCell>
                            <TableCell><FormLabel>Phone</FormLabel></TableCell>
                        </TableRow>
                    </TableHead>
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

        </Grid >
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
                <Fill />
            </Feed>

        </Box>

    )

}


export default AcademicAdministrationUser;