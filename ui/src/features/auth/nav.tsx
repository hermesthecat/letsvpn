// @ts-ignore
import React, {useState} from 'react';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import {Box, Grid, styled, TextField} from "@mui/material";
import {login} from "features/auth/authSlice";
import { useForm } from "react-hook-form";
import {logout} from "./authSlice";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";


const PREFIX = 'nav';

const classes = {
    root: `${PREFIX}-root`
};

const StyledBox = styled(Box)(({theme}: any) => ({
    [`&.${classes.root}`]: {
        padding: theme.spacing(0, 1),
        marginBottom: theme.spacing(1),
    }
}));

type AccountFormData = {
    username: string,
    password: string,
}

function NavLeftAuth(props: any) {

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
        {
            return (
                        <Box sx={{ padding: 'theme.spacing(0, 1)', marginBottom: 'theme.spacing(1)' }}>
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
                                            // @ts-ignore
                                            inputRef={{...register('username')}}
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
                                            // @ts-ignore
                                            inputRef={{...register('password')}}
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

