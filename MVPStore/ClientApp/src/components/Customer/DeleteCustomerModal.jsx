import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const DeleteCustomerModal = (Props) => {

  const {Customer,fetchCustomers} = Props;

  const [open, setOpen] = useState(false);

    const deleteCustomer = () => {
        axios 
        .delete(`/customers/DeleteCustomer/${Customer.id}`)
        .then((res) => {
            fetchCustomers();
            setOpen(false);
        })
        .catch((err) => {
            fetchCustomers();
            setOpen(false);
        });
    }

  return (
    <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<Button color="red"><i className="eraser icon"></i>Delete</Button>}
    >
      <Modal.Header>
        Delete Customer
        { Customer.sales.length > 0 ? <div style={{color:"red"}}>Cannot delete Customer with Sales.</div> : null }
      </Modal.Header>
      <Modal.Content>
      <Form>
        <Form.Field>
            <label>Name</label>
            <input value={Customer.name} readOnly/>
        </Form.Field>
        <Form.Field>
            <label>Address</label>
            <input value={Customer.address} readOnly/>
        </Form.Field>
      </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button color="red" onClick={deleteCustomer} disabled={Customer.sales.length > 0}>Confirm Delete</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteCustomerModal;