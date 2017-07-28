import React from 'react';
import { Card } from 'material-ui/Card';
import NotFound from './NotFound.jsx';
import showdown from 'showdown';



export default class Auxiliar extends React.Component {
    constructor(props){
        super(props);
        this.converter = new showdown.Converter();
        this.converter.setFlavor('github');
        this.id = props.match.params.id;
        this.state = {info: "", found: true};

    }

    componentWillMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/data/getAuxiliarsInfo');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    info: xhr.response.info
                });
                MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
            }else {
                this.setState({
                    found: false
                });
            }
        });

        const data = `route=${encodeURIComponent(this.id)}`;
        xhr.send(data);
    }

    render() {
        if (this.state.found)
            return (
                <div style={{display: "flex", justifyContent:"center"}}>
                    <Card className="container" style={{marginTop:"5em", width:"75%"}}>
                        <div style={{margin: "2em"}}dangerouslySetInnerHTML={{ __html: this.converter.makeHtml(this.state.info) }} />
                    </Card>
                </div>
            );
        return (<NotFound/>);
    }
}