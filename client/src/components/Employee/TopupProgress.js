import React from 'react';
import { Col, Row } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import Title from '../../components/Title';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

export default function TotalExpenses(props) {
  const { selectedUserTopups } = props;

  let topups = [];
  let totalTopupsExpense = 0;
  let pendingTopups = [];
  let approvedTopups = [];
  let rejectedTopups = [];

  if (selectedUserTopups) {
    topups = selectedUserTopups;
    pendingTopups = selectedUserTopups.filter((topup) => {
      return topup.status === 'Pending';
    });

    approvedTopups = selectedUserTopups.filter((topup) => {
      return topup.status === 'Approved';
    });

    rejectedTopups = selectedUserTopups.filter((topup) => {
      return topup.status === 'Rejected';
    });

    selectedUserTopups.map((topup) => {
      totalTopupsExpense += topup.amount;
    });
  }

  var currentUser = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Title>Topups</Title>
      <hr />
      <Row>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6" style={{ fontWeight: 'bold' }}>
            Total Topup Amount(Rs.):
          </Typography>
        </Col>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6">
            {totalTopupsExpense}
          </Typography>
        </Col>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6" style={{ fontWeight: 'bold' }}>
            Number of Topups:
          </Typography>
        </Col>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6">
            {topups.length}
          </Typography>
        </Col>
      </Row>
      <br />
      <Typography>
        <Row>
          <Col xs={12} sm={4}>
            <span style={{ color: '#ff6600' }}>
              Pending: {pendingTopups.length}
            </span>
          </Col>
          <Col xs={12} sm={4}>
            <span style={{ color: '#00b300' }}>
              Accepted: {approvedTopups.length}
            </span>
          </Col>
          <Col xs={12} sm={4}>
            <span style={{ color: '#ff0000' }}>
              Rejected: {rejectedTopups.length}
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
