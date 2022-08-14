/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  Badge,
  Button
} from 'react-bootstrap';
import './quantity.css'
import { post_update_cart } from '../../actions/cart_action.js';
import { useDispatch, useSelector } from 'react-redux';
import { get_cart } from '../../actions/cart_action';
const Quantity = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_cart());
  }, [dispatch]);
  const cart_state = useSelector(state => state.cart);
  const data = cart_state.cart.items.find((cart_product) => {
    return cart_product.product._id === props.product_id;
  });
  const quantity_decrease_handler = () => {
    dispatch(post_update_cart(props.product_id, 'decrease'));
  };
  const quantity_increase_handler = () => {
    dispatch(post_update_cart(props.product_id, 'increase'));
  };
  return (
    <>
      <div className='d-flex justify-content-center align-items-center'>
        <Button onClick={quantity_decrease_handler} className='mx-1 qty_btn' size='md' variant="outline-dark">
          <i className="bi bi-dash"></i>
        </Button>
        <Badge bg="dark" className='d-block px-3 qty_badge h-100 fs-3 rounded'>{0}</Badge>
        <Button onClick={quantity_increase_handler} className='mx-1 qty_btn' size='md' variant="outline-dark">
          <i className="bi bi-plus"></i>
        </Button>
      </div>
    </>
  )
}

export default Quantity