import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import FullPageLayout from "components/FullPageLayout";
import {connect} from "react-redux";
import {api} from "features/auth/authSlice";
import {PollQuestion} from "./types";


const useStyles = makeStyles(theme => ({

}));

function PagePolls(props: any) {
    const classes = useStyles();

    const { api } = props;

    const [polls, setPolls] = React.useState([]);

    useEffect(() => {
        console.log('doing polls effect')
        api({
            method: 'GET',
            url: '/api/polls/question/',
        } as any).then((data: any) => {
            console.log('data', data);
            if (data)
                setPolls(data);
        }).catch((err: any) => {
            console.error(err);
        })
    }, []);

    return (
        <FullPageLayout
            header={'Polls'}
            title={'Polls'}
        >
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Question</th>
                            <th>Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {polls.map((n: PollQuestion) =>
                            <tr key={n.id}>
                                <td>{n.id}</td>
                                <td>{n.title}</td>
                                <td>{n.owner}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </FullPageLayout>
    );

}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = {
    api,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PagePolls)
