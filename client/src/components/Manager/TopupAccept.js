import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Grid} from '@material-ui/core';
import Gif from '../../assests/gif.gif';

export default function TopupAccept(props) {
  const { topups, employees } = props;

  const columns = [
    { field: 'createdAt', headerName: 'Requested Date', width: 160 },
    { field: 'employeeName', headerName: 'Employee Name', width: 170 },
    { field: 'employeeId', headerName: 'Employee UserID', width: 170 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 130,
    },
    { field: 'updatedAt', headerName: 'Updated On', width: 170 },
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

  const rows = [];

  if (topups && employees) {
    const approvedTopups = topups.filter((topup) => {
      return topup.status === 'Approved';
    });

    approvedTopups.reverse().map((approvedTopup) => {
      const data = {
        id: approvedTopup._id,
        createdAt: getDate(approvedTopup.createdAt),
        employeeName: getEmployeeName(approvedTopup.requestBy),
        employeeId: getEmployeeId(approvedTopup.requestBy),
        amount: approvedTopup.amount,
        updatedAt: getDate(approvedTopup.updatedAt),
      };
      rows.push(data);
    });
  }
  return (
    <div style={{ height: 400, width: '100%' }}>
      {topups ?
      <>
      <h3>Topups Accepted</h3>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
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
