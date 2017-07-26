import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';



export default class HomePage extends React.Component {

    render() {
        return (
            <Card className="container" style={{marginTop:"1em"}}>
                <CardTitle title="Welcome!"/>
            </Card>
        );
    }
}