import React, {useEffect} from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import FullPageLayout from "components/FullPageLayout";
import {connect} from "react-redux";
import { useHistory } from 'react-router-dom';
import {useForm} from "react-hook-form";
import {login} from "features/auth/authSlice";


function PageLogin(props: any) {
    const { register, handleSubmit } = useForm();
    const history = useHistory();

    const { isAuthenticated, login } = props;

    const handleLogin = (data: any) => {
        login(data.username, data.password);
    }

    // Go to previous page once successfully logged in
    useEffect(() => {
        if (isAuthenticated)
            history.goBack();
    }, [isAuthenticated])

    return (
        <FullPageLayout title={'Login'} header={'Login'} maxWidth={'xs'} paper middle padding={4}>
            <form id={'nav-login'} onSubmit={handleSubmit(handleLogin)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            size={'small'}
                            placeholder={'Username'}
                            name={'username'}
                            variant={'outlined'}
                            label={'Username'}
                            // @ts-expect-error
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
                            // @ts-expect-error
                            inputRef={{...register('password')}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant={'contained'} fullWidth color={'primary'} type={'submit'}>Login</Button>
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
