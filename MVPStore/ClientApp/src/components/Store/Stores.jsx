import React, {useEffect,useState} from 'react';
import axios from 'axios';
import StoreTable from './StoreTable';
import CreateStoreModal from './CreateStoreModal';
import { Pagination } from 'semantic-ui-react';
import _ from 'lodash';

function Stores() {

    const [Stores, setStores] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [paginatedStores,setPaginatedStores] = useState([]);
    const pageCount = Stores? Math.ceil(Stores.length/pageSize) : 0;
  
    // Change page
    const paginate = (activePage) => {
        setCurrentPage(activePage);
        const startIndex = (activePage - 1) * pageSize;
        const paginatedStores = _(Stores).slice(startIndex).take(pageSize).value();
        setPaginatedStores(paginatedStores);  
    }

    const [loading, setLoading] = useState(false);  

    useEffect(() => {
        fetchStores();
    },[]);

    const fetchStores =  async () => {
        setLoading(true);
        await axios 
        .get("/stores/GetStoreWithSales")
        .then(({data}) => {
            setStores(data); 
            setPaginatedStores(_(data).slice(0).take(pageSize).value());
            setCurrentPage(1);
            setLoading(false);
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
            <CreateStoreModal fetchStores={fetchStores}/>
            <StoreTable Stores={paginatedStores} fetchStores={fetchStores}/>
            <Pagination className="d-flex justify-content-center"
                activePage={currentPage}
                totalPages={pageCount}
                onPageChange={(event, data) => paginate(data.activePage)}
            />
        </div>
    )
}

export default Stores;
