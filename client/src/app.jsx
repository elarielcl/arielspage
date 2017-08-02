import React from 'react';
import ReactDom from 'react-dom';
import Page from './components/Page.jsx';
import NewPage from './components/NewPage.jsx';
import EditPage from './components/EditPage.jsx';
import BasePage from './components/BasePage.jsx';
import { getMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import {red500, red700} from 'material-ui/styles/colors';
import {Route, Router, Switch} from "react-router-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';
import createHistory from "history/createBrowserHistory";


injectTapEventPlugin();



const muiTheme = getMuiTheme({
    palette: {
        primary1Color: red500,
        primary1Color: red700,
    }
});
const f = true
ReactDom.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Router history={createHistory()}>
            <Switch>
                <Route exact path="*/new_page" component={(props) => {return <BasePage {...props}><NewPage {...props} /></BasePage> }}/>
                <Route exact path="*/edit_page" component={(props) => {return <BasePage {...props}><EditPage {...props} /></BasePage> }}/>
                <Route exact path="*" component={(props) => {return <BasePage {...props}><Page {...props} /></BasePage> }}/>
            </Switch>
        </Router>
    </MuiThemeProvider>
    , document.getElementById('react-app'));