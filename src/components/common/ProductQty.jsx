import React from 'react'
import '../../styles/ProductQty.css'

const ProductQty = ({handleCount,quantity}) => {
    return (
        <div className='border d-flex justify-content-center custom-qty'>
            <button className="border-0 bg-transparent py-1 fs-6" name="minus" type="button" onClick={handleCount}>-</button>
            <input className="border-0 text-center py-1 px-3 " type="number" name="product-qty" min="1" max="10" value={quantity} readOnly/>
            <button className="border-0 bg-transparent py-1 fs-6" name="add" type="button" onClick={handleCount}>+</button>
        </div>
    )
}

export default ProductQty
