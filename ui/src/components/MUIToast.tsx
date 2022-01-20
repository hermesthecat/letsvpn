import React from 'react';
import {Alert, styled} from "@mui/material";

const PREFIX = 'MUIToast';
const classes = {
    root: `${PREFIX}-root`,
};

const StyledAlert = styled(Alert)(({ theme }: any) => ({
    [`& .${classes.root}`]: {
        padding: theme.spacing(10),
    },
}));

export default function MUIToast(props: any) {
    const { children, appearance } = props;

    return (
        <StyledAlert elevation={3} variant={'filled'} sx={{mb: 1}} severity={appearance} children={children} />
    );
}
