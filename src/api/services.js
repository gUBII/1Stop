import axios from "axios";

const baseURL = "http://localhost:3001/";

const getToken = (user) => {
  const request = axios.post(baseURL + "auth/token", {email: user.email});
  return request.then((response) => response.data);
};

const checkAdmin = async ({token})  => {
	const request = axios.get(baseURL + "auth", { headers: {"Authorization" : `Bearer ${token}`} });
	let isAdmin = await request.then((response) => response.data=== "Verified")
	if(isAdmin) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
	return isAdmin;
  };
const searchProducts = (params) => {
	const request = axios.get(`${baseURL}api/search`, { params });
	return request.then((response) => response.data);
};

const getProducts = () => {
	const request = axios.get(`${baseURL}api/products`);
	return request.then((response) => response.data);
};

const getProductDetails = (id) => {
	const request = axios.get(`${baseURL}api/products/${id}`);
	return request.then((response) => response.data);
};

const createProduct = (product) => {
	const request = axios.post(`${baseURL}api/products/`, product);
	return request.then((response) => response.data);
};

const deleteProduct = (productID) => {
	const request = axios.delete(`${baseURL}api/products/${productID}`);
	return request.then((response) => response.data);
};

const updateProduct = (productID, newValue) => {
	const request = axios.put(`${baseURL}api/products/${productID}`, newValue);
	return request.then((response) => response.data);
};

// const getCart = (userID) => {
// 	const request = axios.post(`${baseURL}api/cart`, cart);
// 	return request.then((response) => response.data);
// };

// const createCart = (cart) => {
// 	const request = axios.post(`${baseURL}api/cart`, cart);
// 	return request.then((response) => response.data);
// };

// const updateCart = (cart) => {
// 	const request = axios.put(`${baseURL}api/cart`, cart);
// 	return request.then((response) => response.data);
// };

const getOrders = () => {
	const request = axios.get(`${baseURL}api/orders`);
	return request.then((response) => response.data);
};

const checkout = (line_items) => {
	const request = axios.post(`${baseURL}create-checkout-session`, line_items)
	return request.then((response) => response.data.url)
};


export default {
	getToken,
	checkAdmin,
	getProducts,
	getProductDetails,
	searchProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getOrders,
	checkout,
};
