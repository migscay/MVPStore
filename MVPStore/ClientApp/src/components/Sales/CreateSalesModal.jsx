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
  const [customerErrors,setCustomerErrors] = useState({name: ""});
  const [productErrors,setProductErrors] = useState({name: ""});
  const [storeErrors,setStoreErrors] = useState({name: ""});
  const [customerValid,setCustomerValid] = useState(false);
  const [productValid,setProductValid] = useState(false);
  const [storeValid,setStoreValid] = useState(false);

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
      dateSold: moment().format('YYYY-MM-DD')
    })
    .then((res) => {
        //reset views
      refreshViews();
    })
    .catch((err) => {
      alert("Network Error Occurred, check connection") 
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
    setCustomerValid(false);
    setProductValid(false);
    setStoreValid(false);
    setOpen(false);
  } 



  const updateSale = (field, value) => {
  
    setSale({
      ...sale,
      [field]: value
    })

    switch(field) {
      case 'customerId':
        const customerErrors = {};
        setCustomerValid(true);
        if (value === 0) {
          customerErrors.name = "You must select a customer.";
          setCustomerValid(false);
        } else 
        {
          axios 
          .get(`customers/GetCustomer/${value}`)
          .then((res) => {
          })
          .catch((err) => {
            customerErrors.name = "Customer no longer available.";
            setCustomerValid(false);
          });
        }      
        setCustomerErrors(customerErrors);
        break;

      case 'productId':
        const productErrors = {};
        setProductValid(true);
        if (value === 0) {
          productErrors.name = "You must select a product.";
          setProductValid(false);
        } else 
        {
          axios 
          .get(`products/GetProduct/${value}`)
          .then((res) => {
          })
          .catch((err) => {
            productErrors.name = "Product no longer available.";
            setProductValid(false);
          });
        }
        setProductErrors(productErrors);
        break;

      case 'storeId':
        const storeErrors = {};
        setStoreValid(true);
        if (value === 0) {
          storeErrors.name = "You must select a store.";
          setStoreValid(false);
        } else
        {
          axios 
          .get(`stores/GetStore/${value}`)
          .then((res) => {
          })
          .catch((err) => {
            storeErrors.name = "Store no longer available.";
            setStoreValid(false);
          });
        }
        setStoreErrors(storeErrors);
        break;
    }
    
  }

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
        <Button color="blue" onClick={createSale} disabled={!customerValid || !productValid || !storeValid}><i className="save icon"></i>Submit</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreateSalesModal;