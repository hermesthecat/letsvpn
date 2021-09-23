import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Divider, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    userInfo: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
    },
    avatar: {
        width: '64px',
        height: 'auto',
        borderRadius: '50%',
        margin: theme.spacing(1),
    },
    username: {

    },
    qr: {
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
    const classes = useStyles();

    const { profile } = props;

    useEffect(() => {
    }, []);

    return (
        <Paper className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={12} className={classes.userInfo}>
                    <img src={profile.user.gravatar} className={classes.avatar}/>
                    <Typography variant={'h4'} className={classes.username}>{profile.user.username}</Typography>
                </Grid>

                <Grid item xs={12}><Divider/></Grid>

                <Grid item xs={12} container spacing={0}>
                    <Grid item xs={12} md={4}><img src={profile.qr} className={classes.qr} /></Grid>
                    <Grid item container spacing={1} xs={12} md={8}>
                        <Table size={'small'}>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Private Key</TableCell>
                                    <TableCell>{profile.private_key}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Public Key</TableCell>
                                    <TableCell>{profile.public_key}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Allowed IPs</TableCell>
                                    <TableCell>{profile.allowed_ips}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Server CIDR</TableCell>
                                    <TableCell>{profile.address}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );

}

