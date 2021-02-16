import React from 'react';
import '../assets/App.css';
import MaterialUIApp from "./MaterialUIApp";
import {ThemeProvider} from "@material-ui/core/styles";
import theme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
//import {ToastProvider} from "react-toast-notifications";
import { Provider } from 'react-redux'
import {store} from './store'
import {BrowserRouter as Router} from "react-router-dom";

// This will appear in the titlebar of any page that uses FullPageLayout
export const appName = 'Boilerplate';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <CssBaseline/>
                    <MaterialUIApp/>
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
