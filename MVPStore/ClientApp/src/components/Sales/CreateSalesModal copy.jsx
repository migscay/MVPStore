import React, { useState,useEffect } from 'react';
import { Button, Form, Modal, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

const CreateSalesModal = (Props) => {

  const {Customers,fetchSales} = Props;
  let [CustomersDropdown] = useState([]);
  const [open, setOpen] = useState(false);
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
    setCustomers();
 },[]);

    const setCustomers = () => {
        // Customers.map(customer => {
        //   setCustomersDropdown(...CustomersDropdown,
        //     {key: customer.id, value: customer.name})
        //   }); 
        //   console.log(`CustomersDropdown ${CustomersDropdown}`);     
        let CustomersDropdown = Customers.map(customer => {
            return {key: customer.id, value: customer.name}
        });
        // console.log(`CustomersDropdown ${CustomersDropdown}`);
        //setCustomersDropdown(customersFromApi);
        //console.log(CustomersDropdown[0]);
    }; 

    const createCustomer = () => {
    axios.post("sales/postsale", {
      // name: name,
      // address: address
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

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="blue"><i className="plus icon"></i>New Sale</Button>}
    >
      <Modal.Header>Create Sale</Modal.Header>
      {Customers.map((Customer) => (
        console.log(`CreateSales ${Customer.id} ${Customer.name}`)
      ))}
      <Modal.Content>
        <Form>
          <div className='form-group'>
            <Form.Field>
              <Dropdown
                placeholder='Select Customer'
                fluid
                selection
                options={dropdownOptions}
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