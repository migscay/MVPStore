import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const CreateStoreModal = (Props) => {

  const {fetchStores} = Props;

  const [name,setName] = useState("");
  const [address,setAddress] = useState("");

  const [open, setOpen] = useState(false);

  const [nameErrors,setNameErrors] = useState({});
  const [addressErrors,setAddressErrors] = useState({});

  const createStore = () => {
    axios.post("stores/poststore", {
      name: name,
      address: address
    })
    .then((res) => {
      //reset views
      refreshViews();
    })
    .catch((err) => {
      formValidation();
    });
  }; 

  const formValidation = () => { 
    const nameErrors = {};
    const addressErrors = {};
    let isValid = true;
    if (name.trim().length < 5) {
      nameErrors.name = "Name should be at least 5 characters.";
      isValid = false;
    } else
    if (name.trim().length > 100) {
      nameErrors.name = "Name cannot be more than 100 characters.";
      isValid = false;
    } 
    if (address.trim().length < 5) {
      addressErrors.address = "Address should be at least 5 characters.";
      isValid = false;
    } else
    if (address.trim().length > 150) {
      addressErrors.address = "Address cannot be more than 150 characters.";
      isValid = false;
    }
    
    setNameErrors(nameErrors);
    setAddressErrors(addressErrors);
    return isValid;
  } 

  const refreshViews = () => {
    fetchStores();
    setName("");
    setAddress("");
    setNameErrors({});
    setAddressErrors({});
    setOpen(false);
  } 

  return (
    <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<Button color="blue"><i className="plus icon"></i>New Store</Button>}
    >
      <Modal.Header>Create Store</Modal.Header>
      <Modal.Content>
        <Form>
          <div className='form-group'>
          <Form.Field>
              <label>Name</label>
              <input name='name' placeholder='Enter Store Name' onChange={(e) => setName(e.target.value)}/>
              {Object.keys(nameErrors).map((i) => { 
                return <div style={{color:"red"}}>{nameErrors[i]}</div>
              })}
            </Form.Field>
          </div>
          <div className='form-group'>
            <Form.Field>
              <label>Address</label>
              <input name='address' placeholder='Enter Store Address' onChange={(e) => setAddress(e.target.value)}/>
              {Object.keys(addressErrors).map((i) => { 
                return <div style={{color:"red"}}>{addressErrors[i]}</div>
              })}
            </Form.Field>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={refreshViews}>Cancel</Button>
        <Button color="blue" onClick={createStore}><i className="save icon"></i>Submit</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreateStoreModal;