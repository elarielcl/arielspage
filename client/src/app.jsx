import React from 'react';
import ReactDom from 'react-dom';
import HomePage from './components/HomePage.jsx';
import { getMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDom.render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <HomePage/>
    </MuiThemeProvider>
    , document.getElementById('react-app'));