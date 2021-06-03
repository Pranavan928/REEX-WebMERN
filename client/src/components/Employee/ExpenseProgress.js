import React from 'react';
import { Col, Row } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import Title from '../../components/Title';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

export default function TotalExpenses(props) {
  const { selectedUserTransactions } = props;

  let transactions = [];
  let totalTransactionsExpense = 0;
  let pendingTransactions = [];
  let approvedTransactions = [];
  let rejectedTransactions = [];
  if (selectedUserTransactions) {
    transactions = selectedUserTransactions;
    pendingTransactions = selectedUserTransactions.filter((transaction) => {
      return transaction.status === 'Pending';
    });

    approvedTransactions = selectedUserTransactions.filter((transaction) => {
      return transaction.status === 'Approved';
    });

    rejectedTransactions = selectedUserTransactions.filter((transaction) => {
      return transaction.status === 'Rejected';
    });

    selectedUserTransactions.map((transaction) => {
      totalTransactionsExpense += transaction.amount;
    });
  }

  return (
    <div>
      <Title>Transactions</Title>
      <hr />
      <Row>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6" style={{ fontWeight: 'bold' }}>
            Total Transaction Amount(Rs.):
          </Typography>
        </Col>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6">
            {totalTransactionsExpense}
          </Typography>
        </Col>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6" style={{ fontWeight: 'bold' }}>
            Number of Transactions:
          </Typography>
        </Col>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6">
            {transactions.length}
          </Typography>
        </Col>
      </Row>
      <br />
      <Typography>
        <Row>
          <Col xs={12} sm={4}>
            <span style={{ color: '#ff6600' }}>
              Pending: {pendingTransactions.length}
            </span>
          </Col>
          <Col xs={12} sm={4}>
            <span style={{ color: '#00b300' }}>
              Accepted: {approvedTransactions.length}
            </span>
          </Col>
          <Col xs={12} sm={4}>
            <span style={{ color: '#ff0000' }}>
              Rejected: {rejectedTransactions.length}
            </span>
          </Col>
        </Row>
      </Typography>
      <br />
      <Typography color="textSecondary">
        until: {new Date().toDateString()}
      </Typography>
    </div>
  );
}
