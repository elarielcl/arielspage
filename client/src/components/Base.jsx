import React from 'react';
import { Link } from "react-router";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router-dom'

export default class Base extends React.Component {

    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {open: false};
    }

    handleToggle () {
        this.setState({open: !this.state.open});
    }

    render(){
        return (
            <div>
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <AppBar
                        title="Ariel's Page"
                        showMenuIconButton={false}
                    />
                    <MenuItem primaryText="Auxiliar 1" href="/auxiliar/1"/>
                    <MenuItem primaryText="Auxiliar 2" href="/auxiliar/2"/>
                    <MenuItem primaryText="Auxiliar 3" href="/auxiliar/3"/>
                    <MenuItem primaryText="Auxiliar 4" href="/auxiliar/4"/>
                </Drawer>

                <AppBar
                    style={{ position: "fixed" }}
                    title="Ariel's Page"
                    iconElementLeft={<IconButton onTouchTap={this.handleToggle}><NavigationMenu/></IconButton>}
                />
                {this.props.children}
        </div>
        );
    }
}
