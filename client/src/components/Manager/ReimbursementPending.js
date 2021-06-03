import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import ManagerReimburseDetail from './ManagerReimburseDetail';
import { Button } from 'reactstrap';
import {Grid} from '@material-ui/core';
import Gif from '../../assests/gif.gif';

export default function ReimburseRequests(props) {
  const [rows, setRows] = useState();
  const [rowSelected, setRowSelected] = useState(false);
  const {
    employees,
    reimbursements,
    transactions,
    allBankDetails,
    managers,
  } = props;

  const columns = [
    { field: 'createdDate', headerName: 'Created Date', width: 150 },
    { field: 'employeeName', headerName: 'Employee Name', width: 130 },
    { field: 'employeeId', headerName: 'Employee Id', width: 130, hide: true },
    { field: 'id', headerName: 'Id', width: 130, hide: true },
    {
      field: 'reimbursementAccount',
      headerName: 'reimbursementAccount',
      width: 130,
      hide: true,
    },
    { field: 'status', headerName: 'status', width: 130, hide: true },
    {
      field: 'managerName',
      headerName: 'manager name',
      width: 130,
      hide: true,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 130,
    },
    { field: 'updatedDate', headerName: 'Updated Date', width: 160 },
    { field: 'transactionId', hide: true, headerName: 'Status', width: 160 },
    {
      field: '',
      headerName: 'For More',
      width: 160,
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

        return <Button onClick={onClick}>Click Here</Button>;
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

  const getManagerName = (id) => {
    let manager = managers.find((m) => m._id === id);
    return manager.name;
  };

  const details = [];
  if (reimbursements && employees && managers) {
    reimbursements.map((reimbursement) => {
      if (reimbursement.status === 'Pending') {
        const data = {
          id: reimbursement._id,
          createdDate: getDate(reimbursement.createdAt),
          employeeName: getEmployeeName(reimbursement.reimbursementTo),
          amount: reimbursement.amount,
          status: reimbursement.status,
          bankDetails: reimbursement.reimbursementAccount,
          updatedDate: getDate(reimbursement.updatedAt),
          transactionId: reimbursement.transactionId,
          employeeId: reimbursement.reimbursementTo,
          managerName: getManagerName(reimbursement.reimbursementBy),
          reimbursementAccount: reimbursement.reimbursementAccount,
        };
        details.push(data);
      }
    });
  }

  return (
    <div style={{ height: 400, width: 'auto' }}>
      {reimbursements ?
      <>
      {rowSelected ? (
        <ManagerReimburseDetail
          rowData={rows}
          transactions={transactions}
          allBankDetails={allBankDetails}
        />
      ) : (
        <React.Fragment>
          <h3>Reimbursement Pending</h3>
          <DataGrid rows={details.reverse()} columns={columns} pageSize={5} />
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
