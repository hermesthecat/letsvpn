import React, {useEffect} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Container from "@mui/material/Container";
import {appBarHeight} from "../app/theme";
import PageHeader from "./PageHeader";
import {Box, Paper} from "@mui/material";
import clsx from "clsx";
import {appName} from "../app/App";
import {grey} from "@mui/material/colors";


const useStyles = makeStyles(theme => ({
    FullPageLayoutRoot: (props: any) => ({
        minHeight: `calc(100vh - ${appBarHeight}px - ${theme.spacing(1)} - 1px)`,
        display: 'flex',
    }),
    middle: {
        alignItems: 'center',
    },
    padding: (props: any) => ({
        padding: theme.spacing(props.padding),
    }),
    FullPageLayoutBox: (props: any) => ({
        marginBottom: theme.spacing(1),
        padding: theme.spacing(props.padding),
        minWidth: '100%',
    }),
    paper: (props: any) => ({
        backgroundColor: grey[800],
        marginBottom: theme.spacing(1),
        padding: theme.spacing(props.padding),
        minWidth: '100%',
    }),
}));

export default function FullPageLayout(props: any) {
    const {children, maxWidth, PageTitleProps, PaperProps, paper, middle, padding, header, title, className} = props;
    const classes = useStyles({
        padding: padding,
    } as any);


    let pageTitle = '';
    let pageHeader = '';
    if (title !== '' && header === '') {
        pageTitle = title;
        pageHeader = title;
    } else if (title === '' && header !== '') {
        pageTitle = header;
        pageHeader = header;
    }
    else {
        pageTitle = title;
        pageHeader = header;
    }

    const setPageTitle = () => {
        document.title = `${appName} · ${pageTitle}`;
    }

    useEffect(setPageTitle, [pageTitle]);

    const content =
        <>
            {props.header !== '' && <PageHeader title={pageHeader} {...PageTitleProps }/>}
            {children}
        </>


    if (paper)
        return (
            <Container maxWidth={maxWidth} fixed className={clsx(classes.FullPageLayoutRoot, {
                [classes.middle]: middle,
            })}>
                <Paper className={clsx(classes.paper, classes.padding, className)} {...PaperProps} >
                    {content}
                </Paper>
            </Container>
        )
    return (
        <Container maxWidth={maxWidth} fixed className={clsx(classes.FullPageLayoutRoot, {
            [classes.middle]: middle,
        })}>
            <Box className={clsx(classes.FullPageLayoutBox, classes.padding, className)}>
                {content}
            </Box>
        </Container>
    )

}

FullPageLayout.defaultProps = {
    maxWidth: 'md' as string,
    PageTitleProps: {} as any,
    PaperProps: {} as any,
    header: '' as string,
    paper: false as boolean,
    middle: false as boolean,
    padding: 2 as number,
}

