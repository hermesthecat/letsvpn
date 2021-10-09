import React, {useEffect, useState} from 'react';
import FullPageLayout from "components/FullPageLayout";
import {connect} from "react-redux";
import {api} from "features/auth/authSlice";
import {
    Avatar, Box, Button, CircularProgress, Fade,
    IconButton,
    Paper, SpeedDial, SpeedDialAction,
    styled, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import WGServerBlock from "../components/WGServerBlock";
import {setWGServers} from "../wgServerSlice";
import {WGServer} from "app/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {useGetAllPeersQuery, useGetAllServersQuery} from "../../auth/apiSlice";
import WGServerBlockSkeleton from "../components/WGServerBlockSkeleton";


const PREFIX = 'PageWGServers';
const classes = {
    errorBox: `${PREFIX}-errorBox`,
    loadingBox: `${PREFIX}-loadingBox`,
    testcss: `${PREFIX}-testcss`,
};

const StyledFullPageLayout = styled(FullPageLayout)(({theme}: any) => ({
    [`& .${classes.errorBox}`]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'middle',
    },
    [`& .${classes.loadingBox}`]: {
        //display: 'flex',
        justifyContent: 'center',
        alignItems: 'middle',
    },
    [`& .${classes.testcss}`]: {
        backgroundColor: 'rgba(255,0,0,0.5) !important',
    },
}));

export default function PageWGServers(props: any) {
    // @ts-ignore
    const { data: servers, error, isLoading } = useGetAllServersQuery();

    return (
        <StyledFullPageLayout title={'Servers'} header={'WireGuard Servers'} className={classes.testcss}>
                <Fade in={isLoading} unmountOnExit><Box className={classes.loadingBox}>{[...Array(3)].map(n => <WGServerBlockSkeleton key={n}/>)}</Box></Fade>
                <Fade in={(!isLoading && error) as boolean} unmountOnExit><div>Error</div></Fade>
                <Fade in={!isLoading && !error && servers?.length === 0} unmountOnExit><div>Empty</div></Fade>
                <Fade in={!isLoading && !error && servers?.length > 0}>
                    <Box>
                        <a href={'/admin/letsvpn/wireguardserver/add/'} target={'_BLANK'}><Button variant={'contained'} startIcon={<AddCircleIcon/>} sx={{m:1}}>New Peer</Button></a>
                        {servers?.map((s: WGServer) => <WGServerBlock server={s} key={s.id}/>)}
                    </Box>
                </Fade>
        </StyledFullPageLayout>
    );

}
