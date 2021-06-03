import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Grid } from '@material-ui/core';
import Gif from '../../assests/gif.gif';

export default function TopupAccept(props) {
  const { transactions, employees } = props;
  const columns = [
    { field: 'submissionDate', headerName: 'Submission Date', width: 161 },
    { field: 'employeeName', headerName: 'Employee Name', width: 165 },
    { field: 'category', headerName: 'Category', width: 110 },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 160 },
    { field: 'transactionDate', headerName: 'Transaction Date', width: 161 },
    { field: 'updatedDate', headerName: 'Updated Date', width: 151 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 110,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      hide: true,
    },
    {
      field: 'receiptUrl',
      headerName: 'receiptUrl',
      width: 0,
      hide: true,
    },
  ];

  const getDate = (realDate) => {
    const datee = new Date(realDate);
    const year = datee.getUTCFullYear();
    const month = datee.getUTCMonth();
    const date = datee.getUTCDate();
    const correctDate = date + '-' + (month + 1) + '-' + year;
    return correctDate;
  };

  const getEmployeeName = (id) => {
    let employee = employees.find((m) => m._id === id);
    if (employee) {
      return employee.name;
    }
  };

  const getEmployeeId = (id) => {
    let employee = employees.find((m) => m._id === id);
    if (employee) {
      return employee.userId;
    }
  };

  const rows = [];

  if (transactions && employees) {
    const pendingTransactions = transactions.filter((transaction) => {
      return transaction.status === 'Approved';
    });

    pendingTransactions.reverse().map((pendingTransaction) => {
      const data = {
        id: pendingTransaction._id,
        submissionDate: getDate(pendingTransaction.createdAt),
        employeeName: getEmployeeName(pendingTransaction.transactionBy),
        category: pendingTransaction.category,
        paymentMethod: pendingTransaction.paymentMethod,
        transactionDate: getDate(pendingTransaction.transactionDate),
        updatedDate: getDate(pendingTransaction.updatedAt),
        amount: pendingTransaction.amount,
        status: pendingTransaction.status,
        receiptUrl: pendingTransaction.receiptUrl,
      };
      rows.push(data);
      // console.log('Rows : ', rows);
    });
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      {transactions ? (
        <>
          <h3>Transactions Approved</h3>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </>
      ) : (
        <Grid container style={{ textAlign: 'center' }}>
          <Grid xs={12} sm={4}></Grid>
          <Grid xs={12} sm={4}>
            <img
              src={Gif}
              alt=""
              style={{
                alignItems: 'center',
                paddingTop: 50,
                paddingBottom: 100,
              }}
            />
          </Grid>
          <Grid xs={12} sm={4}></Grid>
        </Grid>
      )}
    </div>
  );
}
