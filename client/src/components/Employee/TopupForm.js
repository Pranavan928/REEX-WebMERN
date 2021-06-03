import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { InputGroup, InputGroupText } from 'reactstrap';
import axios from 'axios';
import { GetUsersContext } from '../../context/GetUsersContext';
import { SubmitSuccess, SubmitFailed } from '../layouts/Alert';

function TopupForm(props) {
  const [formData, setFormData] = useState();
  const [submissionStatus, setSubmissionStatus] = useState('');
  const { getManagers, managers } = useContext(GetUsersContext);

  const token = localStorage.getItem('token');

  useEffect(() => {
    getManagers();
  }, []);

  useEffect(() => { }, [managers]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post('http://localhost:3000/topUpRequest', formData, config)
      .then((res) => setSubmissionStatus('success'))
      .catch((err) => {
        setSubmissionStatus('fail');
      });
  };
  return (
    <Form onSubmit={(e) => onSubmit(e)} className="container">
      <FormGroup>
        {submissionStatus === 'success' ? <SubmitSuccess /> : null}
        {submissionStatus === 'fail' ? <SubmitFailed /> : null}
        <Label for="managerelect">Manager</Label>
        <Input
          required
          type="select"
          className="form-control"
          name="requestTo"
          onChange={(e) => onChange(e)}
          placeholder="Manager"
        >
          <option aria-label="None" value="" />
          {managers?.map((manager) => (
            <option key={manager._id} value={manager._id}>
              {manager.userId} - {manager.name}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="amount">Amount</Label>
        <InputGroup>
          <InputGroupText>Rs.</InputGroupText>
          <Input
            placeholder="Amount"
            required
            name="amount"
            onChange={(e) => onChange(e)}
            min={0}
            max={100000}
            type="number"
            step="1"
          />
          <InputGroupText>.00</InputGroupText>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Description</Label>
        <Input
          type="textarea"
          name="description"
          onChange={(e) => onChange(e)}
          id="exampleText"
        />
      </FormGroup>
      <div className="SubmitBtn">
        <Button type="sunbmit">Submit</Button>
      </div>
    </Form>
  );
}

export default TopupForm;
