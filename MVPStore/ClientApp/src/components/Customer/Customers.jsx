import React, {useEffect,useState} from 'react';
import axios from 'axios';
import CustomerTable from './CustomerTable';
import CreateCustomerModal from './CreateCustomerModal';
import Pagination from '../Pagination';
import _ from 'lodash';


function Customers() {

    const [Customers, setCustomers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [paginatedCustomers,setPaginatedCustomers] = useState([]);
    const pageCount = Customers? Math.ceil(Customers.length/pageSize) : 0;
    const pages = _.range(1,pageCount + 1);
  
    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedCustomers = _(Customers).slice(startIndex).take(pageSize).value();
        setPaginatedCustomers(paginatedCustomers);  
    }

    const [loading, setLoading] = useState(false);  

    const fetchCustomers = () => {
        axios 
        .get("/customers/getCustomer")
        .then(({data}) => {
            setCustomers(data);
            setPaginatedCustomers(_(data).slice(0).take(pageSize).value());
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }; 
    
    useEffect(() => {
       fetchCustomers();
    },[]);
  
    { if (loading)
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <CreateCustomerModal fetchCustomers={fetchCustomers}/>
            <CustomerTable Customers={paginatedCustomers} fetchCustomers={fetchCustomers}/>
            <Pagination pages={pages} currentPage={currentPage} paginate={paginate} />
        </div>
    )
}

export default Customers;
