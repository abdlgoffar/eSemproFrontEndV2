import { Avatar, Badge, Chip, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, Toolbar, Typography, styled } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

import MuiDrawer from '@mui/material/Drawer';
import ListItems from "../templates/dashboard/listItems";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiAppBar from '@mui/material/AppBar';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { getUserUsername } from "../api/users";




const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const AppBarAndDrawer = ({ pages, title, username }) => {

    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);

    };


    return (
        <>
            {/* Navigation appbar and drawer -start- */}
            <AppBar position="absolute" open={open}>
                <Toolbar sx={{
                    pr: '24px'
                }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {title}
                    </Typography>
                    <IconButton color="inherit" >
                        {/* <Avatar /> */}
                        <Chip size={"150px"} avatar={<Avatar>{"U"}</Avatar>} label={"Username"} />
                    </IconButton>
                    <PowerSettingsNewIcon sx={{ color: '#BDBDBD', boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;", borderRadius: "2px" }} />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <ListItems data={pages} />
                    <Divider sx={{ my: 1 }} />
                    <ListItemButton sx={{ margin: 1, paddingTop: 1 }} >
                        <ListItemIcon>

                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>

            {/* Navigation appbar and drawer -end- */}
        </>
    )
}

export default AppBarAndDrawer;