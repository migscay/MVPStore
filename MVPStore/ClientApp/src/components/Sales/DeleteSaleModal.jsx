import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';

const DeleteSaleModal = (Props) => {

  const {Sale,fetchSales} = Props;

  const [open, setOpen] = useState(false);

    const deleteSale = () => {
        axios 
        .delete(`/sales/DeleteSales/${Sale.id}`)
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
      <Modal.Header>Delete Sale</Modal.Header>
      <Modal.Content>
      <Form>
        <Form.Field>
            <label>Customer</label>
            <input value={Sale.customer.name} readOnly/>
        </Form.Field>
        <Form.Field>
            <label>Product</label>
            <input value={Sale.product.name} readOnly/>
        </Form.Field>
        <Form.Field>
            <label>Store</label>
            <input value={Sale.store.name} readOnly/>
        </Form.Field>
        <Form.Field>
            <label>Date Sold</label>
            <input value={moment(Sale.dateSold).format('DD/MM/YYYY')} readOnly/>
        </Form.Field>
      </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button color="red" onClick={deleteSale}>Confirm Delete</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteSaleModal;