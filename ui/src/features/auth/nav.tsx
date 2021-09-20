import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {Box, Grid, TextField} from "@material-ui/core";
import {login} from "features/auth/authSlice";
import { useForm } from "react-hook-form";
import {logout} from "./authSlice";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(0, 1),
        marginBottom: theme.spacing(1),
    },
}));

type AccountFormData = {
    username: string,
    password: string,
}

function NavLeftAuth(props: any) {
    const classes = useStyles();
    const { login, logout, isAuthenticated } = props;

    const { register, handleSubmit, reset } = useForm();

    const [logoutOpen, setLogoutOpen] = useState<boolean>(false);

    const handleLogin = (data: AccountFormData) => {
        login(data.username, data.password);
    }

    const toggleDialog = () => {
        setLogoutOpen(!logoutOpen);
    }

    const handleLogout = () => {
        toggleDialog();
        logout();
    }

    if (isAuthenticated)
        return (
            <>
                <ListItem button onClick={toggleDialog}><ListItemText primary={'Logout'}/></ListItem>
                <Dialog
                    open={logoutOpen}
                    onClose={toggleDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to log out?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleLogout} color="primary">
                            Logout
                        </Button>
                        <Button onClick={toggleDialog} color="primary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    else
        return (
            <Box className={classes.root}>
                <form id={'nav-login'} onSubmit={handleSubmit(handleLogin)}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size={'small'}
                                placeholder={'Username'}
                                name={'username'}
                                variant={'outlined'}
                                label={'Username'}
                                inputRef={register}
                                autoComplete={'off'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size={'small'}
                                placeholder={'Password'}
                                name={'password'}
                                variant={'outlined'}
                                label={'Password'}
                                type={'password'}
                                inputRef={register}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant={'contained'} fullWidth color={'primary'} type={'submit'}>Login</Button>
                        </Grid>
                    </Grid>
                </form>
                <Divider />
            </Box>
        );

}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = {
    login,
    logout,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavLeftAuth)

