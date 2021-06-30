import React from 'react';
import { Table } from 'semantic-ui-react';
import EditCustomerModal from './EditCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';

const CustomerTable = (Props) => {

    const {Customers,fetchCustomers} = Props;

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
                    {Customers.map((Customer) => (
                    <Table.Row key={Customer.id}>
	                    <Table.Cell>{Customer.name}</Table.Cell>
	                    <Table.Cell>{Customer.address}</Table.Cell>	
                        <Table.Cell>
                            <EditCustomerModal Customer={Customer} fetchCustomers={fetchCustomers}/>
                        </Table.Cell> 
                        <Table.Cell>
                            <DeleteCustomerModal Customer={Customer} fetchCustomers={fetchCustomers}/>
                        </Table.Cell> 				
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}

export default CustomerTable;