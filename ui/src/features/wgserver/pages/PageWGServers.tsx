import React from 'react';
import FullPageLayout from "components/FullPageLayout";
import {Box, Button, Fade, styled, Typography} from "@mui/material";
import WGServerBlock from "../components/WGServerBlock";
import {WGServer} from "app/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {useGetAllServersQuery} from "../../auth/apiSlice";
import WGServerBlockSkeleton from "../components/WGServerBlockSkeleton";
import ErrorIcon from "@mui/icons-material/Error";
import RefreshIcon from "@mui/icons-material/Refresh";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";


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
            <Fade in={isFetching === true} unmountOnExit><Box className={classes.loadingBox}>{[...Array(3)].map((n, i) => <WGServerBlockSkeleton key={i}/>)}</Box></Fade>
            <Fade in={(!isFetching && error !== undefined) as boolean} unmountOnExit>
                <Box sx={{minHeight: 200, textAlign: 'center', pt: 4}}>
                    <ErrorIcon sx={{width: 50, height: 50, color: 'error.dark', opacity: 0.7}}/>
                    <Typography variant={'h6'} sx={{color: 'error.dark', opacity: 0.7}}>Encountered an error fetching your WireGuard servers.</Typography>
                    <Button color={'primary'} sx={{mt: 2}} startIcon={<RefreshIcon/>} onClick={handleRefetch} variant={'contained'}>Refresh</Button>
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
                    <a href={'/admin/letsvpn/wireguardserver/add/'} target={'_BLANK'}><Button variant={'contained'} startIcon={<AddCircleIcon/>} sx={{m:1}}>New Server <OpenInNewIcon sx={{transform: 'scale(0.7)'}}/></Button></a>
                    {servers?.map((s: WGServer) => <WGServerBlock server={s} key={s.id}/>)}
                </Box>
            </Fade>
        </StyledFullPageLayout>
    );

}
