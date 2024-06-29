

import { Box, Grid, CircularProgress } from "@mui/material";
import Feed from "../components/Feed";


function Fill(params) {
    return (
        <Grid item xs={12} Height={"100vh"} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <CircularProgress />
        </Grid>
    )
}




const Loading = () => {

    return (
        <Box sx={{ display: 'flex' }}>

            <Feed>
                <Fill />
            </Feed>

        </Box>

    )
}

export default Loading;