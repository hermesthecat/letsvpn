// @ts-ignore
import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import {logout} from "../authSlice";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {Avatar, Box} from "@mui/material";
import {grey} from "@mui/material/colors";


function NavAuthProfile(props: any) {

    const { logout, user } = props;

    const [logoutOpen, setLogoutOpen] = useState<boolean>(false);

    const toggleDialog = () => {
        setLogoutOpen(!logoutOpen);
    }

    const handleLogout = () => {
        toggleDialog();
        logout();
    }

    return (
        <>
            <ListItem sx={{mt: 1, mb: 1, p: 0, boxShadow: '0px 10px 10px 4px rgba(66,66,66,1), 0px -10px 10px 4px rgba(66,66,66,1)'}} >
                <Box sx={{
                    backgroundColor: grey[800],
                    p: 1,
                    pb: 0,
                    width: '100%',
                }}>
                    <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                        <Avatar src={user.gravatar} sx={{mr: 1, width: 35, height: 35}} />
                        <Box sx={{fontSize: 18}}>{user.username}</Box>
                    </Box>
                    <Button variant={'outlined'} size={'small'} fullWidth color={'inherit'} onClick={toggleDialog}>Logout</Button>
                </Box>

            </ListItem>
            <ListItem onClick={toggleDialog}><ListItemText /></ListItem>
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
                    <Button onClick={handleLogout} color="primary" variant={'contained'}>
                        Logout
                    </Button>
                    <Button onClick={toggleDialog} color="primary" autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

const mapStateToProps = (state: any) => ({
    user: state.auth.user,
})

const mapDispatchToProps = {
    logout,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavAuthProfile)

