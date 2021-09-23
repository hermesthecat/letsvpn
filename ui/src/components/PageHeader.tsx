import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import {discordColors} from "../app/theme";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        color: discordColors.grey.text,
    },
    pageTitleDivider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        backgroundColor: discordColors.grey[100],
    },
}));

export default function PageHeader(props: any) {
    const classes = useStyles();
    const {title, children} = props;

    return (
        <Box className={classes.root}>
            <Typography variant="h2">{title}</Typography>
            {children}
            <Divider className={classes.pageTitleDivider}/>
        </Box>
    );
}

PageHeader.defaultProps = {
    title: '',
    children: null,
};

PageHeader.propTypes = {
    title: PropTypes.node.isRequired,
    children: PropTypes.node,
};
