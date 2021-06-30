import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const DeleteCustomerModal = (Props) => {

  const {Customer,fetchCustomers} = Props;

  // const [name,setName] = useState();
  // const [address,setAddress] = useState();
  const [open, setOpen] = useState(false);

  // useEffect(()=>{
  //   alert('delete modal reload!')
  // },[])

    const deleteCustomer = () => {
        axios 
        .delete(`/customers/DeleteCustomer/${Customer.id}`)
        .then((res) => {
            fetchCustomers();
            setOpen(false);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            //alert('record not found');
            fetchCustomers();
            setOpen(false);
          } else {
            fetchCustomers();
            setOpen(false);
          }
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

export default DeleteCustomerModal