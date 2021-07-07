import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const CreateCustomerModal = (Props) => {

  const {fetchCustomers} = Props;

  const [open, setOpen] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    address: ""
  })

  const [nameErrors,setNameErrors] = useState({});
  const [addressErrors,setAddressErrors] = useState({});

  const [nameValid,setNameValid] = useState(false);
  const [addressValid,setAddressValid] = useState(false);


  const createCustomer = () => {
    axios.post("customers/postcustomer", {
      name: customer.name,
      address: customer.address
    })
    .then((res) => {
      //reset views
      refreshViews();
    })
    .catch((err) => {
      //formValidation();
    });
  }; 

  const updateCustomer = (field, value) => {
    const fieldErrors = {};
    switch(field) {
      case 'name':
        if (value.trim().length < 5) {
          fieldErrors.name = "Name should be at least 5 characters.";
        } else
        if (value.trim().length > 100) {
          fieldErrors.name = "Name cannot be more than 100 characters.";
        }
        if (Object.entries(fieldErrors).length === 0) {
          setNameErrors({});
          setNameValid(true);
        } else {
          setNameErrors(fieldErrors);
          setNameValid(false)
        }
        break;
      case 'address':
        if (value.trim().length < 5) {
          fieldErrors.address = "Address should be at least 5 characters.";
        } else
        if (value.trim().length > 150) {
          fieldErrors.address = "Address cannot be more than 150 characters.";
        }
        if (Object.entries(fieldErrors).length === 0) {
          setAddressErrors({});
          setAddressValid(true)
        } else {
          setAddressErrors(fieldErrors);
          setAddressValid(false)
        }
    }
    setCustomer({
      ...customer,
      [field]: value
    })
  }

  const refreshViews = () => {
    fetchCustomers();
    setCustomer({
      name: "",
      address: ""
    })
    setNameValid(false)
    setAddressValid(false)
    setOpen(false);
  } 

  return (
    <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<Button color="blue"><i className="plus icon"></i>New Customer</Button>}
    >
      <Modal.Header>Create Customer</Modal.Header>
      <Modal.Content>
        <Form>
          <div className='form-group'>
          <Form.Field>
              <label>Name</label>
              <input name='name' placeholder='Enter Customer Name' onChange={(e) => updateCustomer("name", e.target.value)}/>
              {Object.keys(nameErrors).map((i) => { 
                return <div style={{color:"red"}}>{nameErrors[i]}</div>
              })}
            </Form.Field> 
          </div>
          <div className='form-group'>
            <Form.Field>
              <label>Address</label>
              <input name='address' placeholder='Enter Customer Address' onChange={(e) => updateCustomer("address", e.target.value)}/>
              {Object.keys(addressErrors).map((i) => { 
                return <div style={{color:"red"}}>{addressErrors[i]}</div>
              })}
            </Form.Field>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={refreshViews}>Cancel</Button>
        <Button color="blue" onClick={createCustomer} disabled={!nameValid || !addressValid}><i className="save icon"></i>Submit</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreateCustomerModal;