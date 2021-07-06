import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';
// import NumberFormat from 'react-number-format';


const CreateProductModal = (Props) => {

  const {fetchProducts} = Props;

  const [name,setName] = useState("");
  const [price,setPrice] = useState(0.00);

  const [open, setOpen] = useState(false);

  const [nameErrors,setNameErrors] = useState({});
  const [priceErrors,setPriceErrors] = useState({});

  const createProduct = () => {
    axios.post("products/postproduct", {
      name: name,
      price: price
    })
    .then((res) => {
      //reset views
      refreshViews();
    })
    .catch((err) => {
      formValidation();
      //debugger;
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
      priceErrors.price = "Maximum price is 99999999.99.";
      isValid = false;
    } 
    
    setNameErrors(nameErrors);
    setPriceErrors(priceErrors);
    return isValid;
  } 

  const refreshViews = () => {
    fetchProducts();
    setName("");
    setPrice(0.00);
    setNameErrors({});
    setPriceErrors({});
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
              <input name='name' placeholder='Enter Product Name' onChange={(e) => setName(e.target.value)}/>
              {Object.keys(nameErrors).map((i) => { 
                return <div style={{color:"red"}}>{nameErrors[i]}</div>
              })}
            </Form.Field>
          </div>
          <div className='form-group'>
            <Form.Field>
              <label>Price</label>
              {/* <NumberFormat placeholder='0.00' thousandSeparator={true} prefix={'$'} onChange={(e) => setPrice(e.target.value)} /> */}
              <input name='price' placeholder='Enter Product Price' onChange={(e) => setPrice(e.target.value)}/>
              {Object.keys(priceErrors).map((i) => { 
                return <div style={{color:"red"}}>{priceErrors[i]}</div>
              })}
            </Form.Field>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={refreshViews}>Cancel</Button>
        <Button color="blue" onClick={createProduct}><i className="save icon"></i>Submit</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreateProductModal;