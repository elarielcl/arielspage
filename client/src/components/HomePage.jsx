import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';


export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {open: false};
    }


    handleToggle () {
        this.setState({open: !this.state.open});
    }

    render() {
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
                    <MenuItem primaryText="Auxiliar 1" onTouchTap={this.handleToggle} />
                    <MenuItem primaryText="Auxiliar 2" onTouchTap={this.handleToggle} />
                    <MenuItem primaryText="Auxiliar 3" onTouchTap={this.handleToggle} />
                    <MenuItem primaryText="Auxiliar 4" onTouchTap={this.handleToggle} />
                </Drawer>

                <AppBar
                    title="Ariel's Page"
                    iconElementLeft={<IconButton onTouchTap={this.handleToggle}><NavigationMenu/></IconButton>}
                />
                <Card className="container" style={{marginTop:"1em"}}>
                    <CardTitle title="Ariel's Page" subtitle="Ariel's Page." />
                </Card>
            </div>
        );
    }
}