import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import Product from '../../components/product/Product';
import { get_products } from '../../actions/product_action';
import Loader from '../../components/loader/Loader.js';
import AlertMessage from '../../components/alert/Alert';

const HomeScreen = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_products());
    }, [dispatch]);
    const products_state = useSelector(state => state.products);
    const { loading, error, products } = products_state;
    return (
        <>
            <Row>
                {
                    loading ? <Loader /> : error ?
                        <AlertMessage variant="danger" heading="Error">{error.data.message}</AlertMessage> :
                        products && products.map((data) => {
                            return <Col key={data._id} sm={12} md={6} lg={4} xlg={4}>
                                <Product data={data} disable={data.count_in_stock > 0 ? false : true} />
                            </Col>
                        })
                }
            </Row>
        </>
    )
}

export default HomeScreen