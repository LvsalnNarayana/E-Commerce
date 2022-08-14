import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <>
            <div className='d-flex justify-content-center align-items-center h-100'>
            <Spinner animation="border" size='lg' />
            </div>
        </>
    )
}

export default Loader