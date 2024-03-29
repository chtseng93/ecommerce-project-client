import React, { useEffect, useState } from 'react'
import { Col, Row } from "react-bootstrap"
import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
import { getProductById } from "../utils/ApiFuncs";
import '../../styles/ViewSingleProduct.css'
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidCartAdd } from "react-icons/bi";
import { IoPricetagsOutline } from "react-icons/io5";
import ProductQty from '../common/ProductQty';
import { useCart } from '../../components/cart/CartContext';



const ViewSingleProduct = () => {
    
    const { productId } = useParams();
    const { refreshCart,removeFromCart,cartItems,addToCart} = useCart();
    
    const defaultProduct = {
        productId:productId,
        productName: "",
        productType: "",
        picture: null,
        productPrice: "",
        description: "",
        filePath: ""
    };
    const [imagePath, setImagePath] = useState("")
    const [quantity,setQuantity] = useState(1)
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [product, setProduct] = useState(defaultProduct);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productInfo = await getProductById(productId);
                setProduct(productInfo);
                const path = productInfo.filePath
                console.log('path', path);
                setImagePath(path);
            } catch (error) {
                console.error(error)
            }
        }

        fetchProduct()
    }, [productId])


   const handleCount = (event)=>{
   const action = event.target.name 
    if("add"===action){
        setQuantity(preQty=>preQty+1)
    
    }
    if("minus"===action && quantity!==1){
        setQuantity(preQty=>preQty-1)
    }
   }
   
	const addProductToCart = () => {

        const newProduct = {
			...product,
			quantity: quantity,
		};
        addToCart(newProduct);
        
	};

    return (
        <section className="container mt-5 mb-5 bg-light">
            <Row className="justify-content-center border">
                <Col md={7} className="py-3">
                    <div className='singleProductImgOut'>
                        <div className='singleProductImg'
                            style={{
                                backgroundImage: `url(${imagePath})`
                            }}
                        >
                        </div>
                    </div>
                </Col>
                <Col md={5} className="py-5 px-3">
                    <div className='mb-5 mt-2'>
                        <button type="button" class="btn btn-sm btn-secondary cardLabelButton mb-2 border-0"><IoPricetagsOutline />&nbsp;{product.productType}</button>
                        <h2>{product.productName}</h2>
                        <h5>${product.productPrice}</h5>
                        <div class="about border-top pt-5">
                            <p>{product.description}</p>
                        </div>
                        
                        <div className="d-grid gap-2 d-md-flex mt-3">
                            <ProductQty handleCount={handleCount} quantity={quantity}/>
                        </div>
                        
                        <div className="d-grid gap-2 d-md-flex mt-2">
                            <button className="addCartButton mt-4" type="submit" onClick={addProductToCart} >
                                Add To Cart&nbsp;<BiSolidCartAdd />
                            </button>
                        </div>
                    </div>
                    <Link to={`/browse-all-products`}>
                        <p><IoIosArrowBack />Back to All Bots</p>
                    </Link>
                </Col>
            </Row>
        </section>
    )
}

export default ViewSingleProduct
