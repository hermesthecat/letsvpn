// @ts-ignore
import React, {useState} from 'react';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import {Box, Grid, styled, TextField} from "@mui/material";
import {login} from "features/auth/authSlice";
import { Controller, useForm } from "react-hook-form";


type AccountFormData = {
    username: string,
    password: string,
}

function NavAuthForm(props: any) {

    const { login } = props;

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }});

    const handleLogin = (data: AccountFormData) => {
        console.debug('Login data', data);
        login(data.username, data.password);
    }

    return (
        <Box sx={{ padding: 'theme.spacing(0, 1)', marginBottom: 'theme.spacing(1)' }}>
            <form id={'nav-login'} onSubmit={handleSubmit(handleLogin)}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                        <Button variant={'contained'} fullWidth color={'primary'} type={'submit'}>Login</Button>
                    </Grid>
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

