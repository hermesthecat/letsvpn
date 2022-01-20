import React from 'react';
import Box from "@mui/material/Box";
import {Avatar, styled} from "@mui/material";
import {logout} from "../../../features/auth/authSlice";
import {connect} from "react-redux";

const PREFIX = 'NavTopRight';

const classes = {
    root: `${PREFIX}-root`,
    avatar: `${PREFIX}-avatar`
};

const StyledBox = styled(Box)(({theme}: any) => ({
    [`&.${classes.root}`]: {},

    [`& .${classes.avatar}`]: {
        width: 40,
        height: 'auto',
        borderRadius: '50%',
    }
}));


function NavTopRight(props: any) {
    const { logout, user, isAuthenticated } = props;

    return (
        <StyledBox className={classes.root}>
            {isAuthenticated && <Avatar src={user.gravatar} sx={{mr: 1, width: 35, height: 35}} />}
        </StyledBox>
    );
}


const mapStateToProps = (state: any) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = {
    logout,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavTopRight)
