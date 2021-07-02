import React, {useEffect,useState} from 'react';
import axios from 'axios';
import StoreTable from './StoreTable';
import CreateStoreModal from './CreateStoreModal';

function Stores() {

    const [Stores, setStores] = useState([]);

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
    
    useEffect(() => {
        fetchStores();
    },[]);
    
    return (
        <div>
            <CreateStoreModal fetchStores={fetchStores}/>
            <StoreTable Stores={Stores} fetchStores={fetchStores}/>
        </div>
    )
}

export default Stores;
