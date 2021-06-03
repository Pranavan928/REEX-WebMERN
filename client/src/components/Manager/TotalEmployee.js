import React from 'react';
import { Col, Row } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

export default function TotalEmployee(props) {
  const { employees } = props;
  let employeesCopy = [];
  let employeeMale = [];
  let employeeFemale = [];

  if (employees) {
    employeesCopy = employees;

    employeeMale = employeesCopy.filter((employee) => {
      return employee.gender === 'male';
    });

    employeeFemale = employeesCopy.filter((employee) => {
      return employee.gender === 'female';
    });
  }

  return (
    <div>
      <Title>Employees</Title>
      <Row>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6">
            Total Employees:
          </Typography>
        </Col>
        <Col xs={12} sm={6}>
          <Typography component="p" variant="h6">
            {employeesCopy.length}
          </Typography>
        </Col>
      </Row>
      <br />
      <Typography>
        <Row>
          <Col xs={12} sm={6}>
            <span style={{ color: '#ff6600' }}>
              Male: {employeeMale.length}
            </span>
          </Col>
          <Col xs={12} sm={6}>
            <span style={{ color: '#00b300' }}>
              Female: {employeeFemale.length}
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
