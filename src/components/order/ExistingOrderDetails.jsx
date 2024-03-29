import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Col, Container, Row } from "react-bootstrap"
import { HiExternalLink } from "react-icons/hi";
import { IoIosSave } from "react-icons/io";
import { getUserById,updateOrderStatus } from '../utils/ApiFuncs'
import { IoMdListBox } from "react-icons/io";

const ExistingOrderDetails = () => {
    const location = useLocation()
    const { theOrder } = location.state
    const statusTypes = ["Cancelled", "Awaiting Shipment", "Shipped", "Completed"]
    const [order, setOrder] = useState(theOrder);
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchUser();
    }, [])

    const fetchUser = async() => {
        try {
            const result = await getUserById(order.userId);
            console.log("result",result)
            setUser(result)
        } catch (error) {
            setErrorMsg(error.message)
            
        }
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        console.log("event.target", event.target)

        const newOrder = {
            ...order,
            status: value
        }
        setOrder(newOrder);
    }
    const handleSaveChange = async () => {
        alert("handleSaveChange")
        try {
            const result = await updateOrderStatus(order.orderId,order.status);
            alert("after-handleSaveChange")
            setSuccessMsg("The order status has been updated!")

        } catch (error) {
            setErrorMsg(error.message)
        }
        setTimeout(() => {
            setSuccessMsg("")
            setErrorMsg("")
        }, 10000)
    }

    return (
        <section className="container mt-3 mb-5 ">
            <Row className="justify-content-center">
                <Col md={8} className="pt-5">
                    <h4 className='mb-3'><IoMdListBox />Order Details:OrderNo.#{order.orderId}</h4>
                    {successMsg && (
                        <div className="alert alert-success fade show"> {successMsg}</div>
                    )}
                    {errorMsg && (
                        <div className="alert alert-success fade show"> {errorMsg}</div>
                    )}
                    <label htmlFor="status" className="form-label">
                        User:
                    </label>
                    <p>{user.firstName} {user.lastName}</p>
                    <label htmlFor="status" className="form-label">
                        Address:
                    </label>
                    <p>{order.address}</p>
                </Col>
                <Col md={8}>
                    <label htmlFor="status" className="form-label">
                        Order Status
                    </label>
                    <select
                        required
                        className="form-control form-select"
                        name="Status"
                        value={order.status}
                        onChange={handleInputChange}
                        style={{ width: "250px" }}
                    >
                        <option value=""></option>
                        {statusTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <button className='order-check border-0' onClick={handleSaveChange}><IoIosSave />&nbsp;&nbsp;Save Status Change</button>
                </Col>
                <Col md={8} className="pb-3">
                    <div className="d-grid gap-2 d-md-flex mt-2 justify-content-end">
                        <Link to={"/existing-orders"} className="">
                            <HiExternalLink />&nbsp;Back to List
                        </Link>
                    </div>
                </Col>
                <Col md={8} >
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Order No.</th>
                                <th scope="col">ProductName</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Per Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orderItems.map((item) => (
                                <tr key={item.itemId}>
                                    <th scope="row">#{item.orderId}</th>
                                    <td>{item.productName}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.productPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </section>
    )
}

export default ExistingOrderDetails
