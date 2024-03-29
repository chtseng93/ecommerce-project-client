import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
// import { insertOrder } from '../utils/ApiFuncs'

const Checkout = ({ productsInCart, productPrice, onSubmit,submitError }) => {
  const [errorMsg, setErrorMsg] = useState("")
  const userId = localStorage.getItem("botland-userId")
  const user = localStorage.getItem("botland-user")
  const navigate = useNavigate();
  const [order,setOrder] = useState({
    userId:userId,
    address:"",
    totalPrice:"",
    orderItems: productsInCart
  });

  

  useEffect(()=>{
    setOrder({
      ...order,
      orderItems: productsInCart,
    })


  },[productsInCart])

  useEffect(()=>{
    setOrder({
      ...order,
      totalPrice:productPrice+60
    })


  },[productPrice])

 


  const handleOrderInputChange = (event) => {
    const { name, value } = event.target;
    console.log("event.target", event.target);
    //immutable作法
    setOrder((prevState) => ({
        ...prevState,
        [name]: value,
    }));
  };

  const handleSubmit = (event) =>{
    onSubmit && onSubmit (event,order)
  }


  // const  handleSubmit =  async (event) => {
  //   event.preventDefault()
  //   alert("handleSubmit");
  //   console.log("==========>handleSubmit")
  //   try {
  //       // const success = await updateProduct(product.productName, product.productType, product.picture, product.productPrice,product.description)
  //       const success = await insertOrder(order);
  //       if (success) {
  //               alert("successfully!")
  //               navigate('/my-purchase');
  //       } else {
  //           setErrorMsg("An error occurs when updating product !")
  //       }
  //   } catch (error) {
  //       setErrorMsg(error.message)
  //   }

  //   setTimeout(() => {
	// 		setErrorMsg("")
	// 	}, 7000)

  // }

  return (
    <>
      <div className='border-bottom mb-5'>
        <h5 className='fw-bolder'><MdOutlineShoppingCartCheckout />&nbsp;&nbsp;Payment</h5>
        {errorMsg && <div className="alert alert-danger fade show"> {errorMsg}</div>}
        {submitError && <div className="alert alert-danger fade show"> {submitError}</div>}
        <h6>&nbsp;&nbsp;</h6>
      </div>
      <div className=''>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="CardNumber" className="form-label">
              CardNumber&nbsp;&nbsp;
              <p className='fs-5'><FaCcVisa />&nbsp;<FaCcMastercard /></p>
            </label>
            <input
              type="text"
              className="form-control"
              name="cardNumber"
            />
          </div>
          <div className='form-group'>
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={order.address}
              onChange={handleOrderInputChange}
            />
          </div>
          <div>
            <p className='fs-6'>Order Summary</p>
          </div>
          <div className='row'>
            <div className='col-6'>Product</div>
            <div className='col-6 d-flex justify-content-end'>${productPrice}</div>
          </div>
          <div className='row'>
            <div className='col-6'>Shipping fee</div>
            <div className='col-6 d-flex justify-content-end'>$60</div>
          </div>
          <div className='row mt-3 pt-2 border-top border-secondary'>
            <div className='col-6 fw-bolder fs-6 text-secondary'>Total:</div>
            <div className='col-6 fw-bolder fs-6 d-flex justify-content-end text-secondary'>USD {order.totalPrice}</div>
          </div>
          <div className="d-grid gap-2 d-md-flex mt-2">
            <button className="checkOut-Button mt-4" type="submit" >
              <FaCheck />&nbsp;&nbsp;Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Checkout

