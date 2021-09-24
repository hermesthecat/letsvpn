import React, {useEffect} from 'react';
import FullPageLayout from "components/FullPageLayout";
import {connect} from "react-redux";
import {api} from "features/auth/authSlice";
import {setUsersSuccess, setWGUsers} from "../wgUsersSlice";
import WGUser from "../components/WGUser";
import {styled} from "@mui/material";


const PREFIX = 'PageWGUsers';
const classes = {};

const StyledFullPageLayout = styled(FullPageLayout)(({theme}: any) => ({}));

function PageWGUsers(props: any) {


    const { api, users } = props;
    const { setWGUsers } = props;

    const loadWGUsers = async () => {
        const data = await api({url: '/api/wg/peers/'});
        console.log('data', data);
        setWGUsers(data);
    }

    useEffect(() => {
        loadWGUsers().then();
    }, []);

    return (
        <StyledFullPageLayout
            header={'WireGuard Users'}
            title={'Users'}
        >
            {users.map((w: any) => <WGUser peer={w}/>)}
        </StyledFullPageLayout>
    );

}

PageWGUsers.defaultProps = {
    users: [],
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    users: state.wgusers.users,
})

const mapDispatchToProps = {
    setWGUsers,
    api,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageWGUsers)
