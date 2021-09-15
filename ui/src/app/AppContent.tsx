import React from 'react';
import {lighten, makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Switch} from "react-router-dom";
import {appBarHeight, discordColors, drawerWidth} from "./theme";
import clsx from "clsx";
import {connect} from "react-redux";
import AuthRoutes from "features/auth/routes";
import AppRoutes from "features/app/routes";
import PollsRoutes from "features/polls/routes";
import FlatSwitch from "../components/FlatSwitch";
import {grey} from "@material-ui/core/colors";


const useStyles = makeStyles(theme => ({
    root: {
        // @ts-ignore
        paddingTop: theme.mixins.toolbar.minHeight + theme.spacing(1),
        flexGrow: 1,
        backgroundColor: grey[900],
        minHeight: `calc(100vh)`,
    },
    content: {
        marginLeft: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    contentContainer: {
        minHeight: `calc(100vh - ${appBarHeight}px - ${theme.spacing(2)}px)`,
    }
}));


function AppContent(props: any) {
    const classes = useStyles();

    const {drawerOpen} = props;

    return (
        <main className={clsx(classes.root, classes.content, {
            [classes.contentShift]: drawerOpen && window.innerWidth >= 960,
        })}>
            <Container maxWidth={false} className={classes.contentContainer}>
                <FlatSwitch>
                    {AppRoutes}
                    {AuthRoutes}
                    {PollsRoutes}
                </FlatSwitch>
            </Container>
        </main>

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