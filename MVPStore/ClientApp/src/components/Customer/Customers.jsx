import React, {useEffect,useState} from 'react';
import axios from 'axios';
import CustomerTable from './CustomerTable';
import CreateCustomerModal from './CreateCustomerModal';

function Customers() {

    const [Customers, setCustomers] = useState([]);

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
    
    useEffect(() => {
       fetchCustomers();
    },[]);
    
    return (
        <div>
            <CreateCustomerModal fetchCustomers={fetchCustomers}/>
            <CustomerTable Customers={Customers} fetchCustomers={fetchCustomers}/>
        </div>
    )
}

export default Customers;
