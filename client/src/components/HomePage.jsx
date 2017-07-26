import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';



export default class HomePage extends React.Component {

    render() {
        return (
            <div style={{display: "flex", justifyContent:"center"}}>
                <Card className="container" style={{marginTop:"5em"}}>
                    <CardTitle title="Welcome!"/>
                </Card>
            </div>
        );
    }
}