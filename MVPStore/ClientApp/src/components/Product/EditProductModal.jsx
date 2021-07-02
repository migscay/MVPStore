import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const EditProductModal = (Props) => {

  const {Product,fetchProducts} = Props;

  const [name,setName] = useState(Product.name);
  const [price,setPrice] = useState(Product.price);

  const [open, setOpen] = useState(false);

  const [nameErrors,setNameErrors] = useState({});
  const [priceErrors,setPriceErrors] = useState({});

  const updateProduct = () => {
    axios.put(`products/PutProduct/${Product.id}`, {
      id: Product.id,
      name: name,
      price: price
    })
    .then((res) => {
      fetchProducts();
      setOpen(false);
    }) 
    .catch((err) => {
      formValidation();
    });
  }; 

  const formValidation = () => { 
    const nameErrors = {};
    const priceErrors = {};
    let isValid = true;
    if (name.trim().length < 5) {
      nameErrors.name = "Name should be at least 5 characters.";
      isValid = false;
    } else
    if (name.trim().length > 100) {
      nameErrors.name = "Name cannot be more than 100 characters.";
      isValid = false;
    } 
    if (price < 0) {
      priceErrors.price = "Price cannot be negative.";
      isValid = false;
    } else
    if (price > 99999999.99) {
      nameErrors.name = "Maximum price is 99999999.99.";
      isValid = false;
    } 
    
    setNameErrors(nameErrors);
    setPriceErrors(priceErrors);
    return isValid;
  } 

  return (
    <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<Button color="yellow"><i className="edit icon"></i>Edit</Button>}
    >
      <Modal.Header>Update Product</Modal.Header>
      <Modal.Content>
        <Form>
          <div className='form-group'>
          <Form.Field>
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)}/>
              {Object.keys(nameErrors).map((i) => { 
                return <div style={{color:"red"}}>{nameErrors[i]}</div>
              })}
            </Form.Field>
          </div>
          <div className='form-group'>
            <Form.Field>
              <label>Price</label>
              <input value={price} onChange={(e) => setPrice(e.target.value)}/>
              {Object.keys(priceErrors).map((i) => { 
                return <div style={{color:"red"}}>{priceErrors[i]}</div>
              })}
            </Form.Field>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button color="blue" onClick={updateProduct}><i className="save icon"></i>Update Product</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditProductModal;