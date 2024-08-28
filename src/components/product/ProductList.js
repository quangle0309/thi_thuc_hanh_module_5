import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as productService from "../../services/ProductService";
import * as categoryService from "../../services/CategoryService";
import { Modal, Button } from 'react-bootstrap';
import {format} from 'date-fns';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = async (name, category) => {
        try {
            const { data } = await productService.getAllProducts(name, category);
            setProducts(data);
        } catch {
            toast.error("Đã có lỗi xảy ra!");
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await categoryService.getAllCategories();
            setCategories(data);
        } catch {
            toast.error("Không thể tải danh mục!");
        }
    };

    useEffect(() => {
        fetchProducts(name, category);
    }, [name, category]);

    useEffect(() => {
        fetchCategories();
    }, []);


    const handleDelete = async (productId) => {
        try {
            await productService.deleteProduct(productId);
            toast.success("Xóa sản phẩm thành công!", {theme: "colored"});
            setProducts(products.filter(product => product.id !== productId));
        } catch {
            toast.error("Đã có lỗi xảy ra!");
        }
    };

    const handleShowModal = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const confirmDelete = () => {
        if (selectedProduct) {
            handleDelete(selectedProduct.id);
            handleCloseModal();
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy');
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Quản lý sản phẩm</h1>
            <div className="p-5 rouded-3 shadow">
                <Link to="/add" className="btn btn-success mb-3">Thêm sản phẩm</Link>

                <div className="d-flex justify-content-between mb-3">
                    <select
                        className="form-select w-25"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Chọn loại sản phẩm</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <input
                        className="form-control w-25"
                        type="search"
                        placeholder="Nhập tên sản phẩm..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                {products.length > 0 ? (
                    <table className="table table-bordered align-middle">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã Sản Phẩm</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Loại Sản Phẩm</th>
                            <th>Giá Bán</th>
                            <th>Số Lượng</th>
                            <th>Ngày Nhập</th>
                            <th>Hành Động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.productCode}</td>
                                <td>{product.name}</td>
                                <td>{product.category.name}</td>
                                <td>{formatCurrency(product.price)}</td>
                                <td>{product.quantity}</td>
                                <td>{formatDate(product.entryDate)}</td>
                                <td>
                                    <Link to={`/update/${product.id}`} className="btn btn-sm btn-primary me-2">Chỉnh
                                        sửa</Link>
                                    <button onClick={() => handleShowModal(product)} className="btn btn-sm btn-danger">
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (<h3 className="text-center mt-5">Không có sản phẩm</h3>)}
            </div>

            <Modal show={!!selectedProduct} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa sản phẩm <strong>{selectedProduct?.name}</strong> không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductList;
