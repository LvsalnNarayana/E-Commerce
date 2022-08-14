/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import "./productscreen.css";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Image
} from "react-bootstrap";
import Rating from "../../components/Rating/Rating";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get_product_detail } from '../../actions/product_detail_action';
import { post_add_to_cart } from '../../actions/cart_action';
import Loader from '../../components/loader/Loader.js';
import AlertMessage from '../../components/alert/Alert';
import AddToCart from '../../components/add_to_cart/AddToCart';
import Quantity from '../../components/quantity/Quantity';

const ProductScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_product_detail(params.id));
  }, [dispatch, params.id]);
  console.log(document.cookie.length);
  const products_state = useSelector(state => state.single_product);
  const { loading, error, product, add_to_cart } = products_state;
  const cart_state = useSelector(state => state.cart.cart);
  const add_to_cart_handler = () => {
    dispatch(post_add_to_cart(params.id));
  }
  return (
    <Container>
      {loading ? <Loader /> : error ?
        <AlertMessage variant="danger" heading="Error">{error.data.message}</AlertMessage> :
        <Card >
          <Card.Body>
            <Row>
              <Col lg={5} md={5} sm={6}>
                <div className="white-box text-center">
                  <Image className='img-fluid' src={product.image} alt={product.title} />
                </div>
              </Col>
              <Col lg={7} md={7} sm={6}>
                <Card.Title className='fs-3 pt-3'>{product.title}</Card.Title>
                <p>{product.subtitle}</p>
                <h5 className="box-title mt-3">Product description</h5>
                <p>{product.description}</p>
                <h3 className="my-4">
                  ₹ {product.price}<small className="text-success"> (36%off)</small>
                </h3>
                <div>
                  {product.count_in_stock === 0 ?
                    <Button variant='dark' className="rounded me-4" disabled>
                      Out of Stock
                    </Button>
                    :
                    <div className='d-flex justify-content-start'>
                      {add_to_cart === 'disable'?
                        <Quantity product_id={product._id} /> : add_to_cart === 'enable' ?
                          <AddToCart variant='dark' add_to_cart={add_to_cart_handler}>
                            <i style={{ fontSize: "18px" }} className="bi bi-bag-fill"></i>&nbsp;&nbsp;Add To Cart
                          </AddToCart> : null
                      }
                      <Button variant='primary' className="rounded ms-4">Buy Now</Button>
                    </div>}
                </div>
                <Rating className="my-3" value={4.5} reviews={4} color='#ffcc00' />
                <h3 className="box-title mt-5">Key Highlights</h3>
                <ul className="list-unstyled">
                  <li className='d-flex align-items-center'><i className="bi bi-check-circle-fill me-2 fs-4 text-success"></i>Sturdy structure</li>
                  <li className='d-flex align-items-center'><i className="bi bi-check-circle-fill me-2 fs-4 text-success"></i>Designed to foster easy portability</li>
                  <li className='d-flex align-items-center'><i className="bi bi-check-circle-fill me-2 fs-4 text-success"></i>Perfect furniture to flaunt your wonderful collectibles</li>
                </ul>
              </Col>
              <Col lg={12} md={12} sm={12}>
                <h3 className="box-title mt-5">General Info</h3>
                <div className="table-responsive">
                  <table className="table table-striped table-product">
                    <tbody>
                      <tr>
                        <td width="390">Brand</td>
                        <td>Stellar</td>
                      </tr>
                      <tr>
                        <td>Delivery Condition</td>
                        <td>Knock Down</td>
                      </tr>
                      <tr>
                        <td>Seat Lock Included</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>Type</td>
                        <td>Office Chair</td>
                      </tr>
                      <tr>
                        <td>Style</td>
                        <td>Contemporary&amp;Modern</td>
                      </tr>
                      <tr>
                        <td>Wheels Included</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>Upholstery Included</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>Upholstery Type</td>
                        <td>Cushion</td>
                      </tr>
                      <tr>
                        <td>Head Support</td>
                        <td>No</td>
                      </tr>
                      <tr>
                        <td>Suitable For</td>
                        <td>Study&amp;Home Office</td>
                      </tr>
                      <tr>
                        <td>Adjustable Height</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>Model Number</td>
                        <td>F01020701-00HT744A06</td>
                      </tr>
                      <tr>
                        <td>Armrest Included</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>Care Instructions</td>
                        <td>Handle With Care,Keep In Dry Place,Do Not Apply Any Chemical For Cleaning.</td>
                      </tr>
                      <tr>
                        <td>Finish Type</td>
                        <td>Matte</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card >}
    </Container>
  )
}

export default ProductScreen