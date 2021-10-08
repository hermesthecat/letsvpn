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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'middle',
    },
    [`& .${classes.testcss}`]: {
        backgroundColor: 'rgba(255,0,0,0.5) !important',
    },
}));

function PageWGServers(props: any) {


    const { api, servers } = props;
    const { setWGServers } = props;

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const loadWGServers = async () => {
         api({url: '/api/wg/servers/'}).then((data: WGServer[]) => {
            console.debug('WireGuard servers data', data);
            setWGServers(data);
            setLoading(false);
            setError(false);
        }).catch((e: any) => {
            console.error('Error fetching WireGuard servers', e);
            setError(true);
            setLoading(false);
        });
    }

    useEffect(() => {
        loadWGServers().then();
    }, []);

    return (
        <StyledFullPageLayout title={'Servers'} header={'WireGuard Servers'} className={classes.testcss}>
                <SpeedDial ariaLabel={'DEBUG'} sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                    <SpeedDialAction onClick={() => {setLoading(!loading)}} tooltipTitle={'Loading'} icon={<div>L</div>}/>
                    <SpeedDialAction onClick={() => {setError(!error)}} tooltipTitle={'Error'} icon={<div>Er</div>}/>
                    <SpeedDialAction onClick={() => {setWGServers([])}} tooltipTitle={'Empty'} icon={<div>Em</div>}/>
                </SpeedDial>

                <Fade in={loading}><Box className={classes.loadingBox}><CircularProgress /></Box></Fade>
                <Fade in={!loading && error} unmountOnExit><div>Error</div></Fade>
                <Fade in={!loading && !error && servers.length === 0} unmountOnExit><div>Empty</div></Fade>
                <Fade in={!loading && !error && servers.length > 0}>
                    <Box>
                        <a href={'/admin/letsvpn/wireguardserver/add/'} target={'_BLANK'}><Button variant={'contained'} startIcon={<AddCircleIcon/>} sx={{m:1}}>New Peer</Button></a>
                        {servers.map((s: WGServer) => <WGServerBlock server={s} key={s.id}/>)}
                    </Box>
                </Fade>
        </StyledFullPageLayout>
    );

}

PageWGServers.defaultProps = {
    users: [],
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    servers: state.wgservers.servers,
})

const mapDispatchToProps = {
    setWGServers,
    api,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageWGServers)
