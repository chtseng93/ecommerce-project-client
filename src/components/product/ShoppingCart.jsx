import React, { useEffect, useState } from 'react'
import { HiOutlineShoppingBag } from "react-icons/hi";
import ShoppingCartCard from './ShoppingCartCard';
import { Col, Container, Row } from "react-bootstrap"
import '../../styles/ShoppingCart.css'
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom"
import { IoCloseOutline } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useCart } from '../../components/cart/CartContext';
import Checkout from '../order/Checkout';
import CommonModal from '../common/CommonModal';
import { insertOrder } from '../utils/ApiFuncs';
import { PiContactlessPaymentFill } from "react-icons/pi";
import { FaCircleNodes } from "react-icons/fa6";




const ShoppingCart = () => {
  const { refreshCart, removeFromCart, cartItems, addToCart,deleteAllCartItems } = useCart();
  const [productsInCart, setProductsInCart] = useState(cartItems);
  const [totalPrice, setTotalPrice] = useState(0);
  const [visibilty, setVisibilty] = useState(false);
  const [paymentVisibilty, setPaymentVisibilty] = useState(false);
  const [successOrderNo, setSuccessOrderNo] = useState("");
  const [errorMsg, setErrorMsg] = useState("")



  // const [orderItems, setOrderItems] = useState([])

  useEffect(() => {
    setProductsInCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    setTotalPrice(getPrice());
  }, [productsInCart])



  const handleCount = (event, product) => {
    console.log('handleCount!');
    const action = event.target.name
    let num = product.quantity
    console.log('initial-num:', num);
    if ("add" === action) {
      num = num + 1;
      console.log('add-num:', num);
    }
    if ("minus" === action && product.quantity > 1) {
      num = num - 1;
      console.log('minus-num:', num);
    }
    const newProduct = {
      ...product,
      quantity: num,
    };

    return newProduct;

  }

  const handleProductRemove = (product) => {
    removeFromCart(product);
  };

  const renderShoppingCart = () => {
    return productsInCart.map((product) => <ShoppingCartCard key={product.productId} theProduct={product} onChangeCount={handleCount} onProductRemove={handleProductRemove} />)
  }

  const getPrice = () => {
    let price = 0
    productsInCart.map((product) => {
      price = price + (product.quantity * product.productPrice)
    })
    console.log('price', price)
    return price;
  }

  // const handleOnClose = () => {
  //   setVisibilty(false);
  // }
  const delay= (n) => {
    return new Promise(function(resolve) {
      setTimeout(resolve, n * 1000);
    });
  }

  const handleSubmit = async (event, order) => {
    event.preventDefault()
    alert("handleSubmit");
    console.log("==========>handleSubmit:",order)
    try {
      setPaymentVisibilty(true);
      await delay(10);
      const success = await insertOrder(order);
      if (success) {
        setPaymentVisibilty(false);
        setVisibilty(true);
        setSuccessOrderNo(success.data)
        deleteAllCartItems();
      } else {
        setPaymentVisibilty(false);
        setErrorMsg("An error occurs when updating product !")
      }
    } catch (error) {
      setPaymentVisibilty(false);
      setErrorMsg(error.message)
    }
    // setTimeout(() => {
    //   setErrorMsg("")
    // }, 7000)

  }

  return (
    <section className="container mt-5 mb-5">
      <Row >
        <Col md={12}>
          <CommonModal visibilty={visibilty}>
            {/* <div className=''><FaRegCircleCheck  size={20}/></div> */}
            <div className='d-flex justify-content-center order-confirm'><h1><FaRegCircleCheck/></h1></div>
            <div className='d-flex justify-content-center mt-2'>
              <h3 className='order-confirm'>Order Confirmed!</h3>
            </div>
            <div className='d-flex justify-content-center'>
              <p>Your order has been placed successfully. Thank you so much!</p>
            </div>
            <div className="d-flex justify-content-center">
              <Link to={"/my-purchase"} className="">
              <p><IoIosArrowBack />Check My Purchase</p>
              </Link>
            </div>
          </CommonModal >
          <CommonModal visibilty={paymentVisibilty}>
            <div className='d-flex justify-content-center order-confirm rotate'><h1 className=''><FaCircleNodes /></h1></div>
            <div className='d-flex justify-content-center mt-2'>
              <h3 className='order-confirm'>Processing Payment...</h3>
            </div>
            <div className='d-flex justify-content-center'>
              <p>Your Payment is being processed. Please DO NOT close this page.</p>
            </div>
          </CommonModal >
        </Col>
      </Row>
      <Row className="border-0">
        <Col md={6} className="justify-content-start pt-3">
          <div className='border-bottom mb-5'>
            <h5 className='fw-bolder'><HiOutlineShoppingBag />&nbsp;&nbsp;Your Shopping Cart</h5>
            <h6>{productsInCart.length} &nbsp;&nbsp;items</h6>
          </div>
          <div>
            <Link to={`/browse-all-products`}>
              <p><IoIosArrowBack />&nbsp;&nbsp;Shop More</p>
            </Link>
          </div>
          {productsInCart.length === 0 ?
            (<div>
              <p className="fs-6">Your basket is currently empty...</p>
            </div>)
            : (<div className="row d-block align-items-center justify-content-center">{renderShoppingCart()}</div>
            )
          }
        </Col>
        {productsInCart.length > 0 ?
        (<Col md={6} className="justify-content-start bg-light py-3 px-5 shadow">
          <Checkout productsInCart={productsInCart} productPrice={totalPrice} onSubmit={handleSubmit} submitError={errorMsg} />
        </Col>):(<Col md={6}></Col>)
        }
      </Row>
    </section>
  )
}

export default ShoppingCart
