import React, {useEffect} from 'react';
import {
    Divider,
    Grid,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";


const PREFIX = 'WGUser';

const classes = {
    root: `${PREFIX}-root`,
    userInfo: `${PREFIX}-userInfo`,
    avatar: `${PREFIX}-avatar`,
    username: `${PREFIX}-username`,
    qr: `${PREFIX}-qr`
};

const StyledPaper = styled(Paper)(({theme}: any) => ({
    [`&.${classes.root}`]: {
        width: '100%',
    },

    [`& .${classes.userInfo}`]: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
    },

    [`& .${classes.avatar}`]: {
        width: '64px',
        height: 'auto',
        borderRadius: '50%',
        margin: theme.spacing(1),
    },

    [`& .${classes.username}`]: {

    },

    [`& .${classes.qr}`]: {
        //width: 'calc(100%)',
        //height: 'auto',
        maxWidth: '100%',
        maxHeight: '100%',
        width: 200,
        objectFit: 'contain',
        padding: theme.spacing(2),
    }
}));

export default function WGUser(props: any) {


    const { peer } = props;

    useEffect(() => {
    }, []);

    return (
        <StyledPaper className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={12} className={classes.userInfo}>
                    <img src={peer.user.gravatar} className={classes.avatar}/>
                    <Typography variant={'h4'} className={classes.username}>{peer.user.username}</Typography>
                </Grid>

                <Grid item xs={12}><Divider/></Grid>

                <Grid item xs={12} container spacing={0}>
                    <Grid item xs={12} md={4}><img src={peer.qr} className={classes.qr} /></Grid>
                    <Grid item container spacing={1} xs={12} md={8}>
                        <TableContainer component={'div'}>
                        <Table size={'small'}>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Private Key</TableCell>
                                    <TableCell>{peer.private_key}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Public Key</TableCell>
                                    <TableCell>{peer.public_key}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Allowed IPs</TableCell>
                                    <TableCell>{peer.allowed_ips}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Server CIDR</TableCell>
                                    <TableCell>{peer.address}/{peer.server.subnet}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table></TableContainer>
                    </Grid>
                </Grid>
            </Grid>
        </StyledPaper>
    );

}

