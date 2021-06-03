import React, { useState } from 'react';
import { Paper,Grid } from '@material-ui/core';
import { Button, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import axios from 'axios';
import { SuccessMessage, FailedMessage } from './layouts/Alert';
import Gif from '../assests/gif.gif';

function ReportSent(props) {
  const { sentReports, allUsers } = props;
  const [deleteStatus, setDeleteStatus] = useState();
  const [deletedReportId, setDeletedReportId] = useState();

  const getReceiverDetails = (id) => {
    const receiver = allUsers.find((m) => m._id === id);
    let details = receiver.userId + ' - ' + receiver.name;
    return details;
  };

  const getDate = (realDate) => {
    const datee = new Date(realDate);
    const year = datee.getUTCFullYear();
    const month = datee.getUTCMonth();
    const date = datee.getUTCDate();
    const correctDate = date + '-' + (month + 1) + '-' + year;
    return correctDate;
  };

  let reportsDetails = [];

  if (sentReports && allUsers) {
    sentReports.map((sentReport) => {
      let data = {
        id: sentReport._id,
        title: sentReport.title,
        message: sentReport.message,
        receiver: getReceiverDetails(sentReport.receiver),
        sentOn: getDate(sentReport.createdAt),
      };
      reportsDetails.push(data);
    });
  }

  function onDeleteReport(id) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    let deleteUrl = 'http://localhost:3000/report/' + id;

    axios
      .delete(deleteUrl, config)
      .then((res) => {
        setDeletedReportId(id);
        setDeleteStatus(true);
      })
      .catch((err) => {
        setDeletedReportId(id);
        setDeleteStatus(false);
        console.log(err);
      });
  }

  return (
    <React.Fragment>
      {sentReports ? <>
      {reportsDetails.reverse().map((data) => (
        <React.Fragment>
          <Row>
            <Paper elevation={6}>
              <Col xs={12} sm={12}>
                <CardBody>
                  <CardTitle className=" mb-3" tag="h5">
                    {data.title}
                  </CardTitle>
                  <hr />
                  {deleteStatus === true && deletedReportId === data.id ? (
                    <SuccessMessage message="Report deleted to everyone successfully. Please Refresh." />
                  ) : null}
                  {deleteStatus === false && deletedReportId === data.id ? (
                    <FailedMessage message="Error in deleting this report." />
                  ) : null}
                  <CardText>
                    <span>To : {data.receiver}</span>
                    <br />
                    <span>Sent On : {data.sentOn}</span>
                  </CardText>
                  <CardText>{data.message}</CardText>
                </CardBody>
              </Col>
              <Row style={{ padding: 10 }}>
                <Col xs={10} sm={10}></Col>
                <Col xs={10} sm={2}>
                  <Button
                    color="danger"
                    onClick={() => {
                      onDeleteReport(data.id);
                    }}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </Paper>
          </Row>
          <br />
        </React.Fragment>
      ))} </> : 
      <Grid container style={{ textAlign: "center" }}>
          <Grid xs={12} sm={4}></Grid>
          <Grid xs={12} sm={4}>
            <img src={Gif} alt="" style={{ alignItems: "center", paddingTop: 50, paddingBottom: 100 }} />
          </Grid>
          <Grid xs={12} sm={4}></Grid>
        </Grid>}
    </React.Fragment>
  );
}

export default ReportSent;
