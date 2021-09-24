import * as React from 'react';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import {styled} from "@mui/material";
import {grey} from "@mui/material/colors";


const PREFIX = 'PageHeader';

const classes = {
    root: `${PREFIX}-root`,
    pageTitleDivider: `${PREFIX}-pageTitleDivider`
};

const StyledBox = styled(Box)(({theme}: any) => ({
    [`&.${classes.root}`]: {
        width: '100%',
    },

    [`& .${classes.pageTitleDivider}`]: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        backgroundColor: grey[500],
    }
}));

export default function PageHeader(props: any) {

    const {title, children} = props;

    return (
        <StyledBox sx={`width: 100%`}>
            <Typography variant="h2">{title}</Typography>
            {children}
            <Divider className={classes.pageTitleDivider}/>
        </StyledBox>
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
