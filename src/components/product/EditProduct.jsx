import React, { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { Col, Row } from "react-bootstrap"
import { HiExternalLink } from "react-icons/hi";
import { getProductById } from "../utils/ApiFuncs";
import { updateProduct } from "../utils/ApiFuncs";
import { HiMiniDocumentText } from "react-icons/hi2";
import '../../styles/AddEditProduct.css'

const EditProduct = () => {
    const defaultProduct = {
        productName: "",
        productType: "",
        picture: null,
        productPrice: "",
        description: "",
        status: ""

    };
    const [product, setProduct] = useState(defaultProduct);
    const { productId } = useParams()
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [imagePreview, setImagePreview] = useState("")
    const [imageName, setImageName] = useState("")
    const statusArray = ["valid", "invalid"]


    const handleProductInputChange = (event) => {
        const { name, value } = event.target;
        console.log("event.target", event.target);
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productInfo = await getProductById(productId)
                setProduct(productInfo)
                setImagePreview(productInfo.picture)
            } catch (error) {
                console.error(error)
            }
        }

        fetchProduct()
    }, [productId])



    const handleImageChange = (event) => {
        const selectedPhoto = event.target.files[0]
        setProduct({ ...product, picture: selectedPhoto })
        console.log("selectedPhoto.name:", selectedPhoto.name)
        setImageName(selectedPhoto.name)
        setImagePreview(URL.createObjectURL(selectedPhoto))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        alert("handleSubmit");
        try {
            console.log("=======>product", product)
            // const success = await updateProduct(product.productName, product.productType, product.picture, product.productPrice,product.description)
            const success = await updateProduct(product.productId, product, imageName)
            if (success) {
                setSuccessMsg("The product was updated successfully!")
                const updatedProduct = success.data
                setProduct(updatedProduct)
                setErrorMsg("")
                setImagePreview(updatedProduct.picture)
            } else {
                setErrorMsg("An error occurs when updating product !")
            }
        } catch (error) {
            setErrorMsg(error.message)
        }
        setTimeout(() => {
            setSuccessMsg("")
            setErrorMsg("")
        }, 10000)
    }

    return (
        <>
            <section className="container mt-5 mb-5">
                <Row className="justify-content-center border">
                    <Col md={6} className="py-5">
                        <h4 className='mb-5'><HiMiniDocumentText />&nbsp;&nbsp;Edit Bot: #{product.productId}&nbsp;{product.productName}</h4>
                        {successMsg && (
                            <div className="alert alert-success fade show"> {successMsg}</div>
                        )}

                        {errorMsg && <div className="alert alert-danger fade show"> {errorMsg}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="productType" className="form-label">
                                    Product Type
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="productType"
                                    name="productType"
                                    value={product.productType}
                                    onChange={handleProductInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    required
                                    type="text"
                                    className={product.productName.length > 0 ? "form-control has-value" : "form-control"}
                                    id="productName"
                                    name="productName"
                                    value={product.productName}
                                    onChange={handleProductInputChange}
                                />
                                <label htmlFor="productName" className="form-label">Product Name</label>
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    required
                                    type="number"
                                    className={product.productPrice > 0 ? "form-control has-value" : "form-control"}
                                    id="productPrice"
                                    name="productPrice"
                                    value={product.productPrice}
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
                                    className={product.description.length > 0 ? "form-control has-value" : "form-control"}
                                    id="description"
                                    name="description"
                                    value={product.description}
                                    onChange={handleProductInputChange}
                                />
                                <label htmlFor="productDesc" className="form-label">
                                    Product Description
                                </label>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="status" className="form-label">
                                    Product Status
                                </label>
                                <select
                                    required
                                    className="form-control form-select"
                                    name="status"
                                    value={product.status}
                                    onChange={handleProductInputChange}
                                    style={{ width: "250px" }}
                                >
                                    <option value=""></option>
                                    {statusArray.map((type, index) => (
                                        <option key={index} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="photo" className="form-label">
                                    Product Photo
                                </label>
                                <input
                                    name="picture"
                                    id="photo"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={`data:image/jpeg;base64,${imagePreview}`}
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

export default EditProduct
