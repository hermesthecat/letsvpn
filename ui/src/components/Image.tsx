import React from 'react';
import {Box} from "@mui/material";


export default function Image(props: any) {
    return (
        <Box component={'img'} {...props} />
    );

}
