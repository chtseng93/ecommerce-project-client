import React from 'react'
import { addProduct } from "../utils/ApiFuncs"
import { useState } from 'react'
import ProductTypeSelector from '../common/ProductTypeSelector'
import '../../styles/AddEditProduct.css'
import { Link } from 'react-router-dom'
import { HiDocumentPlus } from "react-icons/hi2";
import { HiExternalLink } from "react-icons/hi";
import { Col, Row } from "react-bootstrap"



const AddProduct = () => {
    const defaultProduct = {
        productName: "",
        productType: "",
        picture: null,
        productPrice: "",
        productDesc:""
    };
    const [newProduct, setNewProduct] = useState(defaultProduct);
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [imagePreview, setImagePreview] = useState("")
    const [imageName, setImageName]=useState("")

    const handleProductInputChange = (event) => {
        const { name, value } = event.target;
        console.log("event.target", event.target);
        //immutable作法
        setNewProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const selectedPhoto = event.target.files[0]
        setNewProduct({ ...newProduct, picture: selectedPhoto })
        console.log("selectedPhoto.name:",selectedPhoto.name)
        setImageName(selectedPhoto.name)
        setImagePreview(URL.createObjectURL(selectedPhoto))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        // debugger;
        alert("1234");
        console.log("==========>handleSubmit")
        try {
            const success = await addProduct(newProduct.productName, newProduct.productType, newProduct.picture, newProduct.productPrice,newProduct.productDesc,imageName)
            if (success) {
                setSuccessMsg("A new product was added to the database successfully!")
                setNewProduct({ productName:"", productType: "", picture: null, productPrice: "" ,productDesc:""})
                setErrorMsg("")
                setImagePreview("")
            } else {
                setErrorMsg("An error occurs when adding a new product !")
            }
        } catch (error) {
            setErrorMsg(error.message)
        }
        setTimeout(() => {
            setSuccessMsg("")
            setErrorMsg("")
        }, 7000)
    }


    return (
        <>
            <section className="container mt-5 mb-5 ">
            <Row className="justify-content-center border">
					<Col md={6} className="py-5">
						<h4 className='mb-5'><HiDocumentPlus />&nbsp;&nbsp;Add a New Product</h4>
                        {successMsg && (
                            <div className="alert alert-success fade show"> {successMsg}</div>
                        )}

                        {errorMsg && <div className="alert alert-danger fade show"> {errorMsg}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="productType" className="form-label">
                                    Product Type
                                </label>
                                    <ProductTypeSelector
                                        handleProductInputChange={handleProductInputChange}
                                        newProduct={newProduct}
                                    />
                            </div>
                            <div className="form-group">
                                <input
                                    required
                                    type="text"
                                    className={newProduct.productName.length>0?"form-control has-value":"form-control"}
                                    id="productName"
                                    name="productName"
                                    value={newProduct.productName}
                                    onChange={handleProductInputChange}
                                />
                                <label htmlFor="productName" className="form-label">Product Name</label>
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    required
                                    type="number"
                                    className={newProduct.productPrice.length>0?"form-control has-value":"form-control"}
                                    id="productPrice"
                                    name="productPrice"
                                    value={newProduct.productPrice}
                                    onChange={handleProductInputChange}
                                />
                                <label htmlFor="productPrice" className="form-label">
                                    Product Price
                                </label>
                            </div>
                            
                            <div className="form-group mb-3">
                                <input
                                    required
                                    type="text"
                                    className={newProduct.productDesc.length>0?"form-control has-value":"form-control"}
                                    id="productDesc"
                                    name="productDesc"
                                    value={newProduct.productDesc}
                                    onChange={handleProductInputChange}
                                />
                                <label htmlFor="productDesc" className="form-label">
                                    Product Description
                                </label>
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="photo" className="form-label">
                                    Product Photo
                                </label>
                                <input
                                    required
                                    name="picture"
                                    id="photo"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview product photo"
                                        style={{ maxWidth: "300px", maxHeight: "300px" }}
                                        className="mb-3"></img>
                                )}
                            </div>
                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <Link to={"/existing-product"} className="">
                                <HiExternalLink /> Existing Products  
                                </Link> 
                            </div>
                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <button className="submitButton mt-4" type="submit" >
                                    Save Product
                                </button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </section>
        </>
    )
}

export default AddProduct;
