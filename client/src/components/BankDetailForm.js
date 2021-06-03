import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import { Paper } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { SuccessMessage, FailedMessage } from './layouts/Alert';

const BankDetailForm = (props) => {
  const [addStatus, setAddStatus] = useState();
  const formik = useFormik({
    initialValues: {
      bank: '',
      branch: '',
      accountNumber: '',
    },

    // validate,
    onSubmit: (bankDetail) => {
      console.log(bankDetail);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      axios
        .post('http://localhost:3000/bankDetail', bankDetail, config)
        .then((res) => {
          setAddStatus(true);
        })
        .catch((err) => {
          setAddStatus(false);
          console.log(err);
        });
    },
  });

  return (
    <Row>
      <Col xs={12} sm={2}></Col>
      <Col xs={12} sm={8} style={{ paddingTop: 20 }}>
        <div className="container">
          <Paper elevation={4} style={{ padding: '20px' }}>
            <h3 style={{ textAlign: 'center' }}>Update Bank Details</h3>
            <hr />
            {addStatus === true ? (
              <SuccessMessage message="Bank details successfully added." />
            ) : null}
            {addStatus === false ? (
              <FailedMessage message="Error in adding bank details." />
            ) : null}
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <Row>
                <Col xs={12} sm={6}>
                  <div className="form-group">
                    <label>Account Number:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="accountNumber"
                      onChange={formik.handleChange}
                      value={formik.values.accountNumber}
                    />
                  </div>
                </Col>
                <Col xs={12} sm={6}>
                  <div className="form-group">
                    <label>Bank Name:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="bank"
                      onChange={formik.handleChange}
                      value={formik.values.bank}
                    />
                  </div>
                </Col>
                <Col xs={12} sm={6}>
                  <div className="form-group">
                    <label>Branch Name:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="branch"
                      onChange={formik.handleChange}
                      value={formik.values.branch}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={9}>
                  <button className="btn btn-primary">
                    Update Bank Details
                  </button>
                </Col>
                <Col xs={12} sm={3} style={{ paddingTop: 10 }}>
                  <Link style={{ textDecoration: 'none' }} to="/ViewProfile">
                    <ArrowBackIcon />
                    View Profile{' '}
                  </Link>
                </Col>
              </Row>
            </form>
          </Paper>
        </div>
      </Col>
      <Col xs={12} sm={2}></Col>
    </Row>
  );
};

export default BankDetailForm;
