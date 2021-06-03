import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import TopupPendingDetail from './TopupPendingDetail';
import { Button } from 'reactstrap';
import {Grid} from '@material-ui/core';
import Gif from '../../assests/gif.gif';

export default function TopupPending(props) {
  const { topups, employees } = props;
  const [rows, setRows] = useState();
  const [rowSelected, setRowSelected] = useState(false);

  const columns = [
    { field: 'createdAt', headerName: 'Requested Date', width: 160 },
    {
      field: 'requestBy',
      headerName: 'requestBy',
      width: 160,
      hide: true,
    },
    { field: 'id', headerName: 'Requested Date', width: 160, hide: true },
    { field: 'employeeName', headerName: 'Employee Name', width: 170 },
    { field: 'employeeId', headerName: 'Employee UserID', width: 170 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 130,
    },
    {
      field: '',
      headerName: 'Action',
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

        return <Button onClick={onClick}>Click</Button>;
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
  if (topups && employees) {
    const pendingTopups = topups.filter((topup) => {
      return topup.status === 'Pending';
    });

    pendingTopups.reverse().map((pendingTopup) => {
      const data = {
        id: pendingTopup._id,
        createdAt: getDate(pendingTopup.createdAt),
        employeeName: getEmployeeName(pendingTopup.requestBy),
        employeeId: getEmployeeId(pendingTopup.requestBy),
        requestBy: pendingTopup.requestBy,
        amount: pendingTopup.amount,
      };
      details.push(data);
    });
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      {topups ?
      <>
      {rowSelected ? (
        <TopupPendingDetail topups={topups} rows={rows} />
      ) : (
        <React.Fragment>
          <h3>Topups Pending</h3>
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
