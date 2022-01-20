import React from 'react';
import Box from "@mui/material/Box";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";
import {connect} from "react-redux";
import {toggleDrawer} from "../../../features/app/appSlice";
import {styled} from "@mui/material";

const PREFIX = 'NavTopLeft';

const classes = {
    root: `${PREFIX}-root`,
    navLink: `${PREFIX}-navLink`,
    menuContent: `${PREFIX}-menuContent`,
    menuContentBox: `${PREFIX}-menuContentBox`,
    dialogActions: `${PREFIX}-dialogActions`,
    description: `${PREFIX}-description`,
    hidden: `${PREFIX}-hidden`
};

const StyledBox = styled(Box)(({theme}: any) => ({
    [`& .${classes.root}`]: {},

    [`& .${classes.navLink}`]: {
        color: '#fff',
        textDecoration: 'none',
    },

    [`& .${classes.menuContent}`]: {
        padding: 0,
    },

    [`& .${classes.menuContentBox}`]: {
        padding: theme.spacing(2),
        minWidth: 600,
    },

    [`& .${classes.dialogActions}`]: {
        display: 'flex',
        justifyContent: 'space-between',
    },

    [`& .${classes.description}`]: {
        paddingTop: theme.spacing(4),
    },

    [`& .${classes.hidden}`]: {
        display: 'none',
    }
}));


function NavTopLeft(props: any) {


    const { toggleDrawer } = props;

    return (
        <StyledBox>
            <IconButton onClick={toggleDrawer} size="large">
                <MenuIcon />
            </IconButton>
        </StyledBox>
    );
}

const mapStateToProps = (state: any) => ({

})

const mapDispatchToProps = {
    toggleDrawer,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavTopLeft)
