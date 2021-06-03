import React from 'react';
import { Button } from 'reactstrap';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { Link } from 'react-router-dom';

const AddExpense = () => {

  return (
    <div>
      <div className="AddBtn">
        <Link to="/CreateNews">
          <Button style={{ backgroundColor: "#fff", color: "#1278B8" }} ><CreateNewFolderIcon style={{ width: 230, height: 100 }} /><br />Create News</Button>
        </Link>
      </div>
    </div>
  );
}

export default AddExpense;