import React from 'react';
import { lighten } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import {appBarHeight, drawerWidth} from "app/theme";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import {
    toggleDrawer,
} from "features/app/appSlice";
import {connect} from "react-redux";
import NavLeftAuth from "features/auth/nav";
import NavLeftApp from "features/app/nav";
import NavLeftWGUsers from "features/wgusers/nav";
import {grey} from "@mui/material/colors";


const useStyles = makeStyles(theme => ({
    root: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: lighten(grey[900], 0.03),
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        //...theme.mixins.toolbar,
        height: appBarHeight,
        justifyContent: 'flex-end',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    }
}));

function NavLeft(props: any) {
    const classes = useStyles();

    // Redux state
    const { drawerOpen } = props;
    // Redux callbacks
    const { toggleDrawer } = props;

    return (
        <Drawer
            className={classes.root}
            variant={window.innerWidth >= 960 ? "persistent" : "temporary"}
            anchor="left"
            open={drawerOpen}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={toggleDrawer} size="large"><ChevronLeftIcon /></IconButton>
            </div>
            <Divider/>
            <List>
                <NavLeftAuth/>
                <NavLeftApp/>
                <NavLeftWGUsers/>
            </List>
        </Drawer>
    );
}

const mapStateToProps = (state: any) => ({
    drawerOpen: state.app.drawerOpen,
})

const mapDispatchToProps = {
    toggleDrawer,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavLeft)