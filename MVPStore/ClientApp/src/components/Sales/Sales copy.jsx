import React, {useEffect,useState} from 'react';
import axios from 'axios';
import SalesTable from './SalesTable';
import CreateSalesModal from './CreateSalesModal';

function Sales() {

    const [Sales, setSales] = useState([]);
    const [Customers, setCustomers] = useState([]);
    const [Products, setProducts] = useState([]);
    //const [Stores, setProducts] = useState({});

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
            setProductsDropdown(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }; 

    // const fetchStores = () => {
    //     axios 
    //     .get("/stores/getStore")
    //     .then(({data}) => {
    //         setStoresDropdown(data);
    //         setStores(data);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // }; 

    // const setCustomersDropdown = (data) => {
    //     let customersFromApi = data.map(customer => {
    //         return {key: customer.id, value: customer.name}
    //     });
    //     console.log(customersFromApi);
    //     setCustomers(customersFromApi);
    //     console.log(Customers);
    // }; 

    const setProductsDropdown = (data) => {
        let productsFromApi = data.map(product => {
            return {key: product.id, value: product.name}
        });
        console.log(productsFromApi);
        setProducts(productsFromApi);
        console.log(Products);
    }; 

    useEffect(() => {
       fetchSales();
       fetchCustomers();
       fetchProducts();
       console.log(Customers);
    },[]);

     return (
        <div>
            <CreateSalesModal fetchSales={fetchSales}/>
            <SalesTable Sales={Sales} Customers={Customers} Products={Products}  fetchSales={fetchSales}/>
        </div>
    )
}

export default Sales;
