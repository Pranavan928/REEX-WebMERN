import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from 'reactstrap';
import TransactionPendingDetail from './TransactionPendingDetail';
import {Grid} from '@material-ui/core';
import Gif from '../../assests/gif.gif';

export default function TopupPending(props) {
  const [rowSelected, setRowSelected] = useState(false);
  const [rows, setRows] = useState();
  const { transactions, employees } = props;
  const columns = [
    { field: 'submissionDate', headerName: 'Submission Date', width: 161 },
    { field: 'employeeName', headerName: 'Employee Name', width: 165 },
    {
      field: 'employeeId',
      headerName: 'Employee Name',
      width: 165,
      hide: true,
    },
    { field: 'category', headerName: 'Category', width: 110 },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 160 },
    {
      field: 'transactionDate',
      headerName: 'Transaction Date',
      width: 161,
      hide: true,
    },
    {
      field: 'updatedDate',
      headerName: 'Updated Date',
      width: 151,
      hide: true,
    },
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
    {
      field: 'description',
      headerName: 'description',
      width: 0,
      hide: true,
    },
    {
      field: 'id',
      headerName: 'id',
      width: 0,
      hide: true,
    },
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
    const correctDate = date + '-' + (month + 1) + '-' + year;
    return correctDate;
  };

  const getEmployeeName = (id) => {
    let employee = employees.find((m) => m._id === id);
    return employee.name;
  };

  const getEmployeeId = (id) => {
    let employee = employees.find((m) => m._id === id);
    return employee.userId;
  };

  const details = [];

  if (transactions && employees) {
    const pendingTransactions = transactions.filter((transaction) => {
      return transaction.status === 'Pending';
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
        description: pendingTransaction.description,
        employeeId: pendingTransaction.transactionBy,
      };
      details.push(data);
    });
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      {transactions ?
      <>
      {rowSelected ? (
        <TransactionPendingDetail
          transactions={transactions}
          employees={employees}
          rows={rows}
        />
      ) : (
        <React.Fragment>
          {' '}
          <h3>Transactions Pending</h3>
          <DataGrid rows={details} columns={columns} pageSize={5} />
        </React.Fragment>
      )}
      </> :
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
