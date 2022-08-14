import React, { useEffect } from 'react';
// import { Navigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Figure,
  Button,
  ListGroup,
  Form
} from 'react-bootstrap';
import './cartscreen.css';
import Quantity from '../../components/quantity/Quantity';
import { get_cart, post_delete_cart } from '../../actions/cart_action';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';

const CartScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_cart())
  }, [dispatch]);
  const cart_state = useSelector(state => state.cart);
  const { loading, cart } = cart_state;
  const remove_cart_item_handler = (e) => {
    dispatch(post_delete_cart(e))
  }
  return (<>
    <Container fluid>
      <Row>
        <Col lg={9}>
          <Card>
            <Table borderless>
              <tbody>
                <tr className="cart_tr cart_tr_head">
                  <th className='cart_td'>Product</th>
                  <th className='cart_td'>Quantity</th>
                  <th className='cart_td'>Price</th>
                  <th className='cart_td'></th>
                </tr>
                {
                  loading ? <tr><td><Loader /></td></tr> : cart && cart.items.map((cart_item) => {
                    return <tr key={cart_item.product._id} className='cart_tr'>
                      <td className='cart_td'>
                        <Figure.Image
                          width={171}
                          height={180}
                          alt="171x180"
                          src={cart_item.product.image}
                        />
                      </td>
                      <td className='cart_td'>
                        <Quantity product_id={cart_item.product._id} />
                      </td>
                      <td className='cart_td'>
                        <h4 className='text-bold'>{cart_item.product.price}</h4>
                      </td>
                      <td className='cart_td'>
                        <Button onClick={() => remove_cart_item_handler(cart_item.product._id)} className='mx-1 p-1 px-2' size='md' variant="danger"><i className="bi bi-trash-fill me-2"></i>Remove</Button>
                        <Button className='mx-1 p-1 px-2' size='md' variant="warning"><i className="bi bi-bag-heart-fill me-2"></i>Wishlist</Button>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </Table>
          </Card>
        </Col>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="coupon_code">
                  <Form.Label>Have Coupon?</Form.Label>
                  <Form.Control type="text" placeholder="Coupon Code" />
                </Form.Group>
                <Button className='w-100 p-1' variant="dark" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item className='list_item'>Total&nbsp;:&nbsp;{cart.total}</ListGroup.Item>
                <ListGroup.Item className='list_item'>
                  <Button className='w-100 p-1 mb-3' variant="success">
                    Checkout
                  </Button>
                  <Button className='w-100 p-1' variant="info">
                    Continue Shopping
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </>)
}

export default CartScreen


