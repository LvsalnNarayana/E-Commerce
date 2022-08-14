import { useLayoutEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/footer/Footer';
import Header from './components/Header/Header';
import HomeScreen from './screens/home/HomeScreen';
import ProductScreen from './screens/ProductScreen/ProductScreen';
import CartScreen from './screens/CartScreen/CartScreen';
import NotFound from './screens/404_not_found/404';
import Authentication from './screens/authentication/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_user } from './actions/user_action.js';
import { Navigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const user_state = useSelector(state => state.user);
  useLayoutEffect(() => {
    dispatch(fetch_user())
  }, [dispatch]);
  return (
    <>
      <Header></Header>
      <Container>
        <main className='py-3'>
          <Routes >
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/products/:id" element={<ProductScreen />} />
            <Route exact path="/Not_found" element={<NotFound />} />
            <Route exact path="/login" element={<Authentication />} />
            <Route exact path="/cart" element={user_state.user_message.is_logged === true ? <CartScreen /> : <Navigate to="/login" replace />} />
          </Routes >
        </main>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default App;
