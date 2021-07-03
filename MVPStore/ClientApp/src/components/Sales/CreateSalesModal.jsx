import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

const CreateSalesModal = (Props) => {

  const { Customers, fetchSales } = Props;
  const [CustomersDropdown, setCustomersDropdown] = useState([]);
  const [open, setOpen] = useState(false);
  const [sale, setSale] = useState({
    customerId: 0,
    productId: 0,
    storeId: 0,
    datesold: null
  })
  const dropdownOptions = [
    {
      label: "The Color Red",
      value: "red",
    },
    {
      label: "The Color Green",
      value: "green",
    },
    {
      label: "The Color Blue",
      value: "blue",
    },
  ]

  useEffect(() => {
    updateCustomerDropdown();
  }, [Customers]);

  const updateCustomerDropdown = () => {
    let customersFromApi = Customers.map(customer => {
      debugger;
      return { text: customer.name, value: customer.id, key: customer.id }
    })
    console.log(customersFromApi);
    setCustomersDropdown(customersFromApi)
    // setCustomers([{value: '', display: '(Select Customer'}].concat(customersFromApi));
    // console.log(Customers);

    // console.log(`CustomersDropdown ${CustomersDropdown}`);     
    //     let CustomersDropdown = Customers.map(customer => {
    //         return {key: customer.id, value: customer.name}
    //     });
    //     console.log(`CustomersDropdown ${CustomersDropdown}`);
    //     setCustomersDropdown(customersFromApi);
    //     console.log(CustomersDropdown[0]);
  };

  const createCustomer = () => {
    axios.post("sales/postsale", {
      customerId: sale.customer,
      productId: sale.productId,
      storeId: sale.storeId,
      dateSold: new Date()
    })
      .then((res) => {
        //reset views
        // refreshViews();
      })
      .catch((err) => {
        // formValidation();
      });
  };

  // const refreshViews = () => {
  //   fetchCustomers();
  //   setName("");
  //   setAddress("");
  //   setNameErrors({});
  //   setAddressErrors({});
  //   setOpen(false);
  // } 

  const updateSale = (field, value) => {
    debugger;
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
      {/* {Customers.map((Customer) => (
        console.log(`CreateSales ${Customer.id} ${Customer.name}`)
      ))} */}
      <Modal.Content>
        <Form>
          <div className='form-group'>
            <Form.Field>
              <Dropdown
                placeholder='Select Customer'
                fluid
                selection
                options={CustomersDropdown}
                onChange={(event, { value }) => updateSale("customerId", value)}

              //   options={[
              //     {
              //       label: "The Color Red",
              //       value: "red",
              //     },
              //     {
              //       label: "The Color Green",
              //       value: "green",
              //     }
              //   ]
              //  }
              />
            </Form.Field>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button color="blue" onClick={createCustomer}><i className="save icon"></i>Submit</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreateSalesModal;