import './App.css';
import ProductList from "./components/product/ProductList";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProductCreate from "./components/product/ProductCreate";
import {ProductUpdate} from "./components/product/ProductUpdate";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<ProductList/>}/>
                    <Route path="/add" element={<ProductCreate/>}/>
                    <Route path="/update/:id" element={<ProductUpdate/>}/>
                </Routes>
                <ToastContainer/>
            </div>
        </Router>
    );
}

export default App;
