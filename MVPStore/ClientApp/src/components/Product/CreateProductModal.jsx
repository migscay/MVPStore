import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';
// import NumberFormat from 'react-number-format';


const CreateProductModal = (Props) => {

  const {fetchProducts} = Props;

  const [name,setName] = useState("");
  const [price,setPrice] = useState(0.00);

  const [open, setOpen] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    price: 0.00
  })

  const [nameErrors,setNameErrors] = useState({});
  const [priceErrors,setPriceErrors] = useState({});

  const [nameValid,setNameValid] = useState(false);
  const [priceValid,setPriceValid] = useState(false);
  const createProduct = () => {
    axios.post("products/postproduct", {
      name: product.name,
      price: product.price
    })
    .then((res) => {
      //reset views
      refreshViews();
    })
    .catch((err) => {
      //formValidation();
      //debugger;
      alert("Network Error Occurred, check connection")
    });
  }; 

  const updateProduct = (field, value) => {
    const fieldErrors = {};
    switch(field) {
      case 'name':
        if (value.trim().length < 5) {
          fieldErrors.name = "Name should be at least 5 characters.";
        } else
        if (value.trim().length > 100) {
          fieldErrors.name = "Name cannot be more than 100 characters.";
        }
        if (Object.entries(fieldErrors).length === 0) {
          setNameErrors({});
          setNameValid(true);
        } else {
          setNameErrors(fieldErrors);
          setNameValid(false)
        }
        break;
      case 'price':
        if (value < 0) {
          fieldErrors.price = "Price cannot be negative.";
        } else
        if (price > 99999999.99) {
          fieldErrors.price = "Maximum price is 99999999.99.";
        } 
        if (Object.entries(fieldErrors).length === 0) {
          setPriceErrors({});
          setPriceValid(true)
        } else {
          setPriceErrors(fieldErrors);
          setPriceValid(false)
        }
    }
    setProduct({
      ...product,
      [field]: value
    })
  }

  const refreshViews = () => {
    fetchProducts();
    setProduct({
      name: "",
      price: 0.00
    })
    setOpen(false);
  } 

  return (
    <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<Button color="blue"><i className="plus icon"></i>New Product</Button>}
    >
      <Modal.Header>Create Product</Modal.Header>
      <Modal.Content>
        <Form>
          <div className='form-group'>
          <Form.Field>
              <label>Name</label>
              <input name='name' placeholder='Enter Product Name' onChange={(e) => updateProduct("name", e.target.value)}/>
              {Object.keys(nameErrors).map((i) => { 
                return <div style={{color:"red"}}>{nameErrors[i]}</div>
              })}
            </Form.Field>
          </div>
          <div className='form-group'>
            <Form.Field>
              <label>Price</label>
              <input name='price' placeholder='Enter Product Price' onChange={(e) => updateProduct("price", e.target.value)}/>
              {Object.keys(priceErrors).map((i) => { 
                return <div style={{color:"red"}}>{priceErrors[i]}</div>
              })}
            </Form.Field>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={refreshViews}>Cancel</Button>
        <Button color="blue" onClick={createProduct} disabled={!nameValid || !priceValid}><i className="save icon"></i>Submit</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreateProductModal;