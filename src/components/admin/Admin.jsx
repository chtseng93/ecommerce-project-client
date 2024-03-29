import React from 'react'
import { Link } from "react-router-dom"
import { Col, Row } from "react-bootstrap"
import { MdAdminPanelSettings } from "react-icons/md"
import { IoArrowForwardCircle } from "react-icons/io5";
const Admin = () => {
    return (
    <>
    <section className="container mt-5 mb-5">
      <Row className="border-0">
        {/* <Col md={12} className="justify-content-center mb-md-0"> */}
        <Col md={12} className="justify-content-start">
            <div className='border-bottom py-3'><h4 className='fw-bolder'><MdAdminPanelSettings />&nbsp;&nbsp;Welcome to Adimin Panel</h4></div>
			<br />
			<Link className="fs-5" to={"/existing-product"}><IoArrowForwardCircle />&nbsp;&nbsp;Manage Products</Link> <br />
			<Link className="fs-5" to={"/existing-orders"}><IoArrowForwardCircle />&nbsp;&nbsp;Manage Orders</Link> <br />
        </Col>
      </Row>
    </section>
    <section className="container mt-5 mb-5 border-bottom"><div style={{ width:"300px", height:"200px" }}></div></section>
    </>
    )
}

export default Admin
