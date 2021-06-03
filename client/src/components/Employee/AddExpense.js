import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, container } from 'reactstrap';
import '../../App.css';
import AddExpenseForm from './AddExpenseForm';
import {Grid} from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';

const AddExpense = () => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <div className="AddBtn">
      <Button style={{backgroundColor:"#fff", color:"#1278B8"}} onClick={toggle}><PostAddIcon style={{width:230, height:100}} /><br/>Add Expenses</Button>
      </div>
      
      <Modal isOpen={modal} toggle={toggle} className="container" style={{paddingTop:40}}>
        <ModalHeader toggle={toggle}>Add Expenses</ModalHeader>
        <Grid container direction="column" alignItems="center" justify="space-around" spacing={1}>
          <br/>
        <AddExpenseForm/>
        </Grid>
      </Modal>
      
    </div>
  );
}

export default AddExpense;