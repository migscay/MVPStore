import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';
import FormErrors  from '../FormErrors';

const CreateCustomerModal = (Props) => {

  const {fetchCustomers} = Props;

  const [name,setName] = useState();
  const [address,setAddress] = useState();

  const [open, setOpen] = useState(false);

  const [formErrors,setFormErrors] = useState({name:"",address:""});
  const [nameValid,setNameValid] = useState(false);
  const [addressValid,setAddressValid] = useState(false);
  const [formValid,setFormValid] = useState(false);

  const createCustomer = () => {
      axios.post("customers/postcustomer", {
          name: name,
          address: address
      })
      .then((res) => {
        console.log(res.data);
        fetchCustomers();
        setName("");
        setAddress("");
        setOpen(false);
    })
    .catch((err) => {
        //alert(err.message);
        console.log(err);
    });

  }; 

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    alert(`name: ${name} value: ${value}`);
    setFormErrors({[name]: value},
                  () => { validateField(name, value) });
    console.log(`after validateField ${formErrors}`);
  }

  const validateField = (fieldName, value) => {
    alert('inside validateField');

    let fieldValidationErrors = formErrors;
    // let nameValid = nameValid;
    // let addressValid = addressValid;

    // {console.log(`fieldName ${fieldName}`)}
    // {console.log(`value ${value}`)}

    if (fieldName === 'name') {
        setNameValid(value.length >= 2 && value.length <=100);
        fieldValidationErrors.name = nameValid ? '' : ' is invalid';
    } else 
      if (fieldName === 'address') {
          setAddressValid(value.length >= 5 && value.length <=150);
          fieldValidationErrors.address = addressValid ? '': ' is too short';
      }

    console.log(`fieldValidationErrors ${formErrors}`);
    // console.log(`before ${formErrors.name}`)
    alert('about to setFormErrors');
    setFormErrors({formErrors: fieldValidationErrors});
      // nameValid: nameValid,
      // addressValid: addressValid
    validateForm();
    // console.log(`after ${formErrors.name}`)
  }

  const validateForm = () => {
    setFormValid({formValid: nameValid && addressValid});
  }

  const errorClass = (error) => {
    return(error.length === 0 ? '' : 'has-error');
  }

  return (
    <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    // destroy={destroy}
    trigger={<Button color="blue"><i className="plus icon"></i>Create</Button>}
    >
      <Modal.Header>Create Customer</Modal.Header>
      {/* {console.log(formErrors)} */}
      <Modal.Content>
        <div className="panel panel-default">
          <FormErrors formErrors={formErrors} />
        </div>
        <Form>
          {/* <div className={`form-group ${formErrors.name.length === 0 ? '' : 'has-error'}`}> */}
          <div className='form-group'>
          <Form.Field>
              <label>Name</label>
              <input name='name' placeholder='Enter Customer Name' onChange={(e) => setName(e.target.value)}/>
            </Form.Field>
          </div>
          {/* <div className={`form-group ${formErrors.address.length === 0 ? '' : 'has-error'}`}> */}
          <div className='form-group'>
            <Form.Field>
              <label>Address</label>
              <input name='address' placeholder='Enter Customer Address' onChange={(e) => setAddress(e.target.value)}/>
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

export default CreateCustomerModal