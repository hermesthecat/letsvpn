// @ts-nocheck TODO
import React from 'react';
import {
    IconButton,
    Paper,
    Skeleton,
    styled,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


const PREFIX = 'WGPeerRowSkeleton';
const classes = {
    skeleton: `${PREFIX}-skeleton`,
};

const StyledWGPeerRowSkeleton = styled(TableContainer)(({theme}: any) => ({
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

export default function WGPeerRowSkeleton(props: any) {
    const { count } = props;
    return (
        <StyledWGPeerRowSkeleton component={Paper} sx={{ p: 1 }}>
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
                    {[...Array(count)].map((n, i) => <TableRow key={i}>
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
        </StyledWGPeerRowSkeleton>
    );
}


WGPeerRowSkeleton.defaultProps = {
    count: 3,
}
