import React from 'react';
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

const EmployeeReimburseDetail = (props) => {
  const { rowData, transactions, reimbursements, bankDetails } = props;

  let expenseDetails = {
    to: '',
    transactionDate: '',
    amount: '',
    category: '',
    paymentType: '',
    description: '',
    receiptUrl: '',
    status: '',
  };

  let reimbursementDetails = {
    to: '',
    transactionId: '',
    amount: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    bankName: '-',
    bankBranch: '-',
    bankAccountNumber: '-',
  };

  let relatedTransaction = {};
  let relatedReimbursement = {};
  let relatedBankDetail = {};

  const getDate = (realDate) => {
    const datee = new Date(realDate);
    const year = datee.getUTCFullYear();
    const month = datee.getUTCMonth();
    const date = datee.getUTCDate();
    const correctDate = date + '-' + (month + 1) + '-' + year;
    return correctDate;
  };

  if (rowData && transactions && reimbursements) {
    relatedTransaction = transactions.find(
      (transaction) => transaction._id === rowData.transactionId
    );

    relatedReimbursement = reimbursements.find(
      (reimbursement) => reimbursement._id === rowData.id
    );

    relatedBankDetail = bankDetails.find(
      (bankDetail) =>
        bankDetail._id === relatedReimbursement.reimbursementAccount
    );

    expenseDetails.to = rowData.managerName;
    expenseDetails.amount = rowData.amount;
    expenseDetails.status = rowData.status;
    expenseDetails.paymentType = relatedTransaction.paymentMethod;
    expenseDetails.description = relatedTransaction.description;
    expenseDetails.receiptUrl = relatedTransaction.receiptUrl;
    expenseDetails.transactionDate = getDate(
      relatedTransaction.transactionDate
    );
    expenseDetails.category = relatedTransaction.category;

    reimbursementDetails.to = rowData.managerName;
    reimbursementDetails.transactionId = rowData.id;
    reimbursementDetails.amount = expenseDetails.amount;
    reimbursementDetails.status = rowData.status;
    reimbursementDetails.createdAt = getDate(relatedReimbursement.createdAt);
    reimbursementDetails.updatedAt = getDate(relatedReimbursement.updatedAt);
    if (relatedBankDetail) {
      reimbursementDetails.bankName = relatedBankDetail.bank;
      reimbursementDetails.bankBranch = relatedBankDetail.branch;
      reimbursementDetails.bankAccountNumber = relatedBankDetail.accountNumber;
    }
  }

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
                      <span style={{ fontWeight: 'bold' }}>To :</span>{' '}
                      {expenseDetails.to}{' '}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={4}>
                    <CardSubtitle>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>
                        Transaction Date :{' '}
                      </span>
                      {expenseDetails.transactionDate}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={4}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>Status :</span>{' '}
                      {expenseDetails.status}{' '}
                    </CardSubtitle>
                  </Col>
                  <br />
                  <Col xs={12} sm={4}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>Amount : </span>
                      {expenseDetails.amount}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={4}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}> Category : </span>
                      {expenseDetails.category}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={4}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>
                        Payment Method :{' '}
                      </span>
                      {expenseDetails.paymentType}
                    </CardSubtitle>
                  </Col>
                  <br />
                  <Col xs={12} sm={12}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>Description : </span>
                      {expenseDetails.description}
                    </CardSubtitle>
                  </Col>
                  <br />
                </Row>
                {currentUser.role === 'manager' ? (
                  <Row>
                    <Col xs={12} sm={6}>
                      <button className="btn btn-primary">Accept</button>
                    </Col>
                    <Col xs={12} sm={6}>
                      <button className="btn btn-danger">Reject</button>
                    </Col>
                  </Row>
                ) : null}
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
                      <span style={{ fontWeight: 'bold' }}>Manager Name :</span>{' '}
                      {reimbursementDetails.to}{' '}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>
                        Transaction Id :{' '}
                      </span>
                      {reimbursementDetails.transactionId}
                    </CardSubtitle>
                  </Col>
                  <br />
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>Amount : </span>
                      {reimbursementDetails.amount}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>Status : </span>
                      {reimbursementDetails.status}
                    </CardSubtitle>
                  </Col>
                  <br />
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>
                        Created Date :{' '}
                      </span>
                      {reimbursementDetails.createdAt}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>
                        Updated Date :{' '}
                      </span>
                      {reimbursementDetails.updatedAt}
                    </CardSubtitle>
                  </Col>
                  <br />
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}> Bank Name : </span>
                      {reimbursementDetails.bankName}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={6}>
                    <CardSubtitle>
                      <span style={{ fontWeight: 'bold' }}>
                        {' '}
                        Bank Branch :{' '}
                      </span>
                      {reimbursementDetails.bankAccountNumber}
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
                      {reimbursementDetails.bankAccountNumber}
                    </CardSubtitle>
                  </Col>
                  <Col xs={12} sm={2}></Col>
                  <br />
                </Row>
                {currentUser.role === 'manager' ? (
                  <Row>
                    <Col xs={12} sm={6}>
                      <button className="btn btn-primary">Accept</button>
                    </Col>
                    <Col xs={12} sm={6}>
                      <button className="btn btn-danger">Reject</button>
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

export default EmployeeReimburseDetail;
