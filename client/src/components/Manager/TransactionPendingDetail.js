import React, { useState } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
} from 'reactstrap';
import { Paper } from '@material-ui/core';
import axios from 'axios';
import { SuccessMessage, FailedMessage } from '../layouts/Alert';

const TransactionPendingDetail = (props) => {
  const { rows, transactions, employees } = props;
  const [updateAcceptStatus, setUpdateAcceptStatus] = useState();
  const [updateRejectStatus, setUpdateRejectStatus] = useState();
  const [cardUpdateStatus, setCardUpdateStatus] = useState();
  const [transactionUpdateStatus, setTransactionUpdateStatus] = useState();

  const onClick = () => {
    window.location.reload();
  };

  const getDate = (realDate) => {
    const datee = new Date(realDate);
    const year = datee.getUTCFullYear();
    const month = datee.getUTCMonth();
    const date = datee.getUTCDate();
    const correctDate = date + '-' + (month + 1) + '-' + year;
    return correctDate;
  };

  var currentUser = JSON.parse(localStorage.getItem('user'));

  const onAccept = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    let url = 'http://localhost:3000/transaction/' + rows.id;
    if (rows) {
      let cardUrl = 'http://localhost:3000/subAmount/' + rows.employeeId;

      let amount = JSON.stringify({
        amount: rows.amount,
      });
      if (rows.paymentMethod === 'Card') {
        axios
          .patch(cardUrl, amount, config)
          .then((res) => {
            setCardUpdateStatus(true);
          })
          .catch((err) => {
            setCardUpdateStatus(false);
          });
      }
    }

    const dataa = JSON.stringify({
      status: 'Approved',
    });

    axios
      .patch(url, dataa, config)
      .then((res) => {
        setUpdateAcceptStatus(true);
      })
      .catch((err) => {
        setUpdateAcceptStatus(false);
      });
  };

  const onReject = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    let url = 'http://localhost:3000/transaction/' + rows.id;

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

  const onReceiptClick = () => {
    window.open(rows.receiptUrl);
  };

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
                  Transaction Details
                </CardTitle>
                <hr />
                {updateAcceptStatus === true ? (
                  <SuccessMessage message="Transaction Accepted" />
                ) : null}
                {updateAcceptStatus === false ? (
                  <FailedMessage message="Some Error Occured" />
                ) : null}
                {updateRejectStatus === true ? (
                  <SuccessMessage message="Transaction Rejected" />
                ) : null}
                {updateRejectStatus === false ? (
                  <FailedMessage message="Some Error Occured" />
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
                      <span style={{ fontWeight: 'bold' }}>Category : </span>
                      {rows.category}
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
                      {rows.status}
                    </CardSubtitle>
                  </Col>
                  <br />
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>
                        Created Date :{' '}
                      </span>
                      {getDate(rows.submissionDate)}
                    </CardSubtitle>
                  </Col>
                  <br />

                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>
                        Payment method :{' '}
                      </span>
                      {rows.paymentMethod}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>Description : </span>
                      {rows.description}
                    </CardSubtitle>
                  </Col>
                  <br />
                </Row>
                {currentUser.role === 'manager' ? (
                  <Row>
                    <Col xs={12} sm={6}>
                      <button className="btn btn-primary" onClick={onAccept}>
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
        <Col xs={12} sm={4}>
          <Paper elevation={4}>
            <CardImg
              style={{ width: 'auto', height: 400 }}
              top
              width="100%"
              src={rows.receiptUrl}
              onClick={onReceiptClick}
              alt="Card image cap"
            />
          </Paper>
        </Col>
      </Row>
    </div>
  );
};

export default TransactionPendingDetail;
