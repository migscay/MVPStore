import React, { useState,useEffect } from 'react';
import { Button, Form, Modal, Dropdown} from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';

const EditSaleModal = (Props) => {

  const { Customers, Products, Stores, Sale, fetchSales } = Props;
  const [CustomersDropdown, setCustomersDropdown] = useState([]);
  const [ProductsDropdown, setProductsDropdown] = useState([]);
  const [StoresDropdown, setStoresDropdown] = useState([]);
  const [open, setOpen] = useState(false);
  const [sale, setSale] = useState({
    customerId: Sale.customer.id,
    productId: Sale.product.id,
    storeId: Sale.store.id, 
    dateSold: Sale.dateSold
  })

  useEffect(() => {
    updateCustomerDropdown();
  }, [Customers]);

  useEffect(() => {
    updateProductDropdown();
  }, [Products]);

  useEffect(() => {
    updateStoreDropdown();
  }, [Stores]);

  // useEffect(() => {
  //   updateSale("customerId", Sale.customer.id)
  //   updateSale("productId", Sale.product.id)
  //   updateSale("storeId", Sale.store.id)
  //   updateSale("dateSold", Sale.dateSold)
  // }, [Sale]);

  const updateCustomerDropdown = () => {
    let customersFromApi = Customers.map(customer => {
      return { text: customer.name, value: customer.id, key: customer.id }
    })
    setCustomersDropdown(customersFromApi)
  };

  const updateProductDropdown = () => {
    let productsFromApi = Products.map(product => {
      return { text: product.name, value: product.id, key: product.id }
    })
    setProductsDropdown(productsFromApi)
  };

  const updateStoreDropdown = () => {
    let storesFromApi = Stores.map(store => {
      return { text: store.name, value: store.id, key: store.id }
    })
    setStoresDropdown(storesFromApi)
  };

  const updateSale = (field, value) => {
    setSale({
      ...sale,
      [field]: value
    })
  }

  const editSale = () => {
        axios 
        .put(`sales/PutSales/${Sale.id}`, {
            id: Sale.id,
            customerId: sale.customerId,
            productId: sale.productId,
            storeId: sale.storeId,  
            dateSold: sale.dateSold    
        })
        .then((res) => {
            fetchSales();
            setOpen(false);
        })
        .catch((err) => {
          //formValidation();
        });
    }
    const resetViews = () => {
      setOpen(false);
    } 
  
  return (
    <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<Button color="yellow"><i className="edit icon"></i>Edit</Button>}
    >
      <Modal.Header>Update Sale</Modal.Header>
      <Modal.Content>
      <Form>
        <div className='form-group'>
          <Form.Field>
            <label>Date Sold</label>
            <input value={moment(Sale.dateSold).format('MM/DD/YYYY')} readOnly/>
          </Form.Field>
        </div>
        <div className='form-group'>
          <Form.Field>
            <label>Customer</label>
            <Dropdown
              defaultValue={Sale.customer.id}
              fluid
              selection
              options={CustomersDropdown}
              onChange={(event, { value }) => updateSale("customerId", value)}
            /> 
          </Form.Field>
        </div>
        <div className='form-group'>
          <Form.Field>
            <label>Product</label>
            <Dropdown            
              defaultValue={Sale.product.id}
              fluid
              selection
              options={ProductsDropdown}
              onChange={(event, { value }) => updateSale("productId", value)}
            /> 
          </Form.Field>
        </div>
        <div className='form-group'>
          <Form.Field>
            <label>Store</label>
            <Dropdown
              defaultValue={Sale.store.id}
              fluid
              selection
              options={StoresDropdown}
              onChange={(event, { value }) => updateSale("storeId", value)}
            /> 
          </Form.Field>
        </div>
      </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => resetViews()}>Cancel</Button>
        <Button color="yellow" onClick={editSale}><i className="save icon"></i>Update Sale</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditSaleModal