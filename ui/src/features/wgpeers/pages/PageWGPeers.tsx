// @ts-nocheck TODO
import React, {useEffect, useState} from 'react';
import FullPageLayout from "components/FullPageLayout";
import {connect} from "react-redux";
import {api, newAPI} from "features/auth/authSlice";
import {
    Avatar, Box, Button, CircularProgress, Fade,
    IconButton,
    Paper, Skeleton, SpeedDial, SpeedDialAction,
    styled, Switch, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import WGPeerRow from "../components/WGPeerRow";
import {setWGPeers} from "../wgPeersSlice";
import {WGPeer} from "app/types";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useGetAllPeersQuery} from "features/auth/apiSlice";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import clsx from "clsx";
import {sleep} from "../../../lib/common";


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
    const { data: peers, error, isLoading } = useGetAllPeersQuery();
    const [loading, setLoading] = useState(isLoading);
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
 */
    return (
        <StyledFullPageLayout title={'Peers'} header={'WireGuard Peers'} className={classes.testcss}>
            <SpeedDial ariaLabel={'DEBUG'} sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                <SpeedDialAction onClick={() => {/*setLoading(!loading)*/}} tooltipTitle={'Loading'} icon={<div>L</div>}/>
                <SpeedDialAction onClick={() => {/*setError(!error)*/}} tooltipTitle={'Error'} icon={<div>Er</div>}/>
                <SpeedDialAction onClick={() => {setWGPeers([])}} tooltipTitle={'Empty'} icon={<div>Em</div>}/>
            </SpeedDial>
            <div>{isLoading}</div>

            <Fade timeout={195/2} in={isLoading} addEndListener={() => {
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
                    <TableContainer component={Paper} sx={{ p: 1 }}>
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
                                {[...Array(3)].map(n => <TableRow key={n}>
                                    <TableCell sx={{px: 0.5, py: 1}}><IconButton disabled><KeyboardArrowDownIcon/></IconButton></TableCell>
                                    <TableCell sx={{px: 0.5, py: 1}}><Skeleton variant={'circular'} animation={'wave'} sx={{width: 30, height: 30,}}/></TableCell>
                                    <TableCell sx={{px: 0.5, py: 1}}><Skeleton className={classes.skeleton} variant={'rectangular'} height={30} animation={'wave'}/></TableCell>
                                    <TableCell sx={{px: 0.5, py: 1}}><Skeleton className={classes.skeleton} variant={'rectangular'} height={30} animation={'wave'}/></TableCell>
                                    <TableCell sx={{px: 0.5, py: 1}}><Skeleton className={classes.skeleton} variant={'rectangular'} height={30} animation={'wave'}/></TableCell>
                                    <TableCell sx={{px: 0.5, py: 1}}><Skeleton className={classes.skeleton} variant={'rectangular'} height={30} animation={'wave'}/></TableCell>
                                    <TableCell sx={{px: 0.5, py: 1}}><Skeleton className={classes.skeleton} variant={'rectangular'} height={30} animation={'wave'}/></TableCell>
                                    <TableCell sx={{px: 0.5, py: 1}}><Skeleton className={classes.skeleton} variant={'rectangular'} height={30} animation={'wave'}/></TableCell>
                                    <TableCell sx={{px: 0.5, py: 1}}><Switch checked={false} disabled/></TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Fade>
            <Fade in={!isLoading && error} unmountOnExit><div>Error</div></Fade>
            <Fade in={!isLoading && !error && peers?.length === 0} unmountOnExit><div>Empty</div></Fade>
            <Fade in={!isLoading && !error && peers?.length > 0}>
                <Box>
                    <a href={'/admin/letsvpn/wireguardpeer/add/'} target={'_BLANK'}><Button variant={'contained'} startIcon={<AddCircleIcon/>} sx={{m:1}}>New Peer</Button></a>
                    <TableContainer component={Paper} sx={{ p: 1 }}>
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
