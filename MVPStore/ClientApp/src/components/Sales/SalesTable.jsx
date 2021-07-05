import React from 'react';
import { Table } from 'semantic-ui-react';
import EditSaleModal from './EditSaleModal';
import DeleteSaleModal from './DeleteSaleModal';
import moment from 'moment';

const SalesTable = (Props) => {

    const {Customers, Products, Stores,Sales,fetchSales} = Props;

    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Customer</Table.HeaderCell>
                        <Table.HeaderCell>Product</Table.HeaderCell>
                        <Table.HeaderCell>Store</Table.HeaderCell>
                        <Table.HeaderCell>Date Sold</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {Sales.map((Sale) => (
                    <Table.Row key={Sale.id}>
	                    <Table.Cell>{Sale.customer.name}</Table.Cell>
	                    <Table.Cell>{Sale.product.name}</Table.Cell>
	                    <Table.Cell>{Sale.store.name}</Table.Cell>
	                    <Table.Cell>{moment(Sale.dateSold).format('DD MMM, YYYY')}</Table.Cell>
                        <Table.Cell>
                            <EditSaleModal Customers={Customers} Products={Products} Stores={Stores} Sale={Sale} fetchSales={fetchSales}/>
                        </Table.Cell> 
                        <Table.Cell>
                            <DeleteSaleModal Sale={Sale} fetchSales={fetchSales}/>
                        </Table.Cell> 				
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}

export default SalesTable;