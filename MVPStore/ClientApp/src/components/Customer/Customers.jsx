import React, {useEffect,useState} from 'react';
import axios from 'axios';
import CustomerTable from './CustomerTable';
import CreateCustomerModal from './CreateCustomerModal';
import { Pagination } from 'semantic-ui-react';
import _ from 'lodash';


function Customers() {

    const [Customers, setCustomers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [paginatedCustomers,setPaginatedCustomers] = useState([]);
    const pageCount = Customers? Math.ceil(Customers.length/pageSize) : 0;
  
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
            setCurrentPage(1);
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
            <Pagination className="d-flex justify-content-center"
                activePage={currentPage}
                totalPages={pageCount}
                onPageChange={(event, data) => paginate(data.activePage)}
            />
        </div>
    )
}

export default Customers;
