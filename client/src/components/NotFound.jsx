import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';


export default class NotFound extends React.Component {

    render() {
        return (
            <Card className="container" style={{marginTop:"5em"}}>
                <CardTitle title="Not Found"/>
            </Card>
        );
    }
}