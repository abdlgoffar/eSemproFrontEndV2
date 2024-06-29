



import { examinerPages } from "../helpers/constants";





import { Alert, Box, CssBaseline, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import AppBarAndDrawer from "../components/AppBarAndDrawer";
import Feed from "../components/Feed";
import React from "react";

import WarningRoundedIcon from '@mui/icons-material/WarningRounded';


function Fill(params) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Alert severity="info" icon={<WarningRoundedIcon />}>
                        Attendance seminar proposal
                    </Alert>
                    <Stack
                        marginLeft={1}
                        direction="column"
                        divider={<Divider flexItem />}
                        spacing={2}
                        sx={{ my: 2 }}
                    >
                        <div>
                            <Typography color="text.secondary" gutterBottom variant="caption">
                                Date: 2024-07-23, Hour: 08:00-end
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="subtitle2" gutterBottom>
                                Click here for attendance
                            </Typography>
                        </div>
                    </Stack>
                </Paper>
            </Grid>
        </Grid>
    )
}







const ExaminerAttendance = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation or appbar and drawer */}
            <AppBarAndDrawer title={"Absensi"} pages={examinerPages()} />

            {/* Content */}
            <Feed>
                <Fill />
            </Feed>

        </Box>

    )
}

export default ExaminerAttendance;