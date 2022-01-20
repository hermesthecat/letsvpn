import React from 'react';
import {lighten} from '@mui/material/styles';
import {appBarHeight, drawerWidth} from "app/theme";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import {toggleDrawer,} from "features/app/appSlice";
import {connect} from "react-redux";
import NavLeftAuth from "features/auth/nav";
import NavLeftApp from "features/app/nav";
import {grey} from "@mui/material/colors";
import {styled} from "@mui/material";
import NavLeftWGServers from "features/wgserver/nav";
import NavLeftWGPeers from "features/wgpeers/nav";


const PREFIX = 'NavLeft';

const classes = {
    root: `${PREFIX}-root`,
    drawerPaper: `${PREFIX}-drawerPaper`,
    drawerHeader: `${PREFIX}-drawerHeader`,
    nested: `${PREFIX}-nested`,
    link: `${PREFIX}-link`
};

const StyledDrawer = styled(Drawer)(({theme}: any) => ({
    [`&.${classes.root}`]: {
        width: drawerWidth,
        flexShrink: 0,
    },

    [`& .${classes.drawerPaper}`]: {
        width: drawerWidth,
        backgroundColor: lighten(grey[900], 0.03),
    },

    [`& .${classes.drawerHeader}`]: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        //...theme.mixins.toolbar,
        height: appBarHeight,
        justifyContent: 'flex-end',
    },

    [`& .${classes.nested}`]: {
        paddingLeft: theme.spacing(4),
    },

    [`& .${classes.link}`]: {
        color: 'inherit',
        textDecoration: 'none',
    }
}));

function NavLeft(props: any) {


    // Redux state
    const { drawerOpen } = props;
    // Redux callbacks
    const { toggleDrawer } = props;

    return (
        <StyledDrawer
            className={classes.root}
            variant={'persistent'}
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
                <NavLeftWGPeers/>
                <NavLeftWGServers/>
            </List>
        </StyledDrawer>
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
