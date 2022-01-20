import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import FullPageLayout from "components/FullPageLayout";
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';
import {Controller, useForm} from "react-hook-form";
import {login} from "features/auth/authSlice";
import {useObtainRefreshTokenMutation} from "../apiSlice";
import {LoadingButton} from "@mui/lab";


function PageLogin(props: any) {
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    });
    const { isAuthenticated } = props;
    const history = useHistory();
    const [obtainRefreshToken, {isLoading, error}] = useObtainRefreshTokenMutation();

    const handleLogin = (data: any) => {
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

    // Go to previous page once successfully logged in
    useEffect(() => {
        if (isAuthenticated)
            history.goBack();
    }, [isAuthenticated]);

    return (
        <FullPageLayout title={'Login'} header={'Login'} maxWidth={'xs'} paper middle sx={{p: 3,}}>
            <form id={'nav-login'} onSubmit={handleSubmit(handleLogin)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            name={"username"}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth
                                    onChange={onChange}
                                    value={value}
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
                        <LoadingButton variant={'contained'} fullWidth color={'primary'} type={'submit'} size={'small'} loading={isLoading} sx={{backgroundColor: error ? 'error.main' : 'primary.main'}}>Login</LoadingButton>
                    </Grid>
                </Grid>
            </form>


        </FullPageLayout>

    );

}


const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = {
    login
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageLogin)
