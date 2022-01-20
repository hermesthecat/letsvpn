// @ts-nocheck TODO
import React, {useState} from 'react';
import FullPageLayout from "components/FullPageLayout";
import {connect} from "react-redux";
import {api} from "features/auth/authSlice";
import {
    Box,
    Button,
    Fade,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import WGPeerRow from "../components/WGPeerRow";
import {setWGPeers} from "../wgPeersSlice";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useGetAllPeersQuery} from "features/auth/apiSlice";
import clsx from "clsx";
import {sleep} from "../../../lib/common";
import ErrorIcon from '@mui/icons-material/Error';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RefreshIcon from '@mui/icons-material/Refresh';
import WGPeerRowSkeleton from "../components/WGPeerRowSkeleton";


const PREFIX = 'PageWGPeers';
const classes = {
    errorBox: `${PREFIX}-errorBox`,
    loadingBox: `${PREFIX}-loadingBox`,
    testcss: `${PREFIX}-testcss`,
    skeleton: `${PREFIX}-skeleton`,
    hide: `${PREFIX}-hide`,
};

const StyledFullPageLayout = styled(FullPageLayout)(({theme}: any) => ({
    [`& .${classes.errorBox}`]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'middle',
    },
    [`& .${classes.loadingBox}`]: {
        //display: 'flex',
        //justifyContent: 'center',
        //alignItems: 'middle',
    },
    [`& .${classes.testcss}`]: {
        backgroundColor: 'rgba(255,0,0,0.5) !important',
    },
    [`& .${classes.skeleton}`]: {
        borderRadius: 5,
    },
    [`& .${classes.hide}`]: {
        display: 'none',
    },
}));

function PageWGPeers(props: any) {


    const { api, } = props;
    const { setWGPeers } = props;

    // @ts-ignore
    const { data: peers, error, isLoading, refetch, isFetching } = useGetAllPeersQuery();
    const [loading, setLoading] = useState(isLoading);
    const isEmpty = true;
/*<Fade in={isLoading} appear={false}>
<Fade in={isLoading} addEndListener={() => {
                console.log('loading', isLoading);
                if (!isLoading) {
                    console.log('sleeping')
                    sleep(250).then();
                    console.log('done sleeping')
                    setLoading(false);
                }
            }} className={clsx({
                [classes.hide]: !loading,
            })}>


            <Fade in={!isLoading && !error && peers?.length === 0} unmountOnExit><div>Empty</div></Fade>
 */
    const handleRefetch = () => {
        refetch();
    }
    return (
        <StyledFullPageLayout title={'Peers'} header={'WireGuard Peers'} className={classes.testcss}>
            <Fade timeout={195/2} in={isFetching} addEndListener={() => {
                console.log('loading', isLoading);
                if (!isLoading) {
                    console.log('sleeping')
                    sleep(195/2).then();
                    console.log('done sleeping');
                    setLoading(false);
                }
            }} className={clsx({
                [classes.hide]: !loading,
            })}>

                <Box className={classes.loadingBox}>
                    <Button variant={'contained'} startIcon={<AddCircleIcon/>} sx={{m:1}} disabled>New Peer</Button>
                    <WGPeerRowSkeleton/>
                </Box>
            </Fade>

            <Fade in={!isFetching && error !== undefined} unmountOnExit>
                <Box sx={{minHeight: 200, textAlign: 'center', pt: 5}}>
                    <ErrorIcon sx={{width: 50, height: 50, color: 'error.dark', opacity: 0.7}}/>
                    <Typography variant={'h6'} sx={{color: 'error.dark', opacity: 0.7, my: 1}}>Encountered an error fetching your WireGuard peers.</Typography>
                    <Button color={'primary'} sx={{mt: 2}} variant={'contained'} startIcon={<RefreshIcon/>} onClick={handleRefetch}>Refresh</Button>
                </Box>
            </Fade>
            <Fade in={!isFetching && !error && peers?.length === 0} unmountOnExit>
                <Box sx={{textAlign: 'center', mt: 2}}>
                    <Typography variant={'h6'} sx={{mb: 1,}}>There are no peers added yet.</Typography>
                    <a href={'/admin/letsvpn/wireguardpeer/add/'} target={'_BLANK'}><Button variant={'contained'} startIcon={<AddCircleIcon/>} sx={{m:1}}>New Peer <OpenInNewIcon sx={{transform: 'scale(0.7)'}}/></Button></a>
                </Box>
            </Fade>
            <Fade in={!isFetching && !error && peers?.length > 0}>
                <Box>
                    <a href={'/admin/letsvpn/wireguardpeer/add/'} target={'_BLANK'}><Button variant={'contained'} startIcon={<AddCircleIcon/>} sx={{m:1}}>New Peer <OpenInNewIcon sx={{transform: 'scale(0.7)'}}/></Button></a>
                    <TableContainer component={Paper} sx={{ p: 1 }} elevation={6}>
                        <Table size={'small'}>
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell />
                                    <TableCell>Username</TableCell>
                                    <TableCell>Interface</TableCell>
                                    <TableCell>IP Address</TableCell>
                                    <TableCell>DNS</TableCell>
                                    <TableCell>Tunneled IPs</TableCell>
                                    <TableCell>Enabled</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {peers?.map((p: any) => <WGPeerRow peer={p} key={p.id}/>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Fade>
        </StyledFullPageLayout>
    );

}

PageWGPeers.defaultProps = {
    users: [],
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    peers: state.wgpeers.peers,
})

const mapDispatchToProps = {
    setWGPeers,
    api,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageWGPeers)
