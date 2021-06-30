import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';
import FormErrors  from '../FormErrors';

const CreateCustomerModal = (Props) => {

  const {fetchCustomers} = Props;
  const [open, setOpen] = useState(false);
  const [fields,setFields] = useState({});
  const [errors,setErrors] = useState({});
  const [name,setName] = useState("");
  const [address,setAddress] = useState("");

  // const [formErrors,setFormErrors] = useState({name:"",address:""});
  // const [nameValid,setNameValid] = useState(true);
  // const [addressValid,setAddressValid] = useState(true);
  // const [nameMessage,setNameMessage] = useState("");
  // const [addressMessage,setAddressMessage] = useState("");
  // const [formValid,setFormValid] = useState(true);

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
        //setFormErrors({name:"",address:""});
        setOpen(false);
    })
    .catch((err) => {
        alert(err.message);
        //validateUserInput();
    });

  }; 

  const handleChange = (e) => {         
    //let fields = fields;
    const field = e.target.name;
    const value = e.target.value;
    //fields[field] = e.target.value;        
    setFields({[field]: value});
    console.log(fields);
  }

  // const validateUserInput = () => {
  //   // const name = e.target.name;
  //   // const value = e.target.value;
  //   // alert(`name: ${name} value: ${value}`);

  //   validateField("name");
  //   validateField("address");
  //   alert(`name: ${nameMessage} address ${addressMessage}`);
  //   setFormErrors({name: nameMessage,address: addressMessage});
  //   console.log(`formErrors ${formErrors}`);

  //   // setFormErrors({[name]: value},
  //   //               () => { validateField(name, value) });
  //   // console.log(`after validateField ${formErrors}`);
  // }

  // const validateField = (fieldName) => {
  //   //let value={fieldName};
  //   //alert(`inside validateField ${fieldName} ${value}`);

  //   //let fieldValidationErrors = {};
  //   let nameValid = false;
  //   let addressValid = false;

  //   // {console.log(`fieldName ${fieldName}`)}
  //   // {console.log(`value ${value}`)}

  //   if (fieldName === 'name') {
  //       // let fieldValid = true;
  //       // console.log(`fieldValid ${fieldValid}`) 
  //       alert(`name: ${name}`) 
  //       nameValid = name.length >= 2 && name.length <= 100;
  //       alert(`nameValid ${name.length >= 2 && name.length <= 100}`);
  //       alert(`nameValid ${nameValid}`);
  //       if (nameValid) {
  //         setNameMessage('');
  //       }
  //       else {
  //         console.log('setting message');
  //         setNameMessage(' Must be at least 2 characters.');
  //         console.log(`nameMessage ${nameMessage}`);
  //       }
  //       // console.log(`fieldValidationErrors.name ${fieldValidationErrors.name}`)
  //       // console.log(`nameValid ${nameValid}`)
  //       // console.log(`addressValid ${addressValid}`)
  //       // console.log(`value.length >= 2 && value.length <= 100 ${value.length >= 2 && value.length <= 100}`);    
  //   } else 
  //     if (fieldName === 'address') {
  //         setAddressValid(address.length >= 5 && address.length <= 150);
  //         alert(`addressValid ${addressValid}`);
  //         alert(`address ${address}`);
  //         setAddressMessage(addressValid ? '': ' Must be from 5 to 150 characters');
  //         // console.log(`fieldValidationErrors.address ${fieldValidationErrors.address}`)
  //         // console.log(`addressValid ${addressValid}`)
  //         // console.log(`value.length >= 5 && value.length <= 150 ${value.length >= 5 && value.length <= 150}`);  
  //     }

  //   // alert(`fieldValidationErrors.name ${fieldValidationErrors.name}`);
  //   // alert(`fieldValidationErrors.address ${fieldValidationErrors.address}`);
  //   // console.log(`before ${formErrors.name}`)
  //   // alert('about to setFormErrors');
  //   setFormErrors({name: nameMessage,address: addressMessage});
  //     // nameValid: nameValid,
  //     // addressValid: addressValid
  //   // validateForm();
  // }

  // const validateForm = () => {
  //   setFormValid({formValid: nameValid && addressValid});
  // }

  // const errorClass = (error) => {
  //   return(error.length === 0 ? '' : 'has-error');
  // }

  return (
    <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    // destroy={destroy}
    trigger={<Button color="blue"><i className="plus icon"></i>Create</Button>}
    >
      <Modal.Header>Create Customer</Modal.Header>
      <Modal.Content>
        {/* <div className="panel panel-default">
          <FormErrors formErrors={formErrors} />
        </div> */}
        <Form>
          {/* <div className={`form-group ${formErrors.name.length === 0 ? '' : 'has-error'}`}> */}
          <div className='form-group'>
          <Form.Field>
              <label>Name</label>
              <input name='name' placeholder='Enter Customer Name' onChange={(e) => handleChange(e)}/>
              {/* <span style={{color:"red"}}>{formErrors.name}</span> */}
            </Form.Field>
          </div>
          {/* <div className={`form-group ${formErrors.address.length === 0 ? '' : 'has-error'}`}> */}
          <div className='form-group'>
            <Form.Field>
              <label>Address</label>
              <input name='address' placeholder='Enter Customer Address' onChange={(e) => handleChange(e)}/>
              {/* <span style={{color:"red"}}>{formErrors.address}</span> */}
            </Form.Field>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button color="blue" onClick={createCustomer} ><i className="save icon"></i>Submit</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreateCustomerModal