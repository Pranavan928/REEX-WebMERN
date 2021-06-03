import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from 'reactstrap';
import EmployeeReimburseDetail from './EmployeeReimburseDetail';
import {Grid} from '@material-ui/core';
import Gif from '../../assests/gif.gif';

export default function EmployeeReimbursementData(props) {
  const [rows, setRows] = useState();
  const [rowSelcted, setRowSelected] = useState(false);
  const { managers, reimbursements, transactions, bankDetails } = props;

  const columns = [
    { field: 'createdDate', headerName: 'Created Date', width: 150 },
    { field: 'managerName', headerName: 'Manager Name', width: 130 },
    {
      field: 'bankDetails',
      headerName: 'Bank Details',
      width: 160,
      hide: true,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 130,
    },
    { field: 'updatedDate', headerName: 'Updated Date', width: 160 },
    { field: 'status', headerName: 'Status', width: 160 },
    { field: 'id', headerName: 'id', width: 160, hide: true },
    { field: 'transactionId', hide: true, headerName: 'Status', width: 160 },
    {
      field: '',
      headerName: 'View More',
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          const api = params.api;
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== '__check__' && !!c);
          const thisRow = {};

          fields.forEach((f) => {
            thisRow[f] = params.getValue(f);
          });
          setRows(thisRow);
          return setRowSelected(true);
        };

        return (
          <Button color="primary" onClick={onClick}>
            Click Here
          </Button>
        );
      },
    },
  ];

  const getDate = (realDate) => {
    const datee = new Date(realDate);
    const year = datee.getUTCFullYear();
    const month = datee.getUTCMonth();
    const date = datee.getUTCDate();
    const correctDate = date + '-' + month + '-' + year;
    return correctDate;
  };

  const getManagerName = (id) => {
    let manager = managers.find((m) => m._id === id);
    return manager.name;
  };

  const details = [];
  if (reimbursements && managers) {
    reimbursements.reverse().map((reimbursement) => {
      const data = {
        id: reimbursement._id,
        createdDate: getDate(reimbursement.createdAt),
        managerName: getManagerName(reimbursement.reimbursementBy),
        amount: reimbursement.amount,
        status: reimbursement.status,
        bankDetails: reimbursement.reimbursementAccount,
        updatedDate: getDate(reimbursement.updatedAt),
        transactionId: reimbursement.transactionId,
      };
      details.push(data);
    });
  }

  return (
    <div style={{ height: 400, width: 'auto' }}>
      {details.length > 0 ?
      <>
      {rowSelcted ? (
        <EmployeeReimburseDetail
          rowData={rows}
          transactions={transactions}
          reimbursements={reimbursements}
          bankDetails={bankDetails}
        />
      ) : (
        <React.Fragment>
          <h3>Reimbursement Requests</h3>
          <DataGrid rows={details} columns={columns} pageSize={5} />
        </React.Fragment>
      )}</> :
      <Grid container style={{ textAlign: "center" }}>
          <Grid xs={12} sm={4}></Grid>
          <Grid xs={12} sm={4}>
            <img src={Gif} alt="" style={{ alignItems: "center", paddingTop: 50, paddingBottom: 100 }} />
          </Grid>
          <Grid xs={12} sm={4}></Grid>
        </Grid>}
    </div>
  );
}
