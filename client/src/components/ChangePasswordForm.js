import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SuccessMessage, FailedMessage } from './layouts/Alert';
import { Row, Col } from 'reactstrap';
import { Paper } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ChangePasswordForm = (props) => {
  const [changePasswordStatus, setChangePasswordStatus] = useState();
  const formik = useFormik({
    initialValues: {
      password: '',
      newpassword: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      password: yup.string().required('Password is required'),
      newpassword: yup.string().required('New Password is required'),
      confirmPassword: yup
        .string()
        .oneOf(
          [yup.ref('newpassword'), null],
          'Password and confirm password must be same'
        )
        .required('Confirm Password is required'),
    }),
    // validate,

    onSubmit: (user) => {
      console.log(user);
      const newPassword = {};
      newPassword.password = user.newpassword;
      console.log('New password : ', newPassword);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      axios
        .patch('http://localhost:3000/users/me', newPassword, config)
        .then((res) => {
          console.log('Password Changed ');
          toast.success('Password successfully Changed');
          setChangePasswordStatus(true);
          //   reloadUser();
        })
        .catch((err) => {
          toast.error(err);
          setChangePasswordStatus(false);
        });

      // axios.post('http://localhost:3000/users', user)
      //     .then(res => {
      //         console.log("Done");
      //         toast.success("User Register successful");
      //         props.history.push('/user/me');
      //     })
      //     .catch(err => {
      //         toast.error(err.response.user);
      //     })
    },
  });

  return (
    <Row>
      <Col xs={12} sm={2}></Col>
      <Col xs={12} sm={8} style={{ paddingTop: 30 }}>
        <div className="container">
          <Paper elevation={4} style={{ padding: '20px' }}>
            <h3 style={{ textAlign: 'center' }}>Change Password</h3>
            {changePasswordStatus === true ? (
              <SuccessMessage message="Password Changed Successfully." />
            ) : null}
            {changePasswordStatus === false ? (
              <FailedMessage message="Password Change Failed." />
            ) : null}
            <hr />
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <Row>
                <Col xs={12} sm={4}>
                  <div className="form-group">
                    <label>Old Password:</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    {formik.errors.password ? (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div className="form-group">
                    <label>New Password:</label>
                    <input
                      className="form-control"
                      type="password"
                      name="newpassword"
                      onChange={formik.handleChange}
                      value={formik.values.newpassword}
                    />
                    {formik.errors.password ? (
                      <div className="text-danger">
                        {formik.errors.newpassword}
                      </div>
                    ) : null}
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                      className="form-control"
                      type="password"
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                    />
                    {formik.errors.confirmPassword ? (
                      <div className="text-danger">
                        {formik.errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={6}>
                  <button className="btn btn-primary">Change Password</button>
                </Col>
                <Col xs={12} sm={6} style={{ paddingTop: 10 }}>
                  <Row>
                    <Col xs={12} sm={6}>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to="/EditProfile"
                      >
                        <ArrowBackIcon />
                        Update Profile{' '}
                      </Link>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to="/BankDetails"
                      >
                        <ArrowForwardIcon />
                        Bank Details{' '}
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </form>
          </Paper>
        </div>
      </Col>
    </Row>
  );
};

export default ChangePasswordForm;
