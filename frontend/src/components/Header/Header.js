import React from 'react';
import './header.css';
import { NavLink, Link } from 'react-router-dom'
import {
    Navbar,
    Container,
    Nav
} from 'react-bootstrap';

const Header = () => {
    let activeStyle = {
        transform: "scale(1.2)",
        transformOrigin: "center center",
        transition: "all linear 0.1s",
        textShadow: "3px 3px #000"
    }
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand><strong><Link className='text-light link' to={"/"}>Shopify</Link></strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Item>
                                <NavLink to="cart" className="link_animation link text-light" style={({ isActive }) => isActive ? activeStyle : undefined} >
                                    <i className="bi bi-bag-fill me-2"></i>Cart<span className='cart_count'>2</span>
                                </NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink to="login" className="link_animation link text-light" style={({ isActive }) => isActive ? activeStyle : undefined} >
                                    <i className="bi bi-person-fill me-2"></i>Sign In
                                </NavLink>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header