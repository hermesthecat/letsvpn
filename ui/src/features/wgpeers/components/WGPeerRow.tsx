import React, {useState} from 'react';
import {
    Avatar,
    Collapse,
    Grid,
    IconButton,
    styled,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "components/Image";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {api} from "features/auth/authSlice";
import {connect} from "react-redux";
import {WGPeer} from "../../../app/types";
import isPropValid from "@emotion/is-prop-valid";

const PREFIX = 'WGPeerRow';
const classes = {
    row: `${PREFIX}-row`,
    faderow: `${PREFIX}-faderow`,
};

interface StyleProps {
    peerEnabled: boolean,
    theme?: any,
}

const StyledTableRow = styled(TableRow, {
    shouldForwardProp: prop => isPropValid(prop) && prop !== 'peerEnabled'
})(({ peerEnabled, theme }: StyleProps) => ({
    [`&.${classes.faderow}`]: {opacity: peerEnabled ? 1 : 0.4, color: 'red',},
}));

function WGPeerRow(props: any) {
    //const { peer } = props;
    const { api } = props;

    const [peer, setPeer] = useState<WGPeer>(props.peer);
    const [open, setOpen] = useState<boolean>(false);

    const toggleOpen = () => {
        setOpen(!open);
    }

    const toggleEnabled = () => {
        // TODO: call API to toggle enable state of peer
        api({url: `/api/wg/peers/${peer.id}/toggle/`}).then((data: WGPeer) => {
            if (data)
                setPeer({...data});
        })
    }

    return (
        <>
            <StyledTableRow peerEnabled={peer.enabled} className={classes.row}>
                <TableCell><IconButton onClick={toggleOpen}>{open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</IconButton></TableCell>
                <TableCell sx={{opacity: peer.enabled ? 1 : 0.2}}><Avatar src={peer.user.gravatar}/></TableCell>
                <TableCell sx={{opacity: peer.enabled ? 1 : 0.2}}>{peer.user.username}</TableCell>
                <TableCell sx={{opacity: peer.enabled ? 1 : 0.2}}>{peer.server.name}</TableCell>
                <TableCell sx={{opacity: peer.enabled ? 1 : 0.2, fontFamily: 'monospace'}}>{peer.address}</TableCell>
                <TableCell sx={{opacity: peer.enabled ? 1 : 0.2, fontFamily: 'monospace'}}>{peer.dns}</TableCell>
                <TableCell sx={{opacity: peer.enabled ? 1 : 0.2, fontFamily: 'monospace'}}>{peer.allowed_ips}</TableCell>
                <TableCell><Switch checked={peer.enabled} onChange={toggleEnabled} /></TableCell>
                <TableCell> </TableCell>
            </StyledTableRow>
            <TableRow>
                <TableCell colSpan={8} sx={{ p: 0, borderWidth: 0 }}>
                    <Collapse in={open}>
                        <Grid container spacing={0}>
                            <Grid item md={4} sx={{ px: 4, py: 2, alignItems: 'middle', display: 'flex' }}>
                                <Image src={peer.qr} alt={'qr image'} sx={{ width: '100%', height: 'auto' }}/>
                            </Grid>
                            <Grid item md={8}>
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Private Key</TableCell>
                                                <TableCell sx={{ fontFamily: 'monospace' }}>{peer.private_key}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Public Key</TableCell>
                                                <TableCell sx={{ fontFamily: 'monospace' }}>{peer.public_key}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Allowed IPs</TableCell>
                                                <TableCell sx={{ fontFamily: 'monospace' }}>{peer.allowed_ips}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Tunnel Address</TableCell>
                                                <TableCell sx={{ fontFamily: 'monospace' }}>{peer.address}/{peer.server.subnet}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ borderBottom: 'none' }}>DNS</TableCell>
                                                <TableCell sx={{ borderBottom: 'none', fontFamily: 'monospace' }}>{peer.dns}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );

}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {
    api,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WGPeerRow);
