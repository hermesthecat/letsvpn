import React from 'react';
import {lighten, makeStyles} from '@material-ui/core/styles';
import {appBarHeight, drawerWidth} from "app/theme";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {
    toggleDrawer,
} from "features/app/appSlice";
import {connect} from "react-redux";
import NavLeftAuth from "features/auth/nav";
import NavLeftApp from "features/app/nav";
import NavLeftPolls from "features/polls/nav";
import {grey} from "@material-ui/core/colors";


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
                <IconButton onClick={toggleDrawer}><ChevronLeftIcon /></IconButton>
            </div>
            <Divider/>
            <List>
                <NavLeftAuth/>
                <NavLeftApp/>
                <NavLeftPolls/>
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