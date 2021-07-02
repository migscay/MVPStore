import React, { useState,useEffect } from 'react';
import { Table,Dropdown } from 'semantic-ui-react';
import EditSaleModal from './EditSaleModal';
import DeleteSaleModal from './DeleteSaleModal';

const SalesTable = (Props) => {

    const {Sales,Customers,fetchSales} = Props;
    const [open, setOpen] = useState(false);
    let CustomerList = [];

    useEffect(() => {
        setCustomerList();
    },[]);
    
    const setCustomerList = () => {
        Customers.map(customer => { return {key: customer.id, value: customer.name} }) 
    } 

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
                                placeholder='Select Customer'
                                fluid
                                selection
                                options={CustomerList}
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