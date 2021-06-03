import React, { useState, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import Title from '../../components/Title';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

export default function MTotalTopup(props) {
  const { topups } = props;

  let topupsCopy = [];
  let pending = [];
  let approved = [];
  let rejected = [];
  let totalTopupAmount = 0;

  if (topups) {
    topupsCopy = topups;

    pending = topups.filter((topup) => {
      return topup.status === 'Pending';
    });

    approved = topups.filter((topup) => {
      return topup.status === 'Approved';
    });

    rejected = topups.filter((topup) => {
      return topup.status === 'Rejected';
    });

    topups.map((topup) => {
      totalTopupAmount += topup.amount;
    });
  }

  return (
    <div>
      <Title>Topups</Title>
      <hr />
      <Row>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6" style={{ fontFamily: "Montserrat" }}>
            Topups(Rs.):
          </Typography>
        </Col>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6" style={{ fontFamily: "Montserrat" }}>
            {totalTopupAmount}
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6" style={{ fontFamily: "Montserrat" }}>
            Total(Number):
          </Typography>
        </Col>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6" style={{ fontFamily: "Montserrat" }}>
            {topupsCopy.length}
          </Typography>
        </Col>
      </Row>
      <br />
      <Typography>
        <Row>
          <Col xs={12} sm={4}>
            <span style={{ color: '#ff6600', fontFamily: "Montserrat" }}>Pending: {pending.length}</span>
          </Col>
          <Col xs={12} sm={4}>
            <span style={{ color: '#00b300', fontFamily: "Montserrat" }}>
              Accepted: {approved.length}
            </span>
          </Col>
          <Col xs={12} sm={4}>
            <span style={{ color: '#ff0000', fontFamily: "Montserrat" }}>
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
