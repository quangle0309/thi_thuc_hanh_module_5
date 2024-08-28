import axios from "axios";

const baseURL = "http://localhost:8080/products";

export const getAllProducts = (name, category) => {
    let url = `${baseURL}?_expand=category&_sort=name&_order=asc`;
    if (name) url += `&name_like=${name}`;
    if (category) url += `&categoryId=${category}`;
    return axios.get(url);
};

export const deleteProduct = (productId) => {
    return axios.delete(baseURL + "/" + productId)
}

export const updateProduct = (productId, productData) => {
    return axios.put(baseURL + "/" + productId, productData);
}

export const saveProduct = (product) => {
    return axios.post(baseURL, product)
}

export const getProductById = (id) => {
    return axios.get(`${baseURL}/${id}`)
}