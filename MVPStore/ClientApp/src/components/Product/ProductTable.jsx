import React from 'react';
import { Table } from 'semantic-ui-react';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';
import NumberFormat from 'react-number-format';

const ProductTable = (Props) => {

    const {Products,fetchProducts} = Props;

    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {Products.map((Product) => (
                    <Table.Row key={Product.id}>
	                    <Table.Cell>{Product.name}</Table.Cell>
	                    <Table.Cell>
                            <NumberFormat value={Product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />      
                        </Table.Cell>
                        <Table.Cell>
                            <EditProductModal Product={Product} fetchProducts={fetchProducts}/>
                        </Table.Cell> 
                        <Table.Cell>
                            <DeleteProductModal Product={Product} fetchProducts={fetchProducts}/>
                        </Table.Cell> 				
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}

export default ProductTable;