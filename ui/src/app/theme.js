import { createTheme, adaptV4Theme } from '@mui/material/styles';
import {blue} from "@mui/material/colors";


export const drawerWidth = 200;
export const appBarHeight = 55;

export const discordColors = {
    blurple: '#7289DA',
    white: '#FFFFFF',
    black: '#000000',
    greple: '#99AAB5',
    dark: '#2C2F33',
    notblack: '#23272A',
    grey: {
        100: '#40444b',
        200: '#36393f',
        300: '#32353b',
        400: '#2f3136',
        500: '#292b2f',
        600: '#202225',
        'text': '#dcddde',
    }
};


// Create a theme instance.
const theme = createTheme(adaptV4Theme({
    palette: {
        mode: 'dark',
        primary: {
            main: blue[800],
            contrastThreshold: 3,
        },
        secondary: {
            main: blue[800],
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
        }
    },
    appBar: {
        height: appBarHeight,
    },
}));


export default theme;