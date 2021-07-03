import React, {useEffect,useState} from 'react';
import axios from 'axios';
import SalesTable from './SalesTable';
import CreateSalesModal from './CreateSalesModal';

function Sales() {

    const [Sales, setSales] = useState([]);


    useEffect(() => {
        fetchSales();
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

    return (
        <div>
            <CreateSalesModal fetchSales={fetchSales}/>
            <SalesTable Sales={Sales} fetchSales={fetchSales}/>
        </div>
    )
}

export default Sales;
