import React, {useEffect, useState} from 'react';
import {
    Box,
    Divider,
    Grid,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {api} from "features/auth/authSlice";
import {connect} from "react-redux";
import {WGServer} from "../../../app/types";
import isPropValid from '@emotion/is-prop-valid'
import WGServerBlockInfo from "./WGServerBlockInfo";


const PREFIX = 'WGServerBlock';
const classes = {
    root: `${PREFIX}-root`,
    statusIcon: `${PREFIX}-statusIcon`,
    peerSkeleton: `${PREFIX}-peerSkeleton`,
};

interface StyleProps {
    serverEnabled: boolean,
    theme?: any,
}
const StyledWGServerBlock = styled(Paper, {
    shouldForwardProp: prop => isPropValid(prop) && prop !== 'serverEnabled'
})(({ serverEnabled, theme }: StyleProps) => ({
    [`& .${classes.root}`]: {
        padding: theme.spacing(10),
    },
    [`& .${classes.statusIcon}`]: {
        color: serverEnabled ? theme.palette.success.light : theme.palette.error.light,
        filter: `drop-shadow(0 0 5px ${serverEnabled ? theme.palette.success.light : theme.palette.error.light})`,
    },
    [`& .${classes.peerSkeleton}`]: {
        borderRadius: theme.spacing(1),
        margin: theme.spacing(1, 0),
    },
}));


function WGServerBlock(props: any) {
    const { api } = props;

    const [server, setServer] = useState<WGServer>(props.server);
    // @ts-ignore TODO
    const [peers, setPeers] = useState<any>([]);
    const [peersLoading, setPeersLoading] = useState<boolean>(true);
    const [peersError, setPeersError] = useState<boolean>(true);

    const loadWGPeers = async () => {
        // TODO: Implement method to grab peers for this server
        setPeersLoading(false);
        setPeersError(false);
    }

    useEffect(() => {
        loadWGPeers().then();
    }, []);

    return (
        <StyledWGServerBlock serverEnabled={server.enabled} className={classes.root} elevation={6}>
            <Grid container spacing={0}>
                <Grid item md={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, pl: 2}}>
                    <Typography variant={'h3'}>{server.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        <WGServerBlockInfo serverID={server.id}/>
                    </Box>
                </Grid>
                <Grid item md={12}><Divider/></Grid>
                <Grid item md={6}>
                    <TableContainer>
                        <Table size={'small'}>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>Public IP</b></TableCell>
                                    <TableCell>{server.wan}{server.wan6 ? `\n${server.wan6}` : ''}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Private Key</b></TableCell>
                                    <TableCell>
                                        <TextField fullWidth disabled value={server.private_key ? server.private_key : ''} variant={'outlined'} size={'small'}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{borderBottom: 'none'}}><b>Public Key</b></TableCell>
                                    <TableCell sx={{borderBottom: 'none'}}>
                                        <TextField fullWidth disabled value={server.public_key ? server.public_key : ''} variant={'outlined'} size={'small'}/>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>



                <Grid item md={6}>
                    {/*peersLoading && <> TODO: Add peers to server block
                        <Typography variant={'h3'}>Peers</Typography>
                        <Divider/>
                        <Skeleton variant={'rectangular'} height={50} className={classes.peerSkeleton}/>
                        <Skeleton variant={'rectangular'} height={50} className={classes.peerSkeleton}/>
                        <Skeleton variant={'rectangular'} height={50} className={classes.peerSkeleton}/>
                    </>*/}
                    <Box>

                    </Box>
                </Grid>
            </Grid>
        </StyledWGServerBlock>
    );

}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {
    api,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WGServerBlock);
