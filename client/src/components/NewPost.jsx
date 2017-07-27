import React from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import showdown from 'showdown';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';


export default class NewPost extends React.Component {

    constructor(props){
        super(props);
        this.converter = new showdown.Converter();
        this.converter.setFlavor('github');
        this.state = {info: "", password:"", route:"", name:"", open:false, snackOpen:false, snackText:""};
        this.handleClose = this.handleClose.bind(this);
        this.handleSnackClose = this.handleSnackClose.bind(this);
    }

    handleClose() {
        this.setState({open: false});
    }

    handleSnackClose() {
        this.setState({snackOpen: false});
    }

    render() {
        return (
            <div>
                <div style={{display: "flex", justifyContent:"center", marginLeft:"2em", marginRight:"2em"}}>
                    <Card className="container" style={{marginTop:"5em", textAlign:"center"}}>
                        <TextField
                            style={{width:"75%"}}
                            multiLine={true}
                            onChange={(event, newValue) => {this.setState({info:newValue});}}
                            name="info"
                        />
                    </Card>
                    <Card className="container" style={{marginTop:"5em"}}>
                        <div style={{margin: "2em"}}dangerouslySetInnerHTML={{ __html: this.converter.makeHtml(this.state.info) }} />
                    </Card>
                </div>
                <div style={{textAlign:"center", marginTop:"2em", display:"flex", justifyContent:"center"}}>

                    <TextField
                        style={{margin:"1em"}}
                        hintText="Nombre"
                        floatingLabelText="Nombre"
                        onChange={(event, newValue) => {this.setState({name :newValue});}}/>

                    <TextField
                        style={{margin:"1em"}}
                        hintText="Route"
                        floatingLabelText="Route"
                        onChange={(event, newValue) => {this.setState({route:newValue});}}/>

                    <div>
                        <RaisedButton style={{marginTop:"3em"}} label="Agregar" primary={true} onTouchTap={() => {
                            this.setState({open: true});
                        }}/>
                        <RaisedButton style={{marginTop:"3em", marginLeft:"1em"}} label="Latex" secondary={true} onTouchTap={()=>{MathJax.Hub.Queue(["Typeset",MathJax.Hub]);}}/>
                    </div>
                </div>
                <Dialog
                    title="¿Está seguro que quiere añadir este post?"
                    actions={[
                        <FlatButton
                            label="No"
                            primary={true}
                            onTouchTap={this.handleClose}
                        />,
                        <FlatButton
                            label="Si"
                            primary={true}
                            onTouchTap={() => {
                                 const xhr = new XMLHttpRequest();
                                 xhr.open('post', '/data/addAuxiliar');
                                 xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                                 xhr.responseType = 'json';
                                 xhr.addEventListener('load', () => {
                                     if (xhr.status === 200) {
                                        this.setState({snackOpen:true, snackText:"Auxiliar Agregado"});
                                     }else {
                                         this.setState({snackOpen:true, snackText:"Error"});
                                     }
                                });
                                 const data = `password=${this.state.password}&name=${this.state.name}&route=${this.state.route}&info=${this.state.info}`;
                                 xhr.send(data);
                                 this.handleClose();
                            }}
                        />,
                    ]}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
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
}