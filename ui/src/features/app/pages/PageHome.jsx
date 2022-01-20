import React, {useEffect} from 'react';
import Typography from "@mui/material/Typography";
import FullPageLayout from "components/FullPageLayout";
import Divider from "@mui/material/Divider";
import {Link} from 'react-router-dom';
import {logout} from "../../auth/authSlice";
import {connect} from "react-redux";


function PageHome(props) {

    const { isAuthenticated } = props;

    useEffect(() => {
    }, []);

    return (
        <FullPageLayout
            header={'LetsVPN'}
            title={'Dashboard'}
        >
            <Typography variant={'body1'}>Welcome to LetsVPN.</Typography>
            <Divider sx={{my: 2}}/>
            {isAuthenticated && <>
                <Typography variant={'body1'} sx={{mb: 1}}>This app is still heavily under development (interface-wise).</Typography>
                <Typography variant={'body1'} sx={{mb: 1}}>To get started, check out the <Link to={'/wgpeers'}>WireGuard Peers</Link> page to manage users,
                    and the <Link to={'/wgservers'}>WireGuard Servers</Link> page to manage and start your first server.</Typography>
                <Typography variant={'body1'} sx={{mb: 1}}>Your first server should have automatically been created.  You should double check the values to make sure they look correct, and to make any changes you want.</Typography>
            </>}
            {!isAuthenticated && <>
                <Typography variant={'body1'} sx={{mb: 1}}>You must login to use this app.  You may login in the sidebar on the left.</Typography>
            </>}
        </FullPageLayout>
    );

}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = {
    logout,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageHome)

