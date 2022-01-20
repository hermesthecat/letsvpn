import React, {useEffect, useState} from 'react';
import FullPageLayout from "components/FullPageLayout";
import {connect} from "react-redux";
import {api} from "features/auth/authSlice";
import {Box, styled,} from "@mui/material";
import {setWGPeers} from "../wgPeersSlice";
import {WGPeer} from "app/types";


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

function PageWGServerDetails(props: any) {


    const { api, server, peers } = props;

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const loadWGPeers = async () => {
         api({url: `/api/wg/server/${server.id}`}).then((data: WGPeer[]) => {
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
        <StyledFullPageLayout title={'Details'} header={`Server: ${server.name}`} className={classes.testcss}>
                <Box>{server.wan}:{server.port}</Box>
        </StyledFullPageLayout>
    );

}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {
    setWGPeers,
    api,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageWGServerDetails)
