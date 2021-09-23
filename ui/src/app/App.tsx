import React from 'react';
import '../assets/App.css';
import MaterialUIApp from "./MaterialUIApp";
import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material/styles";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
//import {ToastProvider} from "react-toast-notifications";
import { Provider } from 'react-redux'
import {store} from './store'
import {BrowserRouter as Router} from "react-router-dom";


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
                        <MaterialUIApp/>
                    </Router>
                </ThemeProvider>
            </StyledEngineProvider>
        </Provider>
    );
}

export default App;
