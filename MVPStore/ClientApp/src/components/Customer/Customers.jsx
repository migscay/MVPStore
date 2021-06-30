import React, {useEffect,useState} from 'react';
import axios from 'axios';
// import { Button } from 'semantic-ui-react';
import CustomerTable from './CustomerTable';
import CreateCustomerModal from './CreateCustomerModal';

function Customers() {

    const [Customers, setCustomers] = useState([]);

    const fetchCustomers = () => {
        //alert("inside fetchCustomers");
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
            {/* <Button color="blue" onClick={createCustomer}>Create</Button> */}
            <CustomerTable Customers={Customers} fetchCustomers={fetchCustomers}/>
        </div>
    )
}

export default Customers;
