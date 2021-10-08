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


function NavAuthProfile(props: any) {

    const { logout } = props;


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
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {
    logout,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavAuthProfile)

