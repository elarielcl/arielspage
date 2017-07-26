import React from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import showdown from 'showdown';
import RaisedButton from 'material-ui/RaisedButton';




export default class NewPost extends React.Component {
    constructor(props){
        super(props);
        this.converter = new showdown.Converter();
        this.converter.setFlavor('github');
        this.state = {info: "", password:"", route:"", name:""};

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

                    <TextField
                        style={{margin:"1em"}}
                        hintText="Password"
                        floatingLabelText="Password"
                        type="password"
                        onChange={(event, newValue) => {this.setState({password:newValue});}}/>
                    <div>
                        <RaisedButton style={{marginTop:"3em"}} label="Agregar" primary={true} onTouchTap={() => {
                            const xhr = new XMLHttpRequest();
                            xhr.open('post', '/data/addAuxiliar');
                            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                            xhr.responseType = 'json';
                            xhr.addEventListener('load', () => {
                                if (xhr.status === 200) {
                                    console.log("SIIIII");
                                }else {
                                    console.log("NOOOOO");
                                }
                            });

                            const data = `password=${this.state.password}&name=${this.state.name}&route=${this.state.route}&info=${this.state.info}`;
                            xhr.send(data);
                        }}/>
                        <RaisedButton style={{marginTop:"3em", marginLeft:"1em"}} label="Latex" secondary={true} onTouchTap={()=>{MathJax.Hub.Queue(["Typeset",MathJax.Hub]);}}/>
                    </div>
                </div>
            </div>
        );
    }
}