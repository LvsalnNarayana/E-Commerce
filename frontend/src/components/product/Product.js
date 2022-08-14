import React from 'react';
import "./product.css";
import { Link } from "react-router-dom"
import { Card, Button } from 'react-bootstrap';
import Rating from '../Rating/Rating';
import { truncateString } from '../../functionalities';

const Product = (props) => {
    const product = props.data;
    return (
        <>
            <Card className='m-2'>
                <div className='p-2'>
                <div className='product_img'>
                    <Card.Img src={product.image} />
                </div>
                </div>
                <Card.Body>
                    <Card.Title className='fs-4 my-3'><strong><Link className='product_link' to={`/products/${product._id}`}>{truncateString(product.title , 20)}</Link></strong></Card.Title>
                    <Card.Text>
                    {truncateString(product.description , 100)}
                    </Card.Text>
                    <Button variant="primary"><i className="bi bi-bag-fill me-2"></i>Add To Cart</Button>
                </Card.Body>
                <Card.Footer>
                    <Rating value={product.rating} reviews={product.number_reviews} color='#ffcc00' />
                </Card.Footer>
            </Card>
        </>
    )
}

export default Product