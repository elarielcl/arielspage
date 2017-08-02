import React from 'react';
import { Link } from "react-router";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router-dom'

export default class BasePage extends React.Component {

    constructor(props) {
        super(props);
        this.path = props.match.params[0];
        if (this.path==="/") this.path = "";
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {open: false, posts: []};
    }

    componentWillMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/data/getPagesNamesAndRoutes');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    posts: xhr.response
                });
            }
        });

        const data = `route=${encodeURIComponent(this.path)}`;
        xhr.send(data);

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
                    {this.state.posts.map((post, index) => {return <MenuItem key={index} primaryText={post.name} href={post.route}/>})}
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
