import * as React from 'react';

import { Box, Button, CssBaseline, FormLabel, Grid, MenuItem, TextField, Paper, Select, Tooltip, styled, CircularProgress, ListItem, Checkbox, ListItemButton, ListItemAvatar, Avatar, ListItemText, Divider, FormControl, InputLabel } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";

import { academicAdministartionsPages } from "../helpers/constants";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSession } from '../contexts/SessionContext';
import { getAllCoordinators } from '../api/coordinators';
import { createInvitation, createProposalInvitation, getStudents, rollbackCreateInvitation } from '../api/academicAdministrations';
import { getAllRooms } from '../api/rooms';


const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));


const CardCheckbox = styled("div")(({ theme }) => ({
    margin: 3,
    padding: 1,
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
}));



export const InputCheckbox = styled("input")(({ theme }) => ({
    height: "100%"
}));

function Fill(params) {

    const [hour, setHour] = React.useState("");
    const [roomId, setRoomId] = React.useState("");
    const [date, setDate] = React.useState("");
    const [coordinatorId, setCoordinatorId] = React.useState("");
    const [pdf, setPdf] = React.useState();

    const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
    const { token } = useSession();
    const [error, setError] = React.useState(false);
    const [serverSucces, setServerSucces] = React.useState(false);
    const [serverFailed, setServerFailed] = React.useState(false);
    const [errorMessages, setErrorMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [students, setStudents] = React.useState([]);
    const [coordinators, setCoordinators] = React.useState([]);
    const [rooms, setRooms] = React.useState([]);
    const [selectedItems, setSelectedItems] = React.useState([]);
    // Clean state
    React.useEffect(() => {
        if (error === true) {
            setTimeout(() => {
                setError(false);
            }, 5000);
        }
    }, [error]);

    React.useEffect(() => {
        async function get() {
            try {
                const response = await getAllRooms(token);
                setRooms(response.data);
            } catch (error) {
                console.log('Error get all rooms ', error.message);
            }
        }
        get()
    }, [token]);

    React.useEffect(() => {
        async function get() {
            try {
                const response = await getAllCoordinators(token);
                setCoordinators(response.data);
            } catch (error) {
                console.log('Error get all coordinators ', error.message);
            }
        }
        get()
    }, [token]);

    React.useEffect(() => {
        async function get() {
            try {
                const response = await getStudents(token, roomId);
                setStudents(response);
            } catch (error) {
                console.log('Error get students ', error.message);
            }
        }
        get()
    }, [token, roomId]);

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


    async function createInvitationSubmit(e) {
        e.preventDefault();

        setLoading(true);

        const form = new FormData();
        form.append("date", date);
        form.append("hour", hour);
        form.append("coordinator", coordinatorId);
        if (typeof pdf === "undefined" || pdf === null || pdf === "") {
            form.append("invitation_file", " ");
        } else {
            form.append("invitation_file", pdf);
        }

        console.log(selectedItems);

        const body = {
            "hour": hour,
            "date": date,
            "coordinator": coordinatorId,
            "students_proposals": selectedItems

        }

        let requestCreateInvitation = false;
        let invitationId;


        try {

            //Request One
            let response = await createInvitation(form, token);

            requestCreateInvitation = true;
            invitationId = response.invitation.id;

            //Request Two
            await createProposalInvitation(body, token, response.invitation.id);

            setServerSucces(true);
            setRedirectToReferrer(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setError(true);
                setErrorMessages(error.response.data.errors.messages);
                // //Server Error
                // if (error.response.data.errors.messages.create_invitation_data_failed) {
                //     setServerFailed(true);
                // }
                //Rollback 
                if (requestCreateInvitation === true) {
                    try {
                        await rollbackCreateInvitation(token, invitationId);
                    } catch (error) {
                        console.log('Error rollback create invitation ', error.message);
                    }
                }
            } else if (error.request) {
                console.log('The request was made but no response was received');
            } else {
                console.log('Error', error.message);
            }
        }

    }

    if (redirectToReferrer) {
        window.location.reload();
    }


    return (
        <Grid container spacing={3}>

            {/* Row one */}
            <Grid item xs={12}>
                <form onSubmit={createInvitationSubmit}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Grid container spacing={3}>


                            <FormGrid item xs={6} md={6}>
                                <FormLabel htmlFor="implementation-date">
                                    Tanggal Pelaksanaan
                                </FormLabel>
                                <TextField
                                    id="implementation-date"
                                    placeholder="Please type implementation date"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    error={error && errorMessages.date}
                                    helperText={error && errorMessages.date}
                                    onChange={e => setDate(e.target.value)}
                                />
                            </FormGrid>

                            <FormGrid item xs={6} md={6}>
                                <FormLabel htmlFor="implementation-hour">
                                    Jam Pelaksanaan
                                </FormLabel>
                                <TextField
                                    id="implementation-hour"
                                    placeholder="Please type implementation hour"
                                    type="time"
                                    variant="outlined"
                                    fullWidth
                                    error={error && errorMessages.hour}
                                    helperText={error && errorMessages.hour}
                                    onChange={e => setHour(e.target.value)}
                                />
                            </FormGrid>

                            <FormGrid item xs={12}>
                                <FormLabel htmlFor="coordinator">
                                    Dosen Coordinator
                                </FormLabel>
                                <Select
                                    id="coordinator"
                                    variant="outlined"
                                    defaultValue={""}
                                    onChange={e => setCoordinatorId(e.target.value)}>
                                    {
                                        coordinators.map((v, i) => (
                                            <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                                {(errorMessages.coordinator && error) && <p style={{ color: 'red' }}>{errorMessages.coordinator}</p>}
                                {(errorMessages.coord_have_schedule && error) && <p style={{ color: 'red' }}>{errorMessages.coord_have_schedule}</p>}
                            </FormGrid>

                            <FormGrid item xs={12}>
                                <Paper square variant="outlined" sx={{ background: "#C1C1C1" }}>
                                </Paper>
                            </FormGrid>
                            <FormGrid item xs={12} sx={{ overflowY: "scroll" }} marginBottom={1}>

                                {/*  */}

                                <FormControl variant="standard" sx={{ marginBottom: 3, width: 350 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Show proposal berdasarkan kelas ujian</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        defaultValue={""}
                                        onChange={e => setRoomId(e.target.value)}
                                        label="Show proposal berdasarkan kelas ujian"
                                    >
                                        {
                                            rooms.map((v, i) => (
                                                <MenuItem key={i} value={v.id}>{v.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>

                                {/*  */}
                                {
                                    students.map((v, i) => (

                                        <CardCheckbox key={i}>
                                            <ListItem
                                                secondaryAction={
                                                    <Checkbox
                                                        edge="end"
                                                        onChange={handleChange}
                                                        checked={selectedItems.includes(`${v.proposal_id}`)}
                                                        value={`${v.proposal_id}`}
                                                        disabled={v.proposal_invitation !== null}

                                                    />
                                                }
                                                disablePadding
                                            >
                                                <ListItemButton>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            variant="rounded"
                                                            alt={`Avatar`}
                                                            src={``}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={v.student_name} />
                                                </ListItemButton>
                                            </ListItem>
                                        </CardCheckbox>
                                    ))
                                }
                                {(errorMessages.students_proposals && error) && <p style={{ color: 'red' }}>{errorMessages.students_proposals}</p>}
                                {(errorMessages.examiner_have_schedule && error) && <p style={{ color: 'red' }}>{errorMessages.examiner_have_schedule}</p>}
                            </FormGrid>

                            <FormGrid item xs={3} md={3}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    onChange={(e) => setPdf(e.target.files[0])}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    PDF
                                    <input type="file" style={{ display: 'none' }} />
                                </Button>
                                {(errorMessages.invitation_file && error) && <p style={{ color: 'red' }}>{errorMessages.invitation_file}</p>}
                            </FormGrid>
                            <FormGrid item xs={9} md={9}>
                                <Button variant="outlined" type='submit'> {loading ? <CircularProgress sx={{ color: "#1975D1" }} size={24} /> : "Undang"}
                                </Button>
                            </FormGrid>
                        </Grid>
                    </Paper>
                </form >

            </Grid >

        </Grid >
    )
}






const AcademicAdministrationInvitation = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer title={"Pengundangan Seminar"} pages={academicAdministartionsPages()} />

            {/* Content */}
            <Feed>
                <Fill />
            </Feed>

        </Box>

    )

}


export default AcademicAdministrationInvitation;