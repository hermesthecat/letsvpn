import React from 'react';
import {darken, lighten, makeStyles} from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import clsx from "clsx";
import {Collapse} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {grey} from "@material-ui/core/colors";


const useStyles = makeStyles(theme => ({
    root: {
        color: 'inherit',
        textDecoration: 'none',
    },
    nested: (props: any) => ({
        paddingLeft: theme.spacing(2*props.level),
    }),
    active: {
        backgroundColor: darken(grey[900], 0.15),
        '&:hover': {
            backgroundColor: darken(grey[900], 0.15),
        }
    }
}));

export default function NavItem(props: any) {
    const { to, primary, collapsible, path, children, level, exact, ...otherProps } = props;

    const classes = useStyles({
        level: level,
    });

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


    return (
        <Link to={to} className={classes.root}>
            <ListItem button disableRipple={active} className={clsx(classes.nested, {
                [classes.active]: active,
            })}><ListItemText primary={primary}/></ListItem>
        </Link>
    );
}

NavItem.defaultProps = {
    level: 1,
    exact: false,
}