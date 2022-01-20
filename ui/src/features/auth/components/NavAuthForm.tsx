// @ts-ignore
import React, {useEffect, useState} from 'react';
import Divider from "@mui/material/Divider";
import {connect} from "react-redux";
import {Box, Fade, Grid, TextField, Typography} from "@mui/material";
import {login} from "features/auth/authSlice";
import {Controller, useForm} from "react-hook-form";
import {useObtainRefreshTokenMutation} from "../apiSlice";
import LoadingButton from '@mui/lab/LoadingButton';
import {useToasts} from "react-toast-notifications";


type AccountFormData = {
    username: string,
    password: string,
}

function NavAuthForm(props: any) {

    const { login } = props;
    const [obtainRefreshToken, {isLoading, error}] = useObtainRefreshTokenMutation();
    const { addToast } = useToasts();

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }});

    const handleLogin = (data: AccountFormData) => {
        // @ts-ignore
        obtainRefreshToken(data).then(data => {
            // @ts-ignore
            if (data.error) {
                console.error('Login error', data);
                return
            }
            console.debug('Auth data', data);
            // @ts-ignore
            login(data.data);
        })
    }

    useEffect(() => {
        if (error)
            addToast('Error logging in.', {appearance: 'error'})
    }, [error]);

    return (
        <Box sx={{ px: 1, mb: 1 }}>

            <form id={'nav-login'} onSubmit={handleSubmit(handleLogin)}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sx={{pb: 0, mb: -0.5}}>
                        <Controller
                            name={"username"}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth
                                    onChange={onChange}
                                    value={value}
                                    size={'small'}
                                    variant={'outlined'}
                                    autoComplete={'off'}
                                    // @ts-ignore
                                    inputRef={{...register('username')}}
                                    name={'username'}
                                    placeholder={'Username'}
                                    label={'Username'}
                                />
                            )}
                        />

                    </Grid>
                    <Grid item xs={12} sx={{pb: 0, mb: -0.5}}>
                        <Controller
                            name={"password"}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth
                                    onChange={onChange}
                                    value={value}
                                    size={'small'}
                                    variant={'outlined'}
                                    autoComplete={'off'}
                                    type={'password'}
                                    // @ts-ignore
                                    inputRef={{...register('password')}}
                                    name={'password'}
                                    placeholder={'Password'}
                                    label={'Password'}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mb: 1}}>
                        <LoadingButton variant={'contained'} fullWidth color={'primary'} type={'submit'} size={'small'} loading={isLoading} sx={{backgroundColor: error ? 'error.main' : 'primary.main'}}>Login</LoadingButton>
                    </Grid>
                    <Fade in={error !== undefined} unmountOnExit>
                        <Grid item xs={12} sx={{pt: 0, pl: 0}}>
                            <Typography variant={'caption'} sx={{color: 'error.main', textAlign: 'center'}}>Error logging in.</Typography>
                        </Grid>
                    </Fade>
                </Grid>
            </form>
            <Divider />
        </Box>
    );
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {
    login,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavAuthForm)

