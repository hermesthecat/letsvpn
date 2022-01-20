import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
//import {useGlobal} from 'reactn';
import {appBarHeight, drawerWidth} from "../../../app/theme";
import NavTopLeft from "./NavTopLeft";
import clsx from "clsx";
import NavTopRight from "./NavTopRight";
import {connect} from "react-redux";
import {styled} from "@mui/material";


const PREFIX = 'NavTop';

const classes = {
    toolbar: `${PREFIX}-toolbar`,
    appBar: `${PREFIX}-appBar`,
    appBarShift: `${PREFIX}-appBarShift`
};

const StyledAppBar = styled(AppBar)(({theme}: any) => ({
    [`& .${classes.toolbar}`]: {
        //paddingRight: 24, // keep right padding when drawer closed
        height: appBarHeight,
        minHeight: appBarHeight,
        display: 'flex',
        justifyContent: 'space-between',
    },

    [`&.${classes.appBar}`]: {
        height: appBarHeight,
        zIndex: theme.zIndex.drawer - 1,
        backgroundColor: theme.palette.primary.main,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },

    [`&.${classes.appBarShift}`]: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }
}));

function NavTop(props: any) {
    const { drawerOpen } = props;




    return (
        <StyledAppBar position="fixed" className={clsx(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
        })}>
            <Toolbar className={classes.toolbar}>
                <NavTopLeft />
                <NavTopRight />
            </Toolbar>
        </StyledAppBar>
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
