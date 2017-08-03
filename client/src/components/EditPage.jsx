import React from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import showdown from 'showdown';
import RaisedButton from 'material-ui/RaisedButton';
import NotFound from "./NotFound.jsx";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';



export default class EditPage extends React.Component {

    constructor(props){
        super(props);
        this.converter = new showdown.Converter();
        this.converter.setFlavor('github');
        this.id = props.match.params[0].split("/");
        this.id = this.id.slice(0, this.id.length-1).join("/");
        this.route = props.match.params[0];
        this.state = {id:"", info: "", password:"", route:"", name:"", found:true, removeOpen:false, modifyOpen:false, snackOpen:false, snackText:""};
        this.handleModifyClose = this.handleModifyClose.bind(this);
        this.handleRemoveClose = this.handleRemoveClose.bind(this);
        this.handleSnackClose = this.handleSnackClose.bind(this);
    }

    handleModifyClose() {
        this.setState({modifyOpen: false});
    }

    handleRemoveClose() {
        this.setState({removeOpen: false});
    }

    handleSnackClose() {
        this.setState({snackOpen: false});
    }

    componentWillMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/data/getPagesInfo');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const routes = xhr.response.route.split("/");
                this.setState({
                    id: xhr.response._id,
                    info: xhr.response.info,
                    name: xhr.response.name,
                    route: routes[routes.length - 1],
                });
                MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
            }else {
                this.setState({
                    found: false
                });
            }
        });

        const data = `route=${encodeURIComponent(this.route)}`;
        xhr.send(data);
    }


    render() {
        if (this.state.found) {
            return (
                <div>
                    <div style={{display: "flex", justifyContent: "center", marginLeft: "2em", marginRight: "2em"}}>
                        <Card className="container" style={{marginTop: "5em", textAlign: "center"}}>
                            <TextField
                                style={{width: "75%"}}
                                multiLine={true}
                                onChange={(event, newValue) => {
                                    this.setState({info: newValue});
                                }}
                                name="info"
                                value={this.state.info}
                            />
                        </Card>
                        <Card className="container" style={{marginTop: "5em"}}>
                            <div style={{margin: "2em"}}
                                 dangerouslySetInnerHTML={{__html: this.converter.makeHtml(this.state.info)}}/>
                        </Card>
                    </div>
                    <div style={{textAlign: "center", marginTop: "2em", display: "flex", justifyContent: "center"}}>

                        <TextField
                            style={{margin: "1em"}}
                            hintText="Nombre"
                            floatingLabelText="Nombre"
                            onChange={(event, newValue) => {
                                this.setState({name: newValue});
                            }}
                            value={this.state.name}/>

                        <TextField
                            style={{margin: "1em"}}
                            hintText="Route"
                            floatingLabelText="Route"
                            onChange={(event, newValue) => {
                                this.setState({route: newValue});
                            }}
                            value={this.state.route}/>

                        <div>
                            <RaisedButton style={{marginTop: "3em"}} label="Modificar" primary={true} onTouchTap={() => {
                                this.setState({modifyOpen:true});
                            }}/>
                            <RaisedButton style={{marginTop: "3em", marginLeft: "1em"}} label="Eliminar" primary={true} onTouchTap={() => {
                                this.setState({removeOpen:true});
                            }}/>
                            <RaisedButton style={{marginTop: "3em", marginLeft: "1em"}} label="Latex" secondary={true}
                                          onTouchTap={() => {
                                              MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                                          }}/>
                        </div>
                    </div>
                    <Dialog
                        title="¿Está seguro que quiere modificar esta página?"
                        actions={[
                            <FlatButton
                                label="No"
                                primary={true}
                                onTouchTap={this.handleModifyClose}
                            />,
                            <FlatButton
                                label="Si"
                                primary={true}
                                onTouchTap={() => {
                                    const xhr = new XMLHttpRequest();
                                    xhr.open('post', '/data/modifyPage');
                                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                                    xhr.responseType = 'json';
                                    xhr.addEventListener('load', () => {
                                        if (xhr.status === 200) {
                                            this.setState({snackOpen:true, snackText:"Página Modificada"});
                                        }else {
                                            this.setState({snackOpen:true, snackText:"Error"});
                                        }
                                    });

                                    const data = `password=${encodeURIComponent(this.state.password)}&id=${encodeURIComponent(this.state.id)}&name=${encodeURIComponent(this.state.name)}&route=${encodeURIComponent(this.id+((this.id === "" && this.state.route==="")?"":"/")+this.state.route)}&info=${encodeURIComponent(this.state.info)}`;
                                    xhr.send(data);
                                    this.handleModifyClose();
                                }}
                            />,
                        ]}
                        modal={false}
                        open={this.state.modifyOpen}
                        onRequestClose={this.handleModifyClose}
                        autoScrollBodyContent={true}
                    >
                        <TextField
                            style={{margin:"1em"}}
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password"
                            onChange={(event, newValue) => {this.setState({password:newValue});}}/>
                    </Dialog>

                    <Dialog
                        title="¿Está seguro que quiere eliminar esta página?"
                        actions={[
                            <FlatButton
                                label="No"
                                primary={true}
                                onTouchTap={this.handleRemoveClose}
                            />,
                            <FlatButton
                                label="Si"
                                primary={true}
                                onTouchTap={() => {
                                    const xhr = new XMLHttpRequest();
                                    xhr.open('post', '/data/removePage');
                                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                                    xhr.responseType = 'json';
                                    xhr.addEventListener('load', () => {
                                        if (xhr.status === 200) {
                                            this.setState({snackOpen:true, snackText:"Pagina Eliminada"});
                                        }else {
                                            this.setState({snackOpen:true, snackText:"Error"});
                                        }
                                    });

                                    const data = `password=${encodeURIComponent(this.state.password)}&id=${encodeURIComponent(this.state.id)}`;
                                    xhr.send(data);
                                    this.handleRemoveClose();
                                }}
                            />,
                        ]}
                        modal={false}
                        open={this.state.removeOpen}
                        onRequestClose={this.handleRemoveClose}
                        autoScrollBodyContent={true}
                    >
                        <TextField
                            style={{margin:"1em"}}
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password"
                            onChange={(event, newValue) => {this.setState({password:newValue});}}/>
                    </Dialog>
                    <Snackbar
                        open={this.state.snackOpen}
                        message={this.state.snackText}
                        autoHideDuration={3000}
                        onRequestClose={this.handleSnackClose}
                    />
                </div>
            );
        }
        return (<NotFound/>)
    }
}