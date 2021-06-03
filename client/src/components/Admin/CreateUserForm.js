import React, { useState } from 'react';
import { useFormik, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { SubmitSuccess, SubmitFailed } from '../layouts/Alert';
import { Row, Col } from 'reactstrap';
import { Select, Paper } from '@material-ui/core';
import DefaultProf from './profImg.jpg';

const CreateUserForm = (props) => {
  const [submissionStatus, setSubmissionStatus] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      role: '',
      gender: '',
      dateOfBirth: '',
      mobileNumber: '',
      email: '',
      userId: '',
      password: '',
      confirmPassword: '',
      profileImg: '',
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required('Name is required')
        .strict()
        .trim()
        .min(5, 'Minimum 5 characters required')
        .max(15, 'Maximum 15 characters only'),
      email: yup.string().email().required('Email is required'),
      role: yup.string().required('Role is required'),
      userId: yup.string().required('userId is required'),
      password: yup.string().required('Password is required'),
      confirmPassword: yup
        .string()
        .oneOf(
          [yup.ref('password'), null],
          'Password and confirm password must be same'
        )
        .required('Confirm Password List is required'),
    }),
    // validate,
    onSubmit: (user) => {
      const userData = {
        name: user.name,
        role: user.role,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
        password: user.password,
        userId: user.userId,
        mobileNumber: user.mobileNumber,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      axios
        .post('http://localhost:3000/users', userData, config)
        .then((res) => setSubmissionStatus('success'))
        .catch((err) => {
          setSubmissionStatus('fail');
        });
    },
  });

  return (
    <Row>
      <Col xs={12} sm={4}>
        <Paper Container elevation={4}>
          <img src={DefaultProf} alt="" />
        </Paper>
      </Col>
      <Col xs={12} sm={8}>
        <div className="container">
          <Paper elevation={4} style={{ padding: '20px' }}>
            {submissionStatus === 'success' ? <SubmitSuccess /> : null}
            {submissionStatus === 'fail' ? <SubmitFailed /> : null}
            <h3>Create User Profile</h3>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <Row>
                <Col xs={12} sm={6}>
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    {formik.errors.name ? (
                      <div className="text-danger">{formik.errors.name}</div>
                    ) : null}
                  </div>
                </Col>
                <Col xs={12} sm={6}>
                  <div className="form-group">
                    <label>UserID:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="userId"
                      onChange={formik.handleChange}
                      value={formik.values.userId}
                    />
                    {formik.errors.userId ? (
                      <div className="text-danger">{formik.errors.userId}</div>
                    ) : null}
                  </div>
                </Col>
                <Col xs={12} sm={8}>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.errors.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div className="form-group">
                    <label>Mobile Number:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="mobileNumber"
                      onChange={formik.handleChange}
                      value={formik.values.mobileNumber}
                    />
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div className="form-group">
                    <label>Role:</label>
                    <Select
                      className="form-control"
                      type="select"
                      name="role"
                      onChange={formik.handleChange}
                      value={formik.values.role}
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="employee">Employee</option>
                    </Select>
                    {formik.errors.role ? (
                      <div className="text-danger">{formik.errors.role}</div>
                    ) : null}
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div className="form-group">
                    <label>Gender:</label>
                    <Select
                      className="form-control"
                      type="select"
                      name="gender"
                      onChange={formik.handleChange}
                      value={formik.values.gender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Select>
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                      className="form-control"
                      name="dateOfBirth"
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.dateOfBirth}
                    />
                  </div>
                </Col>
                <Col xs={12} sm={6}>
                  <div className="form-group">
                    <label>Password:</label>
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
                <Col xs={12} sm={6}>
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
              <button className="btn btn-primary">Submit</button>
            </form>
          </Paper>
        </div>
      </Col>
    </Row>
  );
};

export default CreateUserForm;
