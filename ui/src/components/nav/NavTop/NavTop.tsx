import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import {useGlobal} from 'reactn';
import {appBarHeight, discordColors, drawerWidth} from "../../../app/theme";
import NavTopLeft from "./NavTopLeft";
import clsx from "clsx";
import NavTopRight from "./NavTopRight";
import {blue} from "@material-ui/core/colors";
import {connect} from "react-redux";


const useStyles = makeStyles(theme => ({
    toolbar: {
        //paddingRight: 24, // keep right padding when drawer closed
        height: appBarHeight,
        minHeight: appBarHeight,
        display: 'flex',
        justifyContent: 'space-between',
    },
    appBar: {
        height: appBarHeight,
        zIndex: theme.zIndex.drawer - 1,
        backgroundColor: theme.palette.primary.main,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

function NavTop(props: any) {
    const { drawerOpen } = props;

    const classes = useStyles();


    return (
        <AppBar position="fixed" className={clsx(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
        })}>
            <Toolbar className={classes.toolbar}>
                <NavTopLeft />
                <NavTopRight />
            </Toolbar>
        </AppBar>
    );
}

const mapStateToProps = (state: any) => ({
    drawerOpen: state.app.drawerOpen,
})

const mapDispatchToProps = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavTop)
