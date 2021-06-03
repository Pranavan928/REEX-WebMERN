import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
import axios from 'axios';
import { SuccessMessage, FailedMessage } from '../layouts/Alert';

const TopupPendingDetail = (props) => {
  const { rows, topups } = props;
  const [updatedStatus, setUpdateStatus] = useState();
  const [updatedRejectStatus, setUpdateRejectStatus] = useState();
  const [cardUpdateStatus, setCardUpdateStatus] = useState();

  let currentTopup = {};

  if (topups) {
    currentTopup = topups.find((m) => m._id === rows.id);
  }

  const getDate = (realDate) => {
    const datee = new Date(realDate);
    const year = datee.getUTCFullYear();
    const month = datee.getUTCMonth();
    const date = datee.getUTCDate();
    const correctDate = date + '-' + (month + 1) + '-' + year;
    return correctDate;
  };

  const onClick = () => {
    window.location.reload();
  };

  const onAccept = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    let url = 'http://localhost:3000/topUpRequest/' + rows.id;
    let cardUrl = 'http://localhost:3000/addAmount/' + rows.requestBy;

    let amount = JSON.stringify({
      amount: rows.amount,
    });

    axios
      .patch(cardUrl, amount, config)
      .then((res) => {
        setCardUpdateStatus(true);
      })
      .catch((err) => {
        setCardUpdateStatus(false);
      });

    const dataa = JSON.stringify({
      status: 'Approved',
    });

    axios
      .patch(url, dataa, config)
      .then((res) => {
        setUpdateStatus(true);
      })
      .catch((err) => {
        console.log(err);
        setUpdateStatus(false);
      });
  };

  const onReject = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    let url = 'http://localhost:3000/topUpRequest/' + rows.id;

    const dataa = JSON.stringify({
      status: 'Rejected',
    });

    axios
      .patch(url, dataa, config)
      .then((res) => {
        setUpdateRejectStatus(true);
      })
      .catch((err) => {
        console.log(err);
        setUpdateRejectStatus(false);
      });
  };

  var currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Row>
        <Col xs={12} sm={6}>
          <button
            className="btn btn-primary"
            style={{ width: 100 }}
            onClick={onClick}
          >
            Back
          </button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12} sm={8}>
          <Card>
            <Paper elevation={4}>
              <CardBody>
                <CardTitle
                  style={{ textAlign: 'center', color: '#1278B8' }}
                  tag="h5"
                >
                  Topup Details
                </CardTitle>

                <hr />
                {updatedStatus === true ? (
                  <SuccessMessage message="Topup Request Accepted." />
                ) : null}
                {updatedStatus === false ? (
                  <FailedMessage message="Error Occured ..." />
                ) : null}
                {updatedRejectStatus === true ? (
                  <SuccessMessage message="Topup Request Rejected." />
                ) : null}
                {updatedRejectStatus === false ? (
                  <FailedMessage message="Error Occured ..." />
                ) : null}
                <Row>
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>
                        Employee Name :
                      </span>{' '}
                      {rows.employeeName}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>Topup Id : </span>
                      {rows.id}
                    </CardSubtitle>
                  </Col>
                  <br />
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>Amount : </span>
                      {rows.amount}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>Status : </span>
                      {currentTopup.status}
                    </CardSubtitle>
                  </Col>
                  <br />
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>
                        Created Date :{' '}
                      </span>
                      {getDate(currentTopup.createdAt)}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>
                        Updated Date :{' '}
                      </span>
                      {getDate(currentTopup.updatedAt)}
                    </CardSubtitle>
                  </Col>
                  <br />
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>Description : </span>
                      {currentTopup.description}
                    </CardSubtitle>
                  </Col>
                </Row>
                {currentUser.role === 'manager' ? (
                  <Row>
                    <Col xs={12} sm={6}>
                      <button className="btn btn-success" onClick={onAccept}>
                        Accept
                      </button>
                    </Col>
                    <Col xs={12} sm={6}>
                      <button className="btn btn-danger" onClick={onReject}>
                        Reject
                      </button>
                    </Col>
                  </Row>
                ) : null}
              </CardBody>
            </Paper>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TopupPendingDetail;
