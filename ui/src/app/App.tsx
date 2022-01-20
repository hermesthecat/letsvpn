import React from 'react';
import '../assets/App.css';
import MaterialUIApp from "./MaterialUIApp";
import {StyledEngineProvider, Theme, ThemeProvider} from "@mui/material/styles";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import {Provider} from 'react-redux'
import {store} from './store'
import {BrowserRouter as Router} from "react-router-dom";
import MUIToastContainer from "../components/MUIToastContainer";
// @ts-ignore
import {ToastProvider} from "react-toast-notifications";
import MUIToast from "../components/MUIToast";

//@ts-ignore-next-line
declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


// This will appear in the titlebar of any page that uses FullPageLayout
export const appName = 'LetsVPN';

function App() {
    return (
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <Router>
                        <CssBaseline/>
                        <ToastProvider autoDismissTimeout={5000} autoDismiss={true} placement="top-center" components={{ ToastContainer: MUIToastContainer, Toast: MUIToast }}>
                            <MaterialUIApp/>
                        </ToastProvider>
                    </Router>
                </ThemeProvider>
            </StyledEngineProvider>
        </Provider>
    );
}

export default App;
