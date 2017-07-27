import React from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import showdown from 'showdown';
import RaisedButton from 'material-ui/RaisedButton';
import NotFound from "./NotFound.jsx";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';



export default class EditPost extends React.Component {

    constructor(props){
        super(props);
        this.converter = new showdown.Converter();
        this.converter.setFlavor('github');
        this.id = props.match.params.id;
        this.state = {info: "", password:"", route:"", name:"", found:true, removeOpen:false, modifyOpen:false, snackOpen:false, snackText:""};
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
        xhr.open('post', '/data/getAuxiliarsInfo');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    info: xhr.response.info,
                    name: xhr.response.name,
                    route: xhr.response.route,
                });
                MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
            }else {
                this.setState({
                    found: false
                });
            }
        });

        const data = `route=${this.id}`;
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
                        title="¿Está seguro que quiere modificar este post?"
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
                                    xhr.open('post', '/data/modifyAuxiliar');
                                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                                    xhr.responseType = 'json';
                                    xhr.addEventListener('load', () => {
                                        if (xhr.status === 200) {
                                            this.setState({snackOpen:true, snackText:"Auxiliar Modificado"});
                                        }else {
                                            this.setState({snackOpen:true, snackText:"Error"});
                                        }
                                    });

                                    const data = `password=${this.state.password}&name=${this.state.name}&route=${this.state.route}&info=${this.state.info}`;
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
                        title="¿Está seguro que quiere eliminar este post?"
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
                                    xhr.open('post', '/data/removeAuxiliar');
                                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                                    xhr.responseType = 'json';
                                    xhr.addEventListener('load', () => {
                                        if (xhr.status === 200) {
                                            this.setState({snackOpen:true, snackText:"Auxiliar Eliminado"});
                                        }else {
                                            this.setState({snackOpen:true, snackText:"Error"});
                                        }
                                    });

                                    const data = `password=${this.state.password}&route=${this.state.route}`;
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