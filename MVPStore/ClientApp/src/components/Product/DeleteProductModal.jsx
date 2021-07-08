import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const DeleteProductModal = (Props) => {

  const {Product,fetchProducts} = Props;

  const [open, setOpen] = useState(false);

  const deleteProduct = () => {
    axios
    .delete(`/products/DeleteProduct/${Product.id}`)
    .then((res) => {
      fetchProducts();
    })
    .catch((err) => {
      fetchProducts();
    });

    setOpen(false);

  }; 


  return (
    <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<Button color="red"><i className="eraser icon"></i>Delete</Button>}
    >
      <Modal.Header>
        Delete Product
        { Product.sales.length > 0 ? <div style={{color:"red"}}>Cannot delete Product with Sales.</div> : null }
      </Modal.Header>
      <Modal.Content>
        <Form>
          <div className='form-group'>
            <Form.Field>
                <label>Name</label>
                <input value={Product.name} readOnly/>
            </Form.Field>
          </div>
          <div className='form-group'>
            <Form.Field>
                <label>Price</label>
                <input value={Product.price} readOnly/>
            </Form.Field>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button color="red" onClick={deleteProduct} disabled={Product.sales.length > 0}>Confirm Delete</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteProductModal;