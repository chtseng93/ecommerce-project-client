import React, { useEffect, useState } from 'react'
import ProductQty from '../common/ProductQty'
import { Col } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiFillRobot } from "react-icons/ai";
import { IoPricetagsOutline } from "react-icons/io5";
import { useCart } from '../../components/cart/CartContext';



const ShoppingCartCard = ({ theProduct, onChangeCount, onProductRemove }) => {
  const { refreshCart,removeFromCart,cartItems,addToCart} = useCart();
  const [ product, setProduct] = useState(theProduct)
  const [imagePath, setImagePath] = useState("")
  useEffect(() => {
    const path = product.filePath.replace('D:/clientside/ecommerce-project-client/src/images/', '../../src/images/');
    console.log('path', path);
    setImagePath(path);
  }, [product]);

  const handleCount = (event) => {
    // onChangeCount && 
    if (onChangeCount) {
      const newProduct = onChangeCount(event, product);
      setProduct(newProduct);
      addToCart(newProduct);
    }

  }

  const onRemoveProduct = () => {
    onProductRemove && onProductRemove(product);
  }



  return (
    <Col key={product.productId} className="align-items-center justify-content-center border-top border-bottom py-2 mt-2" md={12}>
     
        <div className="row rounded-0 border-0">
          <div className="col-4 justify-content-start">
            <div className='shoppingCartImg'
              style={{
                backgroundImage: `url(${imagePath})`
              }}
            ></div>
          </div>

          <div className="col-4 justify-content-start">
            <div>
              <Link to={`/view-product/${product.productId}`}>
                <button type="button" class="btn btn-sm btn-secondary cardLabelButton mb-2 border-0"><IoPricetagsOutline />&nbsp;{product.productType}</button>
                <p className="custom-cart-title fs-5 fw-normal" style={{ textDecoration: "none" }}><AiFillRobot />{product.productName}</p>
                <p className="fs-6 text-secondary">$&nbsp;&nbsp;{product.productPrice}</p>
              </Link>
            </div>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-end">
            <div><ProductQty handleCount={handleCount} quantity={product.quantity} /></div>
            <div className="border-0 bg-transparent ms-5 fs-6" onClick={onRemoveProduct}><RiDeleteBin2Line /></div>
          </div>
        </div>
    </Col>
  )
}

export default ShoppingCartCard
