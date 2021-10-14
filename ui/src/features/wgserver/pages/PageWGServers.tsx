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
    TableRow, Typography
} from "@mui/material";
import WGServerBlock from "../components/WGServerBlock";
import {setWGServers} from "../wgServerSlice";
import {WGServer} from "app/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {useGetAllPeersQuery, useGetAllServersQuery} from "../../auth/apiSlice";
import WGServerBlockSkeleton from "../components/WGServerBlockSkeleton";
import ErrorIcon from "@mui/icons-material/Error";
import RefreshIcon from "@mui/icons-material/Refresh";


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
    const { data: servers, error, isLoading, refetch, isFetching } = useGetAllServersQuery();

    const handleRefetch = () => {
        refetch();
    }

    return (
        <StyledFullPageLayout title={'Servers'} header={'WireGuard Servers'} className={classes.testcss}>
            <Fade in={isFetching === true} unmountOnExit><Box className={classes.loadingBox}>{[...Array(3)].map(n => <WGServerBlockSkeleton key={n}/>)}</Box></Fade>
            <Fade in={(!isFetching && error !== undefined) as boolean} unmountOnExit>
                <Box sx={{minHeight: 200, textAlign: 'center', pt: 4}}>
                    <ErrorIcon sx={{width: 50, height: 50, color: 'error.dark', opacity: 0.7}}/>
                    <Typography variant={'h6'} sx={{color: 'error.dark', opacity: 0.7}}>Encountered an error fetching your WireGuard servers.</Typography>
                    <Button color={'inherit'} startIcon={<RefreshIcon/>} onClick={handleRefetch}>Refresh</Button>
                </Box>
            </Fade>
            <Fade in={!isFetching && error === undefined && servers?.length === 0} unmountOnExit>
                <Box sx={{minHeight: 200, textAlign: 'center', pt: 4}}>
                    <ErrorIcon sx={{width: 50, height: 50, color: 'error.dark', opacity: 0.7}}/>
                    <Typography variant={'h6'} sx={{color: 'error.dark', opacity: 0.7}}>Encountered an error fetching your WireGuard peers.</Typography>
                </Box>
            </Fade>
            <Fade in={!isFetching && error === undefined && servers?.length > 0}>
                <Box>
                    <a href={'/admin/letsvpn/wireguardserver/add/'} target={'_BLANK'}><Button variant={'contained'} startIcon={<AddCircleIcon/>} sx={{m:1}}>New Server</Button></a>
                    {servers?.map((s: WGServer) => <WGServerBlock server={s} key={s.id}/>)}
                </Box>
            </Fade>
        </StyledFullPageLayout>
    );

}
