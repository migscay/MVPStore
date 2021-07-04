import React, {useEffect,useState} from 'react';
import axios from 'axios';
import SalesTable from './SalesTable';
import CreateSalesModal from './CreateSalesModal';

function Sales() {

    const [Customers, setCustomers] = useState([]);
    const [Sales, setSales] = useState([]);
    const [Products, setProducts] = useState([]);
    const [Stores, setStores] = useState([]);

    useEffect(() => {
        fetchSales();
        fetchCustomers();
        fetchProducts();
        fetchStores();
    },[]);
 
    const fetchSales = () => {
        axios 
        .get("/sales/getSales")
        .then(({data}) => {
            setSales(data);
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

    return (
        <div>
            <CreateSalesModal Customers={Customers} Products={Products} Stores={Stores} fetchSales={fetchSales}/>
            <SalesTable Customers={Customers} Products={Products} Stores={Stores} Sales={Sales} fetchSales={fetchSales}/>
        </div>
    )
}

export default Sales;
