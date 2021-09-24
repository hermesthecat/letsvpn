import React from 'react';
import Box from "@mui/material/Box";
import {styled} from "@mui/material";
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


export default function NavTopRight() {


    //const { isAuthenticated, user, localToken } = useAuth();
    const user = null;
    //const { addToast } = useToasts();

    return (
        <StyledBox className={classes.root}>
            <div>Avatar</div>
        </StyledBox>
    );
}