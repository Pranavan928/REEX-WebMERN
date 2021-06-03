import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import { Select, Paper } from '@material-ui/core';
import DoubleArrowSharpIcon from '@material-ui/icons/DoubleArrowSharp';
import { SuccessMessage, FailedMessage } from '../layouts/Alert';

const NewsForm = (props) => {
  const [newsCreationStatus, setNewsCreationStatus] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      news: '',
      viewers: [],
      startDisplayOn: '',
      endDisplayOn: '',
    },
    validationSchema: yup.object({
      title: yup.string().required('Title is required'),
      news: yup.string().required('News is required'),
      // viewers: yup.array.required('viewers is required'),
      startDisplayOn: yup.string().required('Start preview date is required'),
      endDisplayOn: yup.string().required('End preview date is required'),
    }),
    // validate,
    onSubmit: (news) => {
      //   const token = localStorage.getItem('token');
      const newsViewers = [];
      if (news.viewers === 'both') {
        newsViewers.push('employee');
        newsViewers.push('manager');
      } else if (news.viewers === 'employee') {
        newsViewers.push('employee');
      } else if (news.viewers === 'manager') {
        newsViewers.push('manager');
      }
      console.log(newsViewers);
      const newsData = {
        title: news.title,
        news: news.news,
        viewers: newsViewers,
        startDisplayOn: news.startDisplayOn,
        endDisplayOn: news.endDisplayOn,
      };
      console.log(newsData);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      axios
        .post('http://localhost:3000/news', newsData, config)
        .then((res) => {
          setNewsCreationStatus('success');
        })
        .catch((err) => {
          setNewsCreationStatus('fail');
        });
    },
  });

  return (
    <Row>
      <Col xs={12} sm={2}></Col>
      <Col xs={12} sm={8}>
        <div className="container">
          <Paper elevation={4} style={{ padding: '20px' }}>
            {/* {submissionStatus === 'success' ? <SubmitSuccess /> : null}
            {submissionStatus === 'fail' ? <SubmitFailed /> : null} */}
            <h3 style={{ textAlign: 'center' }}>Create News</h3>
            <hr />
            {newsCreationStatus === 'success' ? (
              <SuccessMessage message="News Created Successfully" />
            ) : null}
            {newsCreationStatus === 'fail' ? (
              <FailedMessage message="Failed to Create News" />
            ) : null}
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <Row>
                <Col xs={12} sm={12}>
                  <div className="form-group">
                    <label>Title:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="title"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                    {formik.errors.title ? (
                      <div className="text-danger">{formik.errors.title}</div>
                    ) : null}
                  </div>
                </Col>
                <Col xs={12} sm={12}>
                  <div className="form-group">
                    <label>News:</label>
                    <textarea
                      style={{ height: 200 }}
                      className="form-control"
                      type="text"
                      name="news"
                      onChange={formik.handleChange}
                      value={formik.values.news}
                    />
                    {formik.errors.news ? (
                      <div className="text-danger">{formik.errors.news}</div>
                    ) : null}
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div className="form-group">
                    <label>Viewers:</label>
                    <Select
                      className="form-control"
                      type="select"
                      name="viewers"
                      onChange={formik.handleChange}
                      value={formik.values.viewers}
                    >
                      <option value="manager">Managers</option>
                      <option value="employee">Employees</option>
                      <option value="both">For All </option>
                    </Select>
                    {formik.errors.viewers ? (
                      <div className="text-danger">{formik.errors.viewers}</div>
                    ) : null}
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div className="form-group">
                    <label>Start Display on:</label>
                    <input
                      className="form-control"
                      name="startDisplayOn"
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.startDisplayOn}
                    />
                    {formik.errors.startDisplayOn ? (
                      <div className="text-danger">
                        {formik.errors.startDisplayOn}
                      </div>
                    ) : null}
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div className="form-group">
                    <label>End Display on:</label>
                    <input
                      className="form-control"
                      name="endDisplayOn"
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.endDisplayOn}
                    />
                    {formik.errors.endDisplayOn ? (
                      <div className="text-danger">
                        {formik.errors.endDisplayOn}
                      </div>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <button className="btn btn-primary">
                Post News <DoubleArrowSharpIcon />
              </button>
            </form>
          </Paper>
        </div>
      </Col>
      <Col xs={12} sm={2}></Col>
    </Row>
  );
};

export default NewsForm;
