import React from 'react';
import Container from "@mui/material/Container";
import {appBarHeight, drawerWidth} from "./theme";
import clsx from "clsx";
import {connect} from "react-redux";
import AuthRoutes from "features/auth/routes";
import AppRoutes from "features/app/routes";
import WGUsersRoutes from "features/wgusers/routes";
import FlatSwitch from "../components/FlatSwitch";
import {grey} from "@mui/material/colors";
import {styled} from "@mui/material";


const PREFIX = 'AppContent';

const classes = {
    root: `${PREFIX}-root`,
    content: `${PREFIX}-content`,
    contentShift: `${PREFIX}-contentShift`,
    contentContainer: `${PREFIX}-contentContainer`
};

const Root = styled('main')(({theme}: any) => ({
    [`&.${classes.root}`]: {
        // @ts-ignore
        paddingTop: theme.mixins.toolbar.minHeight + 8, // TODO switch back to theme.spacing()
        flexGrow: 1,
        backgroundColor: grey[900],
        minHeight: `calc(100vh)`,
    },

    [`&.${classes.content}`]: {
        marginLeft: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },

    [`&.${classes.contentShift}`]: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },

    [`& .${classes.contentContainer}`]: {
        minHeight: `calc(100vh - ${appBarHeight}px - ${theme.spacing(2)})`,
    }
}));


function AppContent(props: any) {


    const {drawerOpen} = props;

    return (
        <Root className={clsx(classes.root, classes.content, {
            [classes.contentShift]: drawerOpen && window.innerWidth >= 960,
        })}>
            <Container maxWidth={false} className={classes.contentContainer}>
                <FlatSwitch>
                    {AppRoutes}
                    {AuthRoutes}
                    {WGUsersRoutes}
                </FlatSwitch>
            </Container>
        </Root>
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
)(AppContent)
