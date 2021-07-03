import React, { useState,useEffect } from 'react';
import { Table,Dropdown } from 'semantic-ui-react';
import EditSaleModal from './EditSaleModal';
import DeleteSaleModal from './DeleteSaleModal';
import axios from 'axios';


const SalesTable = (Props) => {

    const {Customers,Sales,fetchSales} = Props;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log(Customers);
        console.log(Sales);
    },[]);


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