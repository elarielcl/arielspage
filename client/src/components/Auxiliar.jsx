import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import NotFound from './NotFound.jsx';
import showdown from 'showdown';



const auxiliares = {
    "1": "#Auxiliar 1\n##P1\n###a)\nEsta es la resolucion del P1 a)",
    "2": "#Auxiliar 2",
    "3": "#Auxiliar 3",
    "4": "#Auxiliar 4",
    "mcd": "#Correctitud: Algoritmo de Euclides\n\nEl algoritmo de Euclides nos entrega el \"máximo común divisor\"(mcd) entre dos números naturales.\n\n    mcd(m, n):\n        r = m mod n\n        if r == 0:\n            return n\n        return mcd(n,r)\nPara mostrar la correctitud de este algoritmo debemos demostrar 2 cosas.\n##Finitud\nEste algoritmo se detiene para todo par de naturales, pues (asumiendo que $m\\ge n$) se cumple que $m\\ge n$ y $n\\ge r$, por lo que los argumentos de la función mcd se van achicando con cada llamada recursiva.\n##Respuesta correcta\nPara verificar que lo que entrega el algoritmo como respuesta es correcta basta con ver que $mcd(m,n)=mcd(n,r)$.\n\nPara ver esto mostraremos que los divisores de $m$ y $n$ son los mismos que los divisores de $n$ y $r$, y por lo tanto, el mcd será el mismo.\n\nNotemos para esta última parte que $$m=nq+r$$\n, por lo que un divisor de $n$ y $r$ también es divisor de $m$. Ahora, si tenemos un divisor de $n$ y $m$, por ser $$r = m - nq$$, este será divisor de $r$ también.\nY, por lo tanto, los divisores de $m$ y $n$ son los mismos que los divisores de $n$ y $r$. Terminando con esto la dmeostración."
}

export default class Auxiliar extends React.Component {
    constructor(props){
        super(props);
        this.converter = new showdown.Converter();
        this.id = props.match.params.id;
        this.state = {info: "", found: true};

    }

    componentWillMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/data/getAuxiliarsInfo/:route?');
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

        const data = `route=${this.id}`;
        xhr.send(data);
    }

    render() {
        if (this.state.found)
            return (
                <div style={{display: "flex", justifyContent:"center"}}>
                    <Card className="container" style={{marginTop:"5em"}}>
                        <div style={{margin: "2em"}}dangerouslySetInnerHTML={{ __html: this.converter.makeHtml(this.state.info) }} />
                    </Card>
                </div>
            );
        return (<NotFound/>);
    }
}