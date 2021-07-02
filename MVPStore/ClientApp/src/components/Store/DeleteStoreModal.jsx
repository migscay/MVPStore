import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const DeleteStoreModal = (Props) => {

  const {Store,fetchStores} = Props;

  const [open, setOpen] = useState(false);

    const deleteStore = () => {
        axios 
        .delete(`/stores/DeleteStore/${Store.id}`)
        .then((res) => {
            fetchStores();
            setOpen(false);
        })
        .catch((err) => {
            fetchStores();
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
      <Modal.Header>Delete Store</Modal.Header>
      <Modal.Content>
      <Form>
        <Form.Field>
            <label>Name</label>
            <input value={Store.name} readOnly/>
        </Form.Field>
        <Form.Field>
            <label>Address</label>
            <input value={Store.address} readOnly/>
        </Form.Field>
      </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button color="red" onClick={deleteStore}>Confirm Delete</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteStoreModal;