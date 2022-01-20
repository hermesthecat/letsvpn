import React from 'react';
import {
    Box,
    Divider,
    Grid,
    IconButton,
    Paper,
    Skeleton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import LensBlurIcon from '@mui/icons-material/LensBlur';
import {grey} from "@mui/material/colors";


const PREFIX = 'WGServerBlockSkeleton';
const classes = {
    root: `${PREFIX}-root`,
    statusIcon: `${PREFIX}-statusIcon`,
    peerSkeleton: `${PREFIX}-peerSkeleton`,
    skeleton: `${PREFIX}-skeleton`,
};

const StyledWGServerBlockSkeleton = styled(Paper)(({ theme }) => ({
    [`&.${classes.root}`]: {
        padding: theme.spacing(2),
        width: '100%',
        margin: theme.spacing(2, 0),
    },
    [`& .${classes.statusIcon}`]: {
        color: grey[700],
        filter: `drop-shadow(0 0 5px ${grey[700]})`,
    },
    [`& .${classes.peerSkeleton}`]: {
        borderRadius: theme.spacing(1),
        margin: theme.spacing(1, 0),
    },
    [`& .${classes.skeleton}`]: {
        borderRadius: theme.spacing(0.5),
        width: '100%',
        minWidth: 150,
    },
}));


export default function WGServerBlockSkeleton(props: any) {
    return (
        <StyledWGServerBlockSkeleton className={classes.root} elevation={4}>
            <Grid container spacing={0}>
                <Grid item md={12} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, pl: 2}}>
                    <Typography variant={'h3'} sx={{width: '100%', pr: 2}}><Skeleton variant={'rectangular'} className={classes.skeleton} animation={'wave'} height={50} sx={{width: '100%'}}/></Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        <LensBlurIcon className={classes.statusIcon}/>
                        <IconButton disabled><SettingsPowerIcon/></IconButton>
                    </Box>
                </Grid>
                <Grid item md={12}><Divider/></Grid>
                <Grid item md={6}>
                    <TableContainer>
                        <Table size={'small'} sx={{width: '100%'}}>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>Public IP</b></TableCell>
                                    <TableCell><Skeleton variant={'rectangular'} className={classes.skeleton} animation={'wave'} height={30} /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Private Key</b></TableCell>
                                    <TableCell>
                                        <Skeleton variant={'rectangular'} className={classes.skeleton} animation={'wave'} height={30}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{borderBottom: 'none'}}><b>Public Key</b></TableCell>
                                    <TableCell sx={{borderBottom: 'none'}}>
                                        <Skeleton variant={'rectangular'} className={classes.skeleton} animation={'wave'} height={30}/>
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
        </StyledWGServerBlockSkeleton>
    );

}
