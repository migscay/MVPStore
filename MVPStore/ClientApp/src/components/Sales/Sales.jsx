import React, {useEffect,useState} from 'react';
import axios from 'axios';
import SalesTable from './SalesTable';
import CreateSalesModal from './CreateSalesModal';
import { Pagination } from 'semantic-ui-react';
import _ from 'lodash';

function Sales() {

    const [Customers, setCustomers] = useState([]);
    const [Sales, setSales] = useState([]);
    const [Products, setProducts] = useState([]);
    const [Stores, setStores] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [paginatedSales,setPaginatedSales] = useState([]);
    const pageCount = Sales? Math.ceil(Sales.length/pageSize) : 0;
  
    // Change page
    const paginate = (activePage) => {
        setCurrentPage(activePage);
        const startIndex = (activePage - 1) * pageSize;
        const paginatedSales = _(Sales).slice(startIndex).take(pageSize).value();
        setPaginatedSales(paginatedSales);  
    }

    const [loading, setLoading] = useState(false);  

    useEffect(() => {
        fetchSales();
        fetchCustomers();
        fetchProducts();
        fetchStores();
    },[]);
 
    const fetchSales = async () => {
        setLoading(true);
        await axios 
        .get("/sales/getSales")
        .then(({data}) => {
            setSales(data);
            setPaginatedSales(_(data).slice(0).take(pageSize).value());
            setCurrentPage(1);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }; 

    const fetchCustomers = () => {
        axios 
        .get("/customers/getCustomer")
        .then(({data}) => {
            setCustomers(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }; 

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

    const fetchStores = () => {
        axios 
        .get("/stores/getStore")
        .then(({data}) => {
            setStores(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }; 
      
    { if (loading)
        return <h2>Loading...</h2>;
    }
 
    return (
        <div>
            <CreateSalesModal Customers={Customers} Products={Products} Stores={Stores} fetchSales={fetchSales}/>
            <SalesTable Customers={Customers} Products={Products} Stores={Stores} Sales={paginatedSales} fetchSales={fetchSales}/>
            <Pagination className="d-flex justify-content-center"
                activePage={currentPage}
                totalPages={pageCount}
                onPageChange={(event, data) => paginate(data.activePage)}
            />
        </div>
    )
}

export default Sales;
