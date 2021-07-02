import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const EditSaleModal = (Props) => {

  const {Customer,fetchSales} = Props;

  const [open, setOpen] = useState(false);

    const updateSale = () => {
        axios 
        .put(`sales/PutSales/${Customer.id}`, {
            id: Customer.id,
        })
        .then((res) => {
            fetchSales();
            setOpen(false);
        })
        .catch((err) => {
          //formValidation();
        });
    }
    const resetViews = () => {
      setOpen(false);
    } 
  
  return (
    <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<Button color="yellow"><i className="edit icon"></i>Edit</Button>}
    >
      <Modal.Header>Update Sale</Modal.Header>
      <Modal.Content>
      <Form>
      </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => resetViews()}>Cancel</Button>
        <Button color="yellow" onClick={updateSale}><i className="save icon"></i>Update Sale</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditSaleModal