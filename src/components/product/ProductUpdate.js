import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import * as productService from "../../services/ProductService";
import ProductForm from "./ProductForm";
import * as categoryService from "../../services/CategoryService";

export function ProductUpdate() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [initialValues, setInitialValues] = useState({
        name: '',
        productCode: '',
        price: '',
        quantity: '',
        entryDate: '',
        categoryId: 1,
        description: ''
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchBook = async () => {
            if (!id) return;
            try {
                const [categoriesRes, productRes] = await Promise.all([categoryService.getAllCategories(), productService.getProductById(id)]);
                setInitialValues(productRes.data);
                setCategories(categoriesRes.data);
            } catch (e) {
                console.log(e)
                toast.error("Đã có lỗi xảy ra!");
                navigate('/');
            }
        };
        fetchBook();
    }, [id, navigate]);

    return (
        categories.length > 0 && <ProductForm initialValues={initialValues} categories={categories}></ProductForm>
    )
}