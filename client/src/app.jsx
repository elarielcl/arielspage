import React from 'react';
import ReactDom from 'react-dom';
import Auxiliar from './components/Auxiliar.jsx';
import HomePage from './components/HomePage.jsx';
import NotFound from './components/NotFound.jsx';
import NewPost from './components/NewPost.jsx';
import Base from './components/Base.jsx';
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
            <Base>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/auxiliar/:id" component={Auxiliar}/>
                    <Route exact path="/new_post" component={NewPost}/>
                    <Route exact path="*" component={NotFound}/>
                </Switch>
            </Base>
        </Router>
    </MuiThemeProvider>
    , document.getElementById('react-app'));