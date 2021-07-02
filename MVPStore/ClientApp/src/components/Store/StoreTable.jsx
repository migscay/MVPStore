import React from 'react';
import { Table } from 'semantic-ui-react';
import EditStoreModal from './EditStoreModal';
import DeleteStoreModal from './DeleteStoreModal';

const StoreTable = (Props) => {

    const {Stores,fetchStores} = Props;

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
                    {Stores.map((Store) => (
                    <Table.Row key={Store.id}>
	                    <Table.Cell>{Store.name}</Table.Cell>
	                    <Table.Cell>{Store.address}</Table.Cell>	
                        <Table.Cell>
                            <EditStoreModal Store={Store} fetchStores={fetchStores}/>
                        </Table.Cell> 
                        <Table.Cell>
                            <DeleteStoreModal Store={Store} fetchStores={fetchStores}/>
                        </Table.Cell> 				
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}

export default StoreTable;