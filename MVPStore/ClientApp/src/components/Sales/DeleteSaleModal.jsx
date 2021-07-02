import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const DeleteSaleModal = (Props) => {

  const {Customer,fetchSales} = Props;

  const [open, setOpen] = useState(false);

    const deleteCustomer = () => {
        axios 
        .delete(`/customers/DeleteCustomer/${Customer.id}`)
        .then((res) => {
            fetchSales();
            setOpen(false);
        })
        .catch((err) => {
            fetchSales();
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
      <Modal.Header>Delete Customer</Modal.Header>
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
        <Button color="red" onClick={deleteCustomer}>Confirm Delete</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteSaleModal;