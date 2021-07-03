import React, {useEffect,useState} from 'react';
import axios from 'axios';
import SalesTable from './SalesTable';
import CreateSalesModal from './CreateSalesModal';

function Sales() {

    const [Customers, setCustomers] = useState([]);
    const [Sales, setSales] = useState([]);

    useEffect(() => {
        fetchSales();
        fetchCustomers();
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

    return (
        <div>
            <CreateSalesModal Customers={Customers} fetchSales={fetchSales}/>
            <SalesTable Customers={Customers} Sales={Sales} fetchSales={fetchSales}/>
        </div>
    )
}

export default Sales;
