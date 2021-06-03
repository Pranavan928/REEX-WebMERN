import React from 'react';
import { Col, Row } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import Title from '../../components/Title';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

export default function TotalReimbursement(props) {
  // const classes = useStyles();
  const { reimbursements } = props;

  let reimbursementsCopy = [];
  let pending = [];
  let approved = [];
  let rejected = [];
  let totalreimbursementAmount = 0;

  if (reimbursements) {
    reimbursementsCopy = reimbursements;

    pending = reimbursements.filter((reimbursement) => {
      return reimbursement.status === 'Pending';
    });

    approved = reimbursements.filter((reimbursement) => {
      return reimbursement.status === 'Done';
    });

    rejected = reimbursements.filter((reimbursement) => {
      return reimbursement.status === 'Cancelled';
    });

    reimbursements.map((reimbursement) => {
      totalreimbursementAmount += reimbursement.amount;
    });
  }

  return (
    <div>
      <Title>Reimbursement</Title>
      <hr />
      <Row>
        <Col xs={12} sm={8}>
          <Typography
            component="p"
            variant="h6"
            style={{ fontFamily: 'Montserrat' }}
          >
            Reimbursement(Rs.):
          </Typography>
        </Col>
        <Col xs={12} sm={4}>
          <Typography
            component="p"
            variant="h6"
            style={{ fontFamily: 'Montserrat' }}
          >
            {totalreimbursementAmount}
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={8}>
          <Typography
            component="p"
            variant="h6"
            style={{ fontFamily: 'Montserrat' }}
          >
            Total(Number):
          </Typography>
        </Col>
        <Col xs={12} sm={4}>
          <Typography
            component="p"
            variant="h6"
            style={{ fontFamily: 'Montserrat' }}
          >
            {reimbursementsCopy.length}
          </Typography>
        </Col>
      </Row>
      <br />
      <Typography>
        <Row>
          <Col xs={12} sm={4}>
            <span style={{ color: '#ff6600', fontFamily: 'Montserrat' }}>
              Pending: {pending.length}
            </span>
          </Col>
          <Col xs={12} sm={4}>
            <span style={{ color: '#00b300', fontFamily: 'Montserrat' }}>
              Accepted: {approved.length}
            </span>
          </Col>
          <Col xs={12} sm={4}>
            <span style={{ color: '#ff0000', fontFamily: 'Montserrat' }}>
              Rejected: {rejected.length}
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
