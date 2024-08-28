import axios from "axios";

const baseURL = 'http://localhost:8080/categories/';

export const getAllCategories = () => {
    return axios.get(baseURL);
}