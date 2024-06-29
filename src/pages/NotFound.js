import { Box, Grid, Typography } from "@mui/material";
import Feed from "../components/Feed";


function Fill(params) {
    return (
        <Grid item xs={12} Height={"100vh"} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Typography variant="h6" color={"#b0bec5"} >
                404 PAGE NOT FOUND
            </Typography>
        </Grid>
    )
}




const NotFound = () => {

    return (

        <Box sx={{ display: 'flex' }}>

            <Feed>
                <Fill />
            </Feed>

        </Box>

    )
}

export default NotFound;