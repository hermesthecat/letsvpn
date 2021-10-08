import React from 'react';
import { darken, lighten } from '@mui/material/styles';
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import {Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import clsx from "clsx";
import {Collapse, styled} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {grey} from "@mui/material/colors";


const PREFIX = 'NavItem';

const classes = {
    root: `${PREFIX}root`,
    nested: `${PREFIX}nested`,
    active: `${PREFIX}active`
};

const StyledLink = styled(Link)(({theme}: any) => ({
    [`&.${classes.root}`]: {
        color: 'inherit',
        textDecoration: 'none',
    },

    [`& .${classes.nested}`]: ({level}: any) => ({
        paddingLeft: theme.spacing(2*level),
    }),

    [`& .${classes.active}`]: {
        backgroundColor: darken(grey[900], 0.15),
        '&:hover': {
            backgroundColor: darken(grey[900], 0.15),
        }
    }
}));

const StyledA = styled('a')(({theme}: any) => ({
    [`&.${classes.root}`]: {
        color: 'inherit',
        textDecoration: 'none',
    },

    [`& .${classes.nested}`]: ({level}: any) => ({
        paddingLeft: theme.spacing(2*level),
    }),

    [`& .${classes.active}`]: {
        backgroundColor: darken(grey[900], 0.15),
        '&:hover': {
            backgroundColor: darken(grey[900], 0.15),
        }
    }
}));
// TODO: Merge into one styled (styled react.fragment)

export default function NavItem(props: any) {
    const { to, primary, collapsible, path, children, level, exact, external } = props;

    const location = useLocation();

    let active = false;
    if (exact)
        active = location.pathname === to || location.pathname === path;
    else
        active = location.pathname.startsWith(to) || location.pathname.startsWith(path);
    const [open, setOpen] = React.useState<boolean>(active);

    const handleClick = () => {
        setOpen(!open);
    }

    if (collapsible) {
        return (
            <>
                <ListItem button disableRipple={active} onClick={handleClick} className={clsx(classes.nested, {
                    [classes.active]: active,
                })}><ListItemText primary={primary}/>{open ? <ExpandLess /> : <ExpandMore />}</ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {children.map((c: any, i: number) =>
                            <React.Fragment key={i}>{React.cloneElement(c, {level: level+1})}</React.Fragment>
                        )}
                    </List>
                </Collapse>
            </>
        )
    }


    if (external)
        return (
            <StyledA href={to} className={classes.root}>
                <ListItem button disableRipple={active} className={clsx(classes.nested, {
                    [classes.active]: active,
                })}><ListItemText primary={primary}/></ListItem>
            </StyledA>
        );


    return (
        <StyledLink to={to} className={classes.root}>
            <ListItem button disableRipple={active} className={clsx(classes.nested, {
                [classes.active]: active,
            })}><ListItemText primary={primary}/></ListItem>
        </StyledLink>
    );
}

NavItem.defaultProps = {
    level: 1,
    exact: false,
    external: false,
}
