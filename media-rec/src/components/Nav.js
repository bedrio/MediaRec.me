import React from "react";
import { Link } from "react-router-dom"
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const drawerWidth = 240;

const openedMixin = () => ({
    width: drawerWidth,
    backgroundColor: "#1B1E28",
    color: "#CBE0F2",
    overflowX: "hidden",
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));        

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": openedMixin(),
        })
    }),
);

const Nav = ({ children }) => {
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Drawer variant="permanent" open={true}>
                <DrawerHeader>
                    MediaRec
                </DrawerHeader>
                
                <List>
                    <Link style={{ textDecoration: 'none', color:"#CBE0F2" }} to="/">
                        <ListItem button key="MediaList">
                            <ListItemIcon>
                                <FormatListBulletedIcon color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary="Media List"/>
                        </ListItem>
                    </Link>
                    <Link style={{ textDecoration: 'none', color:"#CBE0F2" }} to="friends">
                        <ListItem button key="Friends">
                            <ListItemIcon>
                                <GroupIcon color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary="Friends"/>
                        </ListItem>
                    </Link>
                    <Link style={{ textDecoration: 'none', color:"#CBE0F2" }} to="notifications">
                        <ListItem button key="Notifications">
                            <ListItemIcon>
                                <NotificationsIcon color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary="Notifications"/>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3}} backgroundColor="#161923" color="#CBE0F2">
                {children}
            </Box>
        </Box>
    );
}

export default Nav
