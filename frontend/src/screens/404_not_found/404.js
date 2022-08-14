import React from 'react';
import { NavLink  } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <h1>Page Not Found</h1>
            <NavLink  to={'/'}>Home</NavLink >
        </>
    )
}

export default NotFound