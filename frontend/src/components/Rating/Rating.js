import React from 'react';

const Rating = ({ value, reviews, color, className }) => {
    const rating_style = {
        fontSize: '18px', color: color
    }
    return (
        <div className={`d-flex justify-content-start align-items-center ${className}`} >
            <div>
                <i style={rating_style} className={value <= 0 ? "bi bi-star" : value === 0.5 ? "bi bi-star-half" : "bi bi-star-fill"}></i>
                <i style={rating_style} className={value <= 1 ? "bi bi-star" : value === 1.5 ? "bi bi-star-half" : "bi bi-star-fill"}></i>
                <i style={rating_style} className={value <= 2 ? "bi bi-star" : value === 2.5 ? "bi bi-star-half" : "bi bi-star-fill"}></i>
                <i style={rating_style} className={value <= 3 ? "bi bi-star" : value === 3.5 ? "bi bi-star-half" : "bi bi-star-fill"}></i>
                <i style={rating_style} className={value <= 4 ? "bi bi-star" : value === 4.5 ? "bi bi-star-half" : "bi bi-star-fill"}></i>
            </div>
            <div>
                <p className='m-0'>&nbsp;&nbsp;from {reviews} reviews</p>
            </div>
        </div >
    )
}

export default Rating