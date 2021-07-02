import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const EditStoreModal = (Props) => {

  const {Store,fetchStores} = Props;

  const [name,setName] = useState(Store.name);
  const [address,setAddress] = useState(Store.address);
  const [open, setOpen] = useState(false);
  const [nameErrors,setNameErrors] = useState({});
  const [addressErrors,setAddressErrors] = useState({});

    const updateStore = () => {
        axios 
        .put(`stores/PutStore/${Store.id}`, {
            id: Store.id,
            name: name,
            address: address  
        })
        .then((res) => {
            fetchStores();
            setOpen(false);
        })
        .catch((err) => {
          formValidation();
        });
    }

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
  
    const resetViews = () => {
      setName(Store.name)
      setAddress(Store.address)
      setNameErrors({});
      setAddressErrors({});
      setOpen(false);
    } 
  
  return (
    <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<Button color="yellow"><i className="edit icon"></i>Edit</Button>}
    >
      <Modal.Header>Update Customer</Modal.Header>
      <Modal.Content>
      <Form>
        <Form.Field>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)}/>
            {Object.keys(nameErrors).map((i) => { 
                return <div style={{color:"red"}}>{nameErrors[i]}</div>
              })}
        </Form.Field>
        <Form.Field>
            <label>Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)}/>
            {Object.keys(addressErrors).map((i) => { 
                return <div style={{color:"red"}}>{addressErrors[i]}</div>
              })}
        </Form.Field>
      </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => resetViews()}>Cancel</Button>
        <Button color="yellow" onClick={updateStore}><i className="save icon"></i>Update Store</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditStoreModal;