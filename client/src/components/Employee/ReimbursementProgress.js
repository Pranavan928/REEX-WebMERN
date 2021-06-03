import React from 'react';
import { Col, Row } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import Title from '../../components/Title';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

export default function TotalExpenses(props) {
  const { selectedUserReimbursements } = props;

  let reimbursements = [];

  let totalReimbursement = 0;
  let pending = [];
  let approved = [];
  let rejected = [];
  if (selectedUserReimbursements) {
    reimbursements = selectedUserReimbursements;

    pending = selectedUserReimbursements.filter((reimbursement) => {
      return reimbursement.status === 'Pending';
    });

    approved = selectedUserReimbursements.filter((reimbursement) => {
      return reimbursement.status === 'Done';
    });

    rejected = selectedUserReimbursements.filter((reimbursement) => {
      return reimbursement.status === 'Cancelled';
    });

    selectedUserReimbursements.map((reimbursement) => {
      totalReimbursement += reimbursement.amount;
    });
  }

  var currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Title>Reimbusements</Title>
      <hr />
      <Row>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6" style={{ fontWeight: 'bold' }}>
            Total Reimbursement Amount(Rs.):
          </Typography>
        </Col>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6">
            {totalReimbursement}
          </Typography>
        </Col>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6" style={{ fontWeight: 'bold' }}>
            Number of Reimbursement:
          </Typography>
        </Col>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6">
            {reimbursements.length}
          </Typography>
        </Col>
      </Row>
      <br />
      <Typography>
        <Row>
          <Col xs={12} sm={4}>
            <span style={{ color: '#ff6600' }}>Pending : {pending.length}</span>
          </Col>
          <Col xs={12} sm={4}>
            <span style={{ color: '#00b300' }}>
              Completed : {approved.length}
            </span>
          </Col>
          <Col xs={12} sm={4}>
            <span style={{ color: '#ff0000' }}>
              Cancelled : {rejected.length}
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
