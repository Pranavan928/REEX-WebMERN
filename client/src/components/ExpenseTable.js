import React from 'react';
import { Button } from 'reactstrap';
import { DataGrid } from '@material-ui/data-grid';
import {Grid} from '@material-ui/core';
import Gif from '../assests/gif.gif';

export default function ExpenseTable(props) {
  const { managers, transactions } = props;
  const columns = [
    { field: 'submissionDate', headerName: 'Submission Date', width: 161 },
    { field: 'managerName', headerName: 'Manager Name', width: 151 },
    { field: 'category', headerName: 'Category', width: 110 },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 160 },
    { field: 'transactionDate', headerName: 'Transaction Date', width: 161 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 110,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
    },
    {
      field: 'receiptUrl',
      headerName: 'receiptUrl',
      width: 0,
      hide: true,
    },
    {
      field: '',
      headerName: 'Receipt',
      sortable: false,
      width: 120,
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

          return window.open(thisRow.receiptUrl, '_blank');
        };

        return (
          <Button color="primary" onClick={onClick}>
            View
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
  if (transactions && managers) {
    transactions.reverse().map((transaction) => {
      const data = {
        id: transaction._id,
        submissionDate: getDate(transaction.createdAt),
        managerName: getManagerName(transaction.managerIncharge),
        category: transaction.category,
        paymentMethod: transaction.paymentMethod,
        transactionDate: getDate(transaction.transactionDate),
        amount: transaction.amount,
        status: transaction.status,
        receiptUrl: transaction.receiptUrl,
      };
      details.push(data);
    });
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h3>Expense History</h3>
      {details.length > 0 ? (
        <DataGrid rows={details} columns={columns} pageSize={5} />
      ) : <Grid container style={{textAlign:"center"}}>
      <Grid xs={12} sm={4}></Grid>
      <Grid xs={12} sm={4}>
        <img src={Gif} alt="" style={{ alignItems: "center", paddingTop: 50, paddingBottom: 100 }} />
      </Grid>
      <Grid xs={12} sm={4}></Grid>
    </Grid>}
    </div>
  );
}
