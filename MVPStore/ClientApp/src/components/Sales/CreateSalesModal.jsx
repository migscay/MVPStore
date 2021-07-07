import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';

const CreateSalesModal = (Props) => {

  const { Customers, Products, Stores, fetchSales } = Props;
  const [CustomersDropdown, setCustomersDropdown] = useState([]);
  const [ProductsDropdown, setProductsDropdown] = useState([]);
  const [StoresDropdown, setStoresDropdown] = useState([]);
  const [open, setOpen] = useState(false);
  const [sale, setSale] = useState({
    customerId: 0,
    productId: 0,
    storeId: 0,
    dateSold: null
  })
  const [customerErrors,setCustomerErrors] = useState({});
  const [productErrors,setProductErrors] = useState({});
  const [storeErrors,setStoreErrors] = useState({});

  useEffect(() => {
    updateCustomerDropdown();
  }, [Customers]);

  useEffect(() => {
    updateProductDropdown();
  }, [Products]);

  useEffect(() => {
    updateStoreDropdown();
  }, [Stores]);

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

  const createSale = () => {

    axios.post("sales/postsales", {
      customerId: sale.customerId,
      productId: sale.productId,
      storeId: sale.storeId,
      dateSold: moment()
    })
      .then((res) => {
        //reset views
        refreshViews();
      })
      .catch((err) => {
        formValidation();
      });
  };

  const refreshViews = () => {
    fetchSales();
    setSale({
      customerId: 0,
      productId: 0,
      storeId: 0,
      datesold: null
    })
    setCustomerErrors({});
    setProductErrors({});
    setStoreErrors({});
    setOpen(false);
  } 

  const formValidation = () => { 
    const customerErrors = {};
    const productErrors = {};
    const storeErrors = {};
    if (sale.customerId === 0) {
      customerErrors.name = "You must select a customer.";
    } 
    if (sale.productId === 0) {
      productErrors.name = "You must select a product.";
    } 
    if (sale.storeId === 0) {
      storeErrors.name = "You must select a store.";
    } 

    setCustomerErrors(customerErrors);
    setProductErrors(productErrors);
    setStoreErrors(storeErrors);
  } 

  const updateSale = (field, value) => {
    setSale({
      ...sale,
      [field]: value
    })
  }

  useEffect(() => {
    console.log(sale);
  }, [sale])

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="blue"><i className="plus icon"></i>New Sale</Button>}
    >
      <Modal.Header>Create Sale</Modal.Header>
      <Modal.Content>
        <Form>
        <div className='form-group'>
          <Form.Field>
              <label>Date Sold</label>
              <input value={moment().format('MM/DD/YYYY')} readOnly/>
{/* 
              <input type='date' value={new Date()}
                    onChange={(e) => updateSale("dateSold", e.target.value)} 
              /> */}
            </Form.Field>
          </div>
          <div className='form-group'>
            <Form.Field>
              <label>Customer</label>
              <Dropdown
                placeholder='Select Customer'
                fluid
                selection
                options={CustomersDropdown}
                onChange={(event, { value }) => updateSale("customerId", value)}
              /> 
              {Object.keys(customerErrors).map((i) => { 
                return <div style={{color:"red"}}>{customerErrors[i]}</div>
              })}
            </Form.Field>
          </div>
          <div className='form-group'>
            <Form.Field>
              <label>Product</label>
              <Dropdown
                placeholder='Select Product'
                fluid
                selection
                options={ProductsDropdown}
                onChange={(event, { value }) => updateSale("productId", value)}
              /> 
              {Object.keys(productErrors).map((i) => { 
                return <div style={{color:"red"}}>{productErrors[i]}</div>
              })}
            </Form.Field>
          </div>
          <div className='form-group'>
            <Form.Field>
              <label>Store</label>
              <Dropdown
                placeholder='Select Store'
                fluid
                selection
                options={StoresDropdown}
                onChange={(event, { value }) => updateSale("storeId", value)}
              /> 
              {Object.keys(storeErrors).map((i) => { 
                return <div style={{color:"red"}}>{storeErrors[i]}</div>
              })}
            </Form.Field>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={refreshViews}>Cancel</Button>
        <Button color="blue" onClick={createSale}><i className="save icon"></i>Submit</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreateSalesModal;