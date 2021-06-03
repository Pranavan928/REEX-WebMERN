import React from 'react';
import { Button } from 'reactstrap';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';

const AddExpense = () => {
    
    return (
      <div>
        <div className="AddBtn">
            <Link to="/CreateUser">
            <Button style={{backgroundColor:"#fff", color:"#1278B8"}} ><PersonAddIcon style={{width:230, height:100}} /><br/>Create Users</Button>
        </Link>
        </div>   
      </div>
    );
  }

export default AddExpense;