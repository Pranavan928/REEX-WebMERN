import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
} from 'reactstrap';
import { SuccessMessage, FailedMessage } from '../layouts/Alert';
import axios from 'axios';

const ManagerReimburseDetail = (props) => {
  const { rowData, transactions, allBankDetails } = props;
  const [validUpdate, setValidUpdate] = useState();
  const [validBankDetail, setValidBankDetail] = useState();
  const [updateStatus, setUpdateStatus] = useState();
  const [rejectionValid, setRejectionValid] = useState();

  let relatedTransaction = {};
  let relatedBankDetail = {};

  const getDate = (realDate) => {
    const datee = new Date(realDate);
    const year = datee.getUTCFullYear();
    const month = datee.getUTCMonth();
    const date = datee.getUTCDate();
    const correctDate = date + '-' + (month + 1) + '-' + year;
    return correctDate;
  };

  if (rowData && transactions) {
    relatedTransaction = transactions.find(
      (transaction) => transaction._id === rowData.transactionId
    );

    relatedBankDetail = allBankDetails.find(
      (bankDetail) => bankDetail._id === rowData.reimbursementAccount
    );
  }

  const onAccept = () => {
    const selectedBankDetail = allBankDetails.find(
      (m) => m.owner === relatedTransaction.transactionBy
    );

    if (relatedTransaction.status !== 'Approved') {
      setValidUpdate(false);
    } else {
      if (!selectedBankDetail) {
        setValidBankDetail(false);
      } else {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
        let url = 'http://localhost:3000/cashReimbursement/' + rowData.id;

        const dataa = JSON.stringify({
          status: 'Done',
          reimbursementAccount: selectedBankDetail._id,
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
      }
    }
  };

  const onReject = () => {
    if (relatedTransaction.status === 'Pending') {
      setRejectionValid(false);
    } else {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      let url = 'http://localhost:3000/cashReimbursement/' + rowData.id;

      const dataa = JSON.stringify({
        status: 'Cancelled',
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
    }
  };

  const onClick = () => {
    window.location.reload();
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
        {validUpdate === false ? (
          <FailedMessage message="Transaction should be approved before Reimbursement." />
        ) : null}
        {validBankDetail === false ? (
          <FailedMessage message="Bank detail not available" />
        ) : null}
        {updateStatus === true ? (
          <SuccessMessage message="Reimbursement updated Successfully" />
        ) : null}
        {updateStatus === false ? (
          <FailedMessage message="Reimbursement update Failed" />
        ) : null}
        {rejectionValid === false ? (
          <FailedMessage message="You can't reject while transaction in pending." />
        ) : null}
      </Row>
      <br />
      <Row>
        <Col xs={12} sm={8}>
          <Card>
            <Paper elevation={4}>
              <CardBody>
                {currentUser.role === 'manager' ? (
                  <CardTitle
                    style={{ textAlign: 'center', color: '#1278B8' }}
                    tag="h5"
                  >
                    Transaction Details
                  </CardTitle>
                ) : currentUser.role === 'employee' ? (
                  <CardTitle
                    style={{ textAlign: 'center', color: '#1278B8' }}
                    tag="h5"
                  >
                    Expense Details
                  </CardTitle>
                ) : null}

                <hr />
                <Row>
                  <Col xs={12} sm={4}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>From :</span>{' '}
                      {rowData.employeeName}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={4}>
                    <CardSubtitle>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>
                        Transaction Date :{' '}
                      </span>
                      {getDate(relatedTransaction.transactionDate)}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={4}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>Status :</span>{' '}
                      {relatedTransaction.status}
                    </CardSubtitle>
                  </Col>
                  <br />
                  <Col xs={12} sm={4}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>Amount : </span>
                      {relatedTransaction.amount}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={4}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}> Category : </span>
                      {relatedTransaction.category}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={4}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>
                        Payment Method :{' '}
                      </span>
                      {relatedTransaction.paymentMethod}
                    </CardSubtitle>
                  </Col>
                  <br />
                  <Col xs={12} sm={12}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>Description : </span>
                      {relatedTransaction.description}
                    </CardSubtitle>
                  </Col>
                  <br />
                </Row>
              </CardBody>
            </Paper>
          </Card>
          <br />
          <Card>
            <Paper elevation={4}>
              <CardBody>
                <CardTitle
                  style={{ textAlign: 'center', color: '#1278B8' }}
                  tag="h5"
                >
                  Reimbursement Details
                </CardTitle>
                <hr />
                <Row>
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>
                        Employee Name :
                      </span>{' '}
                      {rowData.employeeName}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>
                        Transaction Id :{' '}
                      </span>
                      {rowData.transactionId}
                    </CardSubtitle>
                  </Col>
                  <br />
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>Amount : </span>
                      {rowData.amount}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>Status : </span>
                      {rowData.status}
                    </CardSubtitle>
                  </Col>
                  <br />
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>
                        Created Date :{' '}
                      </span>
                      {rowData.createdDate}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>
                        Updated Date :{' '}
                      </span>
                      {rowData.updatedDate}
                    </CardSubtitle>
                  </Col>
                  <br />
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}> Bank Name : </span>
                      {relatedBankDetail ? relatedBankDetail.bank : ' - '}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>
                        {' '}
                        Bank Branch :{' '}
                      </span>
                      {relatedBankDetail ? relatedBankDetail.branch : ' - '}
                    </CardSubtitle>
                  </Col>
                  <br />
                  <Col xs={12} sm={2}></Col>
                  <Col xs={12} sm={8}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>
                        {' '}
                        Account Number :{' '}
                      </span>
                      {relatedBankDetail
                        ? relatedBankDetail.accountNumber
                        : ' - '}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={2}></Col>
                  <br />
                </Row>
                {currentUser.role === 'manager' &&
                rowData.status === 'Pending' ? (
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
              src={relatedTransaction.receiptUrl}
              alt="Card image cap"
            />
          </Paper>
        </Col>
      </Row>
    </div>
  );
};

export default ManagerReimburseDetail;
