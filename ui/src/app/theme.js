import {createTheme} from '@mui/material/styles';
import {blue} from "@mui/material/colors";


export const drawerWidth = 200;
export const appBarHeight = 55;

// Create a theme instance.
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: blue[800],
            //contrastThreshold: 3,
        },
        secondary: {
            main: blue[700],
        },
        text: {
            primary: '#b3b3b3',
        },
        dark: {
            1: '#202225',
            2: '#2b2c31',
            3: '#2f3136',
            4: '#36393e',
            5: '#42464d',
            6: '#484b52',
        },
    },
    appBar: {
        height: appBarHeight,
    },
    mixins: {
        center: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
});


export default theme;
