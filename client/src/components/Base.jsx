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
        this.state = {open: false, auxiliars: []};
    }

    componentWillMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/data/getAuxiliarsNamesAndRoutes');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    auxiliars: xhr.response
                });
            }
        });

        xhr.send();

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
                    {this.state.auxiliars.map((auxiliar, index) => {return <MenuItem key={index} primaryText={auxiliar.name} href={"/auxiliar/"+auxiliar.route}/>})}
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
