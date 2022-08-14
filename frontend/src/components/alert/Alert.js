import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = (props) => {
    return (
        <Alert variant={props.variant}>
            <Alert.Heading>{props.message}</Alert.Heading>
            {props.children}
        </Alert>
    )
}

export default AlertMessage