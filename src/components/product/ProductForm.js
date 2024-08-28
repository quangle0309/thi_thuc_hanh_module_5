import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';
import * as productService from "../../services/ProductService";

const ProductForm = ({initialValues, categories}) => {
    const navigate = useNavigate();
    const id = initialValues.id;

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required('Tên không được bỏ trống!')
                .min(3, 'Tên không được ít hơn 3 ký tự!'),
            price: Yup.number().required('Giá sản phẩm không được bỏ trống!')
                .min(10000, 'Giá sản phẩm ít nhất là 10.000!')
                .max(1000000000, 'Giá sản phẩm tối đa là 1.000.000.000!'),
            quantity: Yup.number().required('Số lượng không được bỏ trống!')
                .min(1, 'Số lượng phải lớn hơn 0!')
                .max(10000, 'Số lượng tối đa là 10.000!'),
            productCode : Yup.string().required('Mã sản phẩm không được bỏ trống!').matches(/^PROD-\d{4}$/, 'Mã sản phẩm có định dạng "PROD-xxxx", với xxxx là các chữ số!'),
            entryDate : Yup.date().required('Ngày nhập không được bỏ trống!').max(new Date(), 'Ngày nhập không được lớn hơn ngày hiện tại!'),
            description : Yup.string().required('Mô tả sản phẩm không được bỏ trống!')
        }),
        onSubmit: values => {
            const request = id
                ? productService.updateProduct(id, values)
                : productService.saveProduct(values)

            request
                .then(() => {
                    toast.success(id ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!', {
                        theme: "colored"
                    });
                    navigate('/');
                })
                .catch(error => console.error(error));
        }
    });

    return (
        <div className="container">
            <div className="w-50 mx-auto mt-5">
                <h1 className="text-center mb-4">{id ? 'Chỉnh sửa' : 'Thêm mới'}</h1>
                <div className="shadow p-5 rounded-3">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="productCode" className="form-label">Mã sản phẩm</label>
                            <input
                                id="productCode"
                                name="productCode"
                                type="text"
                                className={`form-control ${formik.touched.productCode && formik.errors.productCode ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.productCode}
                            />
                            {formik.touched.productCode && formik.errors.productCode ? (
                                <div className="invalid-feedback">{formik.errors.productCode}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="invalid-feedback">{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Giá sản phẩm</label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                className={`form-control ${formik.touched.price && formik.errors.price ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                            />
                            {formik.touched.price && formik.errors.price ? (
                                <div className="invalid-feedback">{formik.errors.price}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Số lượng</label>
                            <input type="number"
                                   id="quantity"
                                   name="quantity"
                                   className={`form-control ${formik.touched.quantity && formik.errors.quantity ? 'is-invalid' : ''}`}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleChange}
                                   value={formik.values.quantity}
                            />
                            {formik.touched.quantity && formik.errors.quantity ? (
                                <div className="invalid-feedback">{formik.errors.quantity}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="entryDate" className="form-label">Ngày nhập</label>
                            <input
                                id="entryDate"
                                name="entryDate"
                                type="date"
                                className={`form-control ${formik.touched.entryDate && formik.errors.entryDate ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.entryDate}
                            />
                            {formik.touched.entryDate && formik.errors.entryDate ? (
                                <div className="invalid-feedback">{formik.errors.entryDate}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="categoryId" className="form-label">Loại sản phẩm</label>
                            <select
                                id="categoryId"
                                name="categoryId"
                                className="form-select"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.categoryId}
                            >{
                                categories.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))
                            }</select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Mô tả sản phẩm</label>
                            <input
                                id="description"
                                name="description"
                                type="text"
                                className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                            />
                            {formik.touched.description && formik.errors.description ? (
                                <div className="invalid-feedback">{formik.errors.description}</div>
                            ) : null}
                        </div>
                        <div className="text-end">
                            <Link className="btn btn-danger me-3" to="/">Hủy bỏ</Link>
                            <button type="submit" className="btn btn-primary">{id ? 'Lưu' : 'Thêm'}</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ProductForm;
