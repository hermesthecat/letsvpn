import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
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
