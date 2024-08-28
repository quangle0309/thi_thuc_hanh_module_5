import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import ProductForm from "./ProductForm";
import * as categoryService from "../../services/CategoryService";

export default function ProductCreate() {
    const navigate = useNavigate();
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
        const fetchProduct = async () => {
            try {
                const categoriesRes = await categoryService.getAllCategories()
                setCategories(categoriesRes.data);
            } catch (e) {
                toast.error("Đã có lỗi xảy ra!");
                navigate('/');
            }
        };
        fetchProduct();
    }, []);


    return (
        categories.length > 0 && <ProductForm initialValues={initialValues} categories={categories}></ProductForm>
    )
}