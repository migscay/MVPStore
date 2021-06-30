import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const EditCustomerModal = (Props) => {

  const {Customer,fetchCustomers} = Props;

  const [name,setName] = useState(Customer.name);
  const [address,setAddress] = useState(Customer.address);
  const [open, setOpen] = useState(false);

    const updateCustomer = () => {
        axios 
        .put(`customers/PutCustomer/${Customer.id}`, {
            id: Customer.id,
            name: name,
            address: address  
        })
        .then((res) => {
            fetchCustomers();
            setOpen(false);
        })
        .catch((err) => {
            console.log(err);
        });
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
        </Form.Field>
        <Form.Field>
            <label>Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)}/>
        </Form.Field>
      </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button color="yellow" onClick={updateCustomer}><i class="save icon"></i>Update Customer</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditCustomerModal