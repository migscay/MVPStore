import React, { useState,useEffect } from 'react';
import { Table,Dropdown } from 'semantic-ui-react';
import EditSaleModal from './EditSaleModal';
import DeleteSaleModal from './DeleteSaleModal';
import axios from 'axios';


const SalesTable = (Props) => {

    const {Sales,fetchSales} = Props;
    const [open, setOpen] = useState(false);
    const [Customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    },[]);
    
    const fetchCustomers = () => {
        axios 
        .get("/customers/getCustomer")
        .then(({data}) => {
            let customersFromApi = data.map(customer => {
                return { value: customer.name, display: customer.name}
            })             
            console.log(customersFromApi);
            setCustomers([{value: '', display: 'Select Customer'}].concat(customersFromApi));
            console.log(Customers);
        })
        .catch((err) => {
            console.log(err);
        });
    }; 


    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    
                    {/* {CustomerList = Customers.map(customer => 
                        { return {key: customer.id, value: customer.name} })} */}

                    <Table.Row>
                        <Table.Cell>
                            <Dropdown
                                //placeholder='Select Customer'
                                fluid
                                selection
                                options={Customers}
                            />
                        </Table.Cell>

                        {/* <Table.Cell>
                            <Dropdown
                                placeholder='Select Customer'
                                fluid
                                selection
                                options={Customers}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Dropdown
                                placeholder='Select Product'
                                fluid
                                selection
                                options={Products}
                            />
                        </Table.Cell> */}
                        {/* <Table.Cell>
                            <EditSaleModal Customer={Customer} fetchSales={fetchSales}/>
                        </Table.Cell> 
                        <Table.Cell>
                            <DeleteSaleModal Customer={Customer} fetchSales={fetchSales}/>
                        </Table.Cell> 				 */}
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    )
}

export default SalesTable;