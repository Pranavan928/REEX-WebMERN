import React, { useState, useContext, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import FlagIcon from '@material-ui/icons/Flag';
import Gif from '../assests/gif.gif';

function ReportReceived(props) {
  const { receivedReports, allUsers } = props;

  const getSenderDetails = (id) => {
    const sender = allUsers.find((m) => m._id === id);
    if (sender) {
      let details = sender.userId + ' - ' + sender.name;
      return details;
    }
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

  if (receivedReports && allUsers) {
    receivedReports.map((receivedReport) => {
      let data = {
        title: receivedReport.title,
        message: receivedReport.message,
        sender: getSenderDetails(receivedReport.sender),
        receivedOn: getDate(receivedReport.createdAt),
        today: getDate(new Date()),
      };
      reportsDetails.push(data);
    });
  }

  return (
    <React.Fragment>
      {receivedReports || reportsDetails > 0 ? (
        <>
          {reportsDetails.reverse().map((data) => (
            <React.Fragment>
              <Row>
                <Paper elevation={4}>
                  <Col xs={12} sm={12}>
                    <CardBody>
                      <Row>
                        <Col xs={10} sm={11}>
                          <CardTitle className=" mb-3" tag="h5">
                            {data.title}
                          </CardTitle>
                        </Col>
                        <Col xs={2} sm={1}>
                          {data.receivedOn === data.today ? (
                            <FlagIcon style={{ color: 'green' }} />
                          ) : null}
                        </Col>
                      </Row>
                      <hr />
                      <CardText>
                        <span>From : {data.sender}</span>
                        <br />
                        <span>Received On : {data.receivedOn}</span>
                      </CardText>
                      <CardText>{data.message}</CardText>
                    </CardBody>
                  </Col>
                </Paper>
              </Row>
              <br />
            </React.Fragment>
          ))}
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
    </React.Fragment>
  );
}

export default ReportReceived;
