import * as React from 'react';

import { Box, Button, Checkbox, CircularProgress, CssBaseline, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, MenuItem, Paper, Select, TextField, Typography, styled } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import { academicAdministartionsPages } from "../helpers/constants";
import Feed from "../components/Feed";
import { useSession } from "../contexts/SessionContext";
import { getAllHeadStudyProgram } from '../api/headStudyPrograms';
import { Label, Visibility, VisibilityOff } from '@mui/icons-material';

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



function Fill(params) {

    const [headStudyProgram, setHeadStudyProgram] = React.useState("");
    const { token } = useSession();
    const [error, setError] = React.useState(false);
    const [serverSucces, setServerSucces] = React.useState(false);
    const [serverFailed, setServerFailed] = React.useState(false);
    const [errorMessages, setErrorMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);


    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [nrp, setNrp] = React.useState("");
    const [headStudyProgramId, setHeadStudyProgramId] = React.useState("");
    const [selectedItems, setSelectedItems] = React.useState([]);


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

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <form>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Grid container spacing={3}>
                            <FormGrid item xs={12} md={4}>
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
                            <FormGrid item xs={12} md={4}>
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
                            <FormGrid item xs={12} md={4}>
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
                                <TextField
                                    id="student-password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Please type student password"
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

                            <FormGrid item xs={12} md={4}>
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
                            <FormGrid item xs={12} md={4}>
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
                            <FormGrid item xs={12} md={4}>
                                <FormLabel htmlFor="nrp">
                                    Nrp
                                </FormLabel>
                                <TextField
                                    id="nrp"
                                    placeholder="Please type Nrp"
                                    variant="outlined"
                                    onChange={e => setNrp(e.target.value)}
                                    error={error && errorMessages.nrp}
                                    helperText={error && errorMessages.nrp}
                                />
                            </FormGrid>
                            <FormGrid item xs={12} md={4}>
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
                                {(errorMessages.head_study_program_id && error) && <p style={{ color: 'red' }}>{errorMessages.head_study_program_id}</p>}
                            </FormGrid>
                            <FormGrid item xs={12} md={2}>
                                <FormLabel>
                                    Role
                                </FormLabel>
                                {
                                    roleList.map((v, i) => (
                                        <FormControlLabel key={i} control={<Checkbox value={`${v.value}`} onChange={handleChange} checked={selectedItems.includes(`${v.value}`)} />} label={v.name} />
                                    ))
                                }
                                {(errorMessages.roles && error) && <p style={{ color: 'red' }}>{errorMessages.roles}</p>}
                            </FormGrid>
                            <FormGrid item xs={12} md={2}>
                                <Button
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    type='submit'
                                >
                                    {loading ? <CircularProgress sx={{ color: "white" }} size={24} /> : "Create"}
                                </Button>
                            </FormGrid>
                            <FormGrid item xs={12} md={12}>
                                <Typography variant='caption'>{errorMessages.not_valid_role && error}</Typography>
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