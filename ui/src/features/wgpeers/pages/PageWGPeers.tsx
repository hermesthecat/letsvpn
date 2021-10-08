import React, {useEffect, useState} from 'react';
import FullPageLayout from "components/FullPageLayout";
import {connect} from "react-redux";
import {api, newAPI} from "features/auth/authSlice";
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
import WGPeerRow from "../components/WGPeerRow";
import {setWGPeers} from "../wgPeersSlice";
import {WGPeer} from "app/types";
import AddCircleIcon from '@mui/icons-material/AddCircle';


const PREFIX = 'PageWGPeers';
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'middle',
    },
    [`& .${classes.testcss}`]: {
        backgroundColor: 'rgba(255,0,0,0.5) !important',
    },
}));

function PageWGPeers(props: any) {


    const { api, peers } = props;
    const { setWGPeers } = props;

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const loadWGPeers = async () => {
         // @ts-ignore
        newAPI({url: '/api/wg/peers/'}).then((data: WGPeer[]) => {
            console.debug('WireGuard peers data', data);
            setWGPeers(data);
            setLoading(false);
            setError(false);
        }).catch((e: any) => {
            console.error('Error fetching WireGuard peers', e);
            setError(true);
            setLoading(false);
        });
    }

    useEffect(() => {
        loadWGPeers().then();
    }, []);

    return (
        <StyledFullPageLayout title={'Peers'} header={'WireGuard Peers'} className={classes.testcss}>
                <SpeedDial ariaLabel={'DEBUG'} sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                    <SpeedDialAction onClick={() => {setLoading(!loading)}} tooltipTitle={'Loading'} icon={<div>L</div>}/>
                    <SpeedDialAction onClick={() => {setError(!error)}} tooltipTitle={'Error'} icon={<div>Er</div>}/>
                    <SpeedDialAction onClick={() => {setWGPeers([])}} tooltipTitle={'Empty'} icon={<div>Em</div>}/>
                </SpeedDial>

                <Fade in={loading}><Box className={classes.loadingBox}><CircularProgress /></Box></Fade>
                <Fade in={!loading && error} unmountOnExit><div>Error</div></Fade>
                <Fade in={!loading && !error && peers.length === 0} unmountOnExit><div>Empty</div></Fade>
                <Fade in={!loading && !error && peers.length > 0}>
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
                                    {peers.map((p: any) => <WGPeerRow peer={p} key={p.id}/>)}
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
