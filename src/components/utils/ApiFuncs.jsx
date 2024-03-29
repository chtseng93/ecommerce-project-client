import axios from 'axios'
import React from 'react'

export const api = axios.create({
	baseURL: "http://localhost:8083"
})
/*common*/

export const getHeader = () => {

	const token = localStorage.getItem("botland-token")
	if (token != null) {
		return {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json"
		}
	}
	return {
		"Content-Type": "application/json"
	}

}


export const getFormDataHeader = () => {
	const token = localStorage.getItem("botland-token")
	if (token != null) {
		return {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data"
		}
	}
	return {
		// Authorization: `Bearer ${token}`,
		"Content-Type": "multipart/form-data"
	}

}

export const getAuthHeader = () => {
	const token = localStorage.getItem("botland-token")

	return {
		Authorization: `Bearer ${token}`
	}

}
/* Product*/
export async function getProductTypes() {
	try {
		const res = await api.get("/products/get/productTypes")
		return res.data;
	} catch (error) {
		throw new Error("An error occurs when fetching product types")
	}
}


/* add a new product to the database*/
export async function addProduct(productName, productType, picture, productPrice, productDesc, imageName) {
	console.log("==========>Before handleSubmit")
	const formData = new FormData();
	formData.append("name", productName)
	formData.append("picture", picture)
	formData.append("type", productType)
	formData.append("price", productPrice)
	formData.append("productDesc", productDesc)
	formData.append("imageName", imageName)
	console.log("formData", formData);
	const res = await api.post("/products/add/Product", formData, {
		headers: getFormDataHeader()
	})
	console.log("==========>After handleSubmit")
	if (res.status === 200) {
		return true
	} else {
		return false;
	}

}


export async function getAllProducts() {
	try {
		const reuslt = await api.get("/products/get/allProducts")
		return reuslt.data;
	} catch (error) {
		throw Error("Error fetching products")
	}

}



/* This function gets a product by the id */
export async function getProductById(productId) {
	try {
		const result = await api.get(`/products/get/product/${productId}`)
		console.log('getProductById', result.data)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching product ${error.message}`)
	}
}


/* This function deletes a product by the Id */
// export async function deleteProduct(productId) {
// 	try {
// 		const result = await api.delete(`/products/delete/product/${productId}`, {
// 			headers: getHeader()
// 		})
// 		return result.data
// 	} catch (error) {
// 		throw new Error(`Error deleting product ${error.message}`)
// 	}
// }

/* This function updates the status of the product by the Id */
// export async function updateProductStatus(productId) {
// 	try {
// 		const result = await api.put(`/products/changeStatus/product/${productId}`, {
// 			headers: getHeader()
// 		})
// 		return result.data
// 	} catch (error) {
// 		throw new Error(`Error deleting product ${error.message}`)
// 	}
// }

/* This function update a product */
export async function updateProduct(productId, productData, imageName) {
	console.log("productData", productData)
	const formData = new FormData()
	// formData.append("id", productId)
	formData.append("productName", productData.productName)
	formData.append("picture", productData.picture)
	formData.append("productType", productData.productType)
	formData.append("productPrice", productData.productPrice)
	formData.append("description", productData.description)
	formData.append("status", productData.status)
	formData.append("imageName", imageName)
	// Encode the file using the FileReader API
	console.log("updateProductformData:", formData)
	const response = await api.put(`/products/update/${productId}`, formData, {
		headers: getFormDataHeader()
	})
	return response
}

/* This function saves a new order to the databse */
export async function insertOrder(newOrder) {
	try {
		const response = await api.post(`/orders/save/order`, newOrder, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error placing order : ${error.message}`)
		}
	}
}

/* This function gets a order by the user id */
export async function getOrderByUserId(userId) {
	try {
		const result = await api.get(`/orders/get/user-order/${userId}`, {
			headers: getAuthHeader()
		})
		console.log('getOrderByUserId', result.data)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching product ${error.message}`)
	}
}


export async function getAllOrders() {
	try {
		const reuslt = await api.get("/orders/all-orders-items", {
			headers: getAuthHeader()
		})
		return reuslt.data;
	} catch (error) {
		throw Error("Error fetching orders")
	}

}

export async function updateOrderStatus(orderId, orderStatus) {
	alert("updateOrderStatus")
	// const formData = new FormData()
	alert(orderId)
	alert(orderStatus)
	// formData.append("orderId", orderId)
	// formData.append("orderStatus", orderStatus)
	const orderReq = {
		status: orderStatus
	}
	const response = await api.put(`/orders/changeStatus/${orderId}`, orderReq, {
		headers: getHeader()
	})
	return response

}


/* This function gets a user by the id */
export async function getUserById(userId) {
	try {
		const result = await api.get(`/users/get/user/${userId}`, {
			headers: getAuthHeader()
		})
		console.log('getUserById', result.data)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching user ${error.message}`)
	}
}


/* This function register a new user */
export async function registerUser(registration) {
	try {
		const response = await api.post("/auth/register-new-user", registration, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
	}
}

/* This function login a registered user */
export async function loginUser(login) {
	console.log(login);
	try {
		const response = await api.post("/auth/login", login, {
			headers: getHeader()
		})
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}





