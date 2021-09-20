import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import FullPageLayout from "components/FullPageLayout";
import {connect} from "react-redux";
import {api} from "features/auth/authSlice";
import {setUsersSuccess, setWGUsers} from "../wgUsersSlice";
import WGUser from "../components/WGUser";


const useStyles = makeStyles(theme => ({

}));

function PageWGUsers(props: any) {
    const classes = useStyles();

    const { api, users } = props;
    const { setWGUsers } = props;

    const loadWGUsers = async () => {
        const data = await api({url: '/api/wg/users/'});
        console.log('data', data);
        setWGUsers(data);
    }

    useEffect(() => {
        loadWGUsers().then();
    }, []);

    return (
        <FullPageLayout
            header={'WireGuard Users'}
            title={'Users'}
        >
            {users.map((w: any) => <WGUser profile={w}/>)}
        </FullPageLayout>
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
