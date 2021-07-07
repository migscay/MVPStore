import React, {useEffect,useState} from 'react';
import axios from 'axios';
import ProductTable from './ProductTable';
import CreateProductModal from './CreateProductModal';
import { Pagination } from 'semantic-ui-react';
import _ from 'lodash';

function Products() {

    const [Products, setProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [paginatedProducts,setPaginatedProducts] = useState([]);
    const pageCount = Products? Math.ceil(Products.length/pageSize) : 0;
  
    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedProducts = _(Products).slice(startIndex).take(pageSize).value();
        setPaginatedProducts(paginatedProducts);  
    }

    const [loading, setLoading] = useState(false);  


    const fetchProducts = () => {
        axios 
        .get("/products/getProduct")
        .then(({data}) => {
            setProducts(data);
            setPaginatedProducts(_(data).slice(0).take(pageSize).value());
            setCurrentPage(1);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }; 
    
    useEffect(() => {
        fetchProducts();
    },[]);
    
    { if (loading)
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <CreateProductModal fetchProducts={fetchProducts}/>
            <ProductTable Products={paginatedProducts} fetchProducts={fetchProducts}/>
            <Pagination className="d-flex justify-content-center"
                activePage={currentPage}
                totalPages={pageCount}
                onPageChange={(event, data) => paginate(data.activePage)}
            />
        </div>
    )
}

export default Products;
