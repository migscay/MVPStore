import React, {useEffect,useState} from 'react';
import axios from 'axios';
import ProductTable from './ProductTable';
import CreateProductModal from './CreateProductModal';

function Products() {

    const [Products, setProducts] = useState([]);

    const fetchProducts = () => {
        axios 
        .get("/products/getProduct")
        .then(({data}) => {
            setProducts(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }; 
    
    useEffect(() => {
        fetchProducts();
    },[]);
    
    return (
        <div>
            <CreateProductModal fetchProducts={fetchProducts}/>
            <ProductTable Products={Products} fetchProducts={fetchProducts}/>
        </div>
    )
}

export default Products;
