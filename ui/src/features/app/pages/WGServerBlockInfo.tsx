import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import FullPageLayout from 'components/FullPageLayout';
import {Box, Button, Fade, Grow, IconButton, Paper, styled, Tooltip} from '@mui/material';
import isPropValid from '@emotion/is-prop-valid';
import LensBlurIcon from '@mui/icons-material/LensBlur';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import clsx from 'clsx';
import {getRandomInt, sleep} from "../../../lib/common";
import {grey} from "@mui/material/colors";
import {SpeedDial, SpeedDialAction} from "@mui/lab";
import StopIcon from '@mui/icons-material/Stop';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const PREFIX = 'WGServerStatusIcon';
const classes = {
    root: `${PREFIX}-root`,
    sanim: `${PREFIX}-sanim`,
    statusIcon: `${PREFIX}-statusIcon`,
    disabled: `${PREFIX}-disabled`,
    stopped: `${PREFIX}-stopped`,
    running: `${PREFIX}-running`,
    loading: `${PREFIX}-loading`,
    starting: `${PREFIX}-starting`,
    stopping: `${PREFIX}-stopping`,
    active: `${PREFIX}-active`,
    loadingOverlay: `${PREFIX}-loadingOverlay`,
    loadingOverlay2: `${PREFIX}-loadingOverlay2`,
    stoppedOverlay: `${PREFIX}-stoppedOverlay`,
    stoppedOverlay2: `${PREFIX}-stoppedOverlay2`,
    stoppedOverlay3: `${PREFIX}-stoppedOverlay3`,
    runningOverlay: `${PREFIX}-runningOverlay`,
    runningOverlay2: `${PREFIX}-runningOverlay2`,
    runningOverlay3: `${PREFIX}-runningOverlay3`,
};

const StyledWGServerStatusIcon = styled(Box, {
    shouldForwardProp: prop => isPropValid(prop) && prop !== 'status'
})(({ status, theme }: any) => ({
    [`&.${classes.root}`]: {
        display: 'flex',
        alignItems: 'center',
    },
    [`& .${classes.sanim}`]: {
        animation: 'myAnim 2s ease 0s 1 normal forwards',
    },
    [`& .${classes.statusIcon}`]: {
        position: 'absolute',
        top: 20,
        left: 20,
        marginLeft: -10,
        marginTop: -10  ,
        visibility: 'hidden',
    },
    [`& .${classes.disabled}`]: {
        color: 'black',
        filter: `drop-shadow(0 0 5px black)`,
    },
    [`& .${classes.stopped}`]: {
        color: theme.palette.error.main,
        filter: `drop-shadow(0 0 5px ${theme.palette.warning.main})`,
    },
    [`& .${classes.running}`]: {
        color: theme.palette.success.light,
        filter: `drop-shadow(0 0 5px ${theme.palette.warning.light})`,
    },
    // starting, stopping
    [`& .${classes.loading}`]: {
        color: theme.palette.warning.light,
        filter: `drop-shadow(0 0 5px ${theme.palette.warning.light})`,
    },
    [`& .${classes.active}`]: {
        visibility: 'visible',
        //animation: `statusIconEntrance 200 0ms linear forwards 1`,
    },
    [`& .${classes.stoppedOverlay}`]: {
        filter: `drop-shadow(0 0 5px ${theme.palette.error.main})`,
        animation: status === STATUS.STOPPED ? `stoppedOverlayEntrance1 2000ms 0ms ${theme.transitions.easing.easeOut} forwards 1` : '',
    },
    [`& .${classes.stoppedOverlay2}`]: {
        filter: `drop-shadow(0 0 5px ${theme.palette.error.main})`,
        animation: status === STATUS.STOPPED ? `stoppedOverlayEntrance2 2700ms 0ms ${theme.transitions.easing.easeOut} forwards 1` : '',
    },
    [`& .${classes.stoppedOverlay3}`]: {
        filter: `drop-shadow(0 0 5px ${theme.palette.error.main})`,
        animation: status === STATUS.STOPPED ? `stoppedOverlayEntrance2 3400ms 0ms ${theme.transitions.easing.easeOut} forwards 1` : '',
    },
    [`& .${classes.runningOverlay}`]: {
        filter: `drop-shadow(0 0 5px ${theme.palette.success.main})`,
        animation: status === STATUS.RUNNING ? `runningOverlayEntrance1 2000ms 0ms ${theme.transitions.easing.easeOut} forwards 1` : '',
    },
    [`& .${classes.runningOverlay2}`]: {
        filter: `drop-shadow(0 0 5px ${theme.palette.success.main})`,
        animation: status === STATUS.RUNNING ? `runningOverlayEntrance2 2700ms 0ms ${theme.transitions.easing.easeOut} forwards 1` : '',
    },
    [`& .${classes.runningOverlay3}`]: {
        filter: `drop-shadow(0 0 5px ${theme.palette.success.main})`,
        animation: status === STATUS.RUNNING ? `runningOverlayEntrance2 3400ms 0ms ${theme.transitions.easing.easeOut} forwards 1` : '',
    },
    [`& .${classes.loadingOverlay}`]: {
        animation: status > 2 ? `loadingOverlayEntrance1 2000ms 0ms ${theme.transitions.easing.easeOut} forwards infinite` : '',
    },
    [`& .${classes.loadingOverlay2}`]: {
        opacity: 0,
        filter: `drop-shadow(0 0 5px ${theme.palette.warning.light}) drop-shadow(0 0 10px ${theme.palette.warning.light})`,
        animation: status > 2 ? `loadingOverlayEntrance2 1000ms 0ms linear alternate infinite` : '',
    },
    ['@keyframes runningOverlayEntrance3']: {
        '0%': {
            opacity: 0,
            transform: 'scale(0.75)'
        },
        '18.75%': {
            opacity: 0.75,
        },
        '56.25%': {
            opacity: 0.1,
        },
        '75%': {
            opacity: 0,
            transform: 'scale(3.8)'
        },
        '100%': {
            transform: 'scale(3.8)'
        }
    },
    ['@keyframes runningOverlayEntrance2']: {
        '0%': {
            opacity: 0,
            transform: 'scale(0.75)'
        },
        '18.75%': {
            opacity: 0.75,
        },
        '56.25%': {
            opacity: 0.1,
        },
        '75%': {
            opacity: 0,
            transform: 'scale(2.4)'
        },
        '100%': {
            opacity: 0,
            transform: 'scale(2.4)'
        }
    },
    ['@keyframes runningOverlayEntrance1']: {
        '0%': {
            opacity: 0,
            transform: 'scale(0.75)'
        },
        '18.75%': {
            opacity: 0.75,
            transform: 'scale(1.2)'
        },
        '56.25%': {
            opacity: 0.1,
        },
        '75%': {
            opacity: 0,
            transform: 'scale(1.4)'
        },
        '100%': {
            opacity: 0,
            transform: 'scale(1.4)'
        }
    },
    ['@keyframes stoppedOverlayEntrance3']: {
        '0%': {
            opacity: 0,
            transform: 'scale(0.75)'
        },
        '18.75%': {
            opacity: 0.75,
        },
        '56.25%': {
            opacity: 0.1,
        },
        '75%': {
            opacity: 0,
            transform: 'scale(3.8)'
        },
        '100%': {
            transform: 'scale(3.8)'
        }
    },
    ['@keyframes stoppedOverlayEntrance2']: {
        '0%': {
            opacity: 0,
            transform: 'scale(0.75)'
        },
        '18.75%': {
            opacity: 0.75,
        },
        '56.25%': {
            opacity: 0.1,
        },
        '75%': {
            opacity: 0,
            transform: 'scale(2.4)'
        },
        '100%': {
            opacity: 0,
            transform: 'scale(2.4)'
        }
    },
    ['@keyframes stoppedOverlayEntrance1']: {
        '0%': {
            opacity: 0,
            transform: 'scale(0.75)'
        },
        '18.75%': {
            opacity: 0.75,
            transform: 'scale(1.2)'
        },
        '56.25%': {
            opacity: 0.1,
        },
        '75%': {
            opacity: 0,
            transform: 'scale(1.4)'
        },
        '100%': {
            opacity: 0,
            transform: 'scale(1.4)'
        }
    },
    ['@keyframes loadingOverlayEntrance2']: {
        '0%': {
            opacity: 0.3,
        },
        '100%': {
            opacity: 1,
        }
    },
    ['@keyframes loadingOverlayEntrance1']: {
        '0%': {
            opacity: 0,
            transform: 'scale(0.75)'
        },
        '18.75%': {
            opacity: 0.75,
            transform: 'scale(1.2)'
        },
        '56.25%': {
            opacity: 0.1,
        },
        '75%': {
            opacity: 0,
            transform: 'scale(1.4)'
        },
        '100%': {
            opacity: 0,
            transform: 'scale(1.4)'
        }
    },
    ['@keyframes statusIconEntrance']: {
        '0%': {
            filter: 'opacity(0)',
            //opacity: 0.25,
            //transform: 'rotate(0%)'
        },
        '100%': {
            filter: 'opacity(1)',

            //opacity: 1,
            //transform: 'rotate(100%)'
        }
    },
}));

const STATUS = {
    DISABLED: 0,
    STOPPED: 1,
    RUNNING: 2,
    STARTING: 3,
    STOPPING: 4,
}

/*

                <Button onClick={() => {setStatus(STATUS.DISABLED)}}>Disabled</Button>
                <Button onClick={() => {setStatus(STATUS.STOPPED)}}>Stopped</Button>
                <Button onClick={() => {setStatus(STATUS.RUNNING)}}>Running</Button>
                <Button onClick={() => {setStatus(STATUS.STARTING); sleep(getRandomInt(4000,7000)).then(() => {setStatus(STATUS.RUNNING)})}}>Starting</Button>
                <Button onClick={() => {setStatus(STATUS.STOPPING); sleep(getRandomInt(4000,7000)).then(() => {setStatus(STATUS.STOPPED)})}}>Stopping</Button>
                <Box>Status: {status}</Box>
 */

export default function WGServerBlockInfo(props: any) {
    useEffect(() => {
    }, []);
    const [status, setStatus] = useState<number>(STATUS.STARTING);

    const toggleMenu = () => {

    }


    return (
        <>
            <StyledWGServerStatusIcon className={classes.root} status={status}>
                <Box sx={{position: 'relative', width: 40, height: 40}}>
                    <Tooltip title={'DISABLED'} placement={'top'}><LensBlurIcon className={clsx(classes.statusIcon, classes.disabled, {[classes.active]: status === STATUS.DISABLED})}/></Tooltip>

                    <LensBlurIcon className={clsx(classes.statusIcon, classes.loading, classes.loadingOverlay, {[classes.active]: status > 2})}/>
                    <LensBlurIcon className={clsx(classes.statusIcon, classes.loading, classes.loadingOverlay2, {[classes.active]: status > 2})}/>
                    <Tooltip title={status === STATUS.STARTING ? 'STARTING' : 'STOPPING'} placement={'top'}><LensBlurIcon className={clsx(classes.statusIcon, classes.loading, {[classes.active]: status > 2})}/></Tooltip>

                    <LensBlurIcon className={clsx(classes.statusIcon, classes.stopped, classes.stoppedOverlay, {[classes.active]: status === STATUS.STOPPED})}/>
                    <LensBlurIcon className={clsx(classes.statusIcon, classes.stopped, classes.stoppedOverlay2, {[classes.active]: status === STATUS.STOPPED})}/>
                    <LensBlurIcon className={clsx(classes.statusIcon, classes.stopped, classes.stoppedOverlay3, {[classes.active]: status === STATUS.STOPPED})}/>
                    <Tooltip title={'STOPPED'} placement={'top'}><LensBlurIcon className={clsx(classes.statusIcon, classes.stopped, {[classes.active]: status === STATUS.STOPPED})}/></Tooltip>

                    <LensBlurIcon className={clsx(classes.statusIcon, classes.running, classes.runningOverlay, {[classes.active]: status === STATUS.RUNNING})}/>
                    <LensBlurIcon className={clsx(classes.statusIcon, classes.running, classes.runningOverlay2, {[classes.active]: status === STATUS.RUNNING})}/>
                    <LensBlurIcon className={clsx(classes.statusIcon, classes.running, classes.runningOverlay3, {[classes.active]: status === STATUS.RUNNING})}/>
                    <Tooltip title={'RUNNING'} placement={'top'}><LensBlurIcon className={clsx(classes.statusIcon, classes.running, {[classes.active]: status === STATUS.RUNNING})}/></Tooltip>
                </Box>
                <Box sx={{position: 'relative', width: 56, height: 40, mx: -0.75}}>
                    <SpeedDial icon={<SettingsPowerIcon />} ariaLabel={'power'} direction={'down'} sx={{position: 'absolute', top: 0, left: 0}} FabProps={{
                        size: 'small',
                        sx: {
                            boxShadow: 'none',
                            background: 'none',
                        },
                        //classes: {focusVisible: ''},
                    }}>
                        <SpeedDialAction
                            // @ts-ignore
                            tooltipTitle={'Start'} tooltipOpen
                            onClick={() => { setStatus(STATUS.STARTING); sleep(getRandomInt(2000, 7000)).then(() => {setStatus(STATUS.RUNNING)}) }}
                            icon={<ArrowUpwardIcon/>}
                        />
                        <SpeedDialAction
                            // @ts-ignore
                            tooltipTitle={'Stop'} tooltipOpen
                            onClick={() => { setStatus(STATUS.STOPPING); sleep(getRandomInt(2000, 7000)).then(() => {setStatus(STATUS.STOPPED)}) }}
                            icon={<StopIcon/>}
                        />
                        <SpeedDialAction
                            // @ts-ignore
                            tooltipTitle={'Restart'} tooltipOpen
                            onClick={() => { setStatus(STATUS.STARTING); sleep(getRandomInt(2000, 7000)).then(() => {setStatus(STATUS.RUNNING)}) }}
                            icon={<RestartAltIcon/>}
                        />
                    </SpeedDial>
                </Box>

            </StyledWGServerStatusIcon>
        </>
    );

}

