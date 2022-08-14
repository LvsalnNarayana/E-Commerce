import React from 'react';
import {
    Button
} from "react-bootstrap";

const AddToCart = (props) => {
    const add_to_cart_handler = () => {
        props.add_to_cart();
    }
    return (
        <Button onClick={add_to_cart_handler} variant={props.variant} className="rounded me-4" >
            {props.children}
        </Button>
    )
}

export default AddToCart