import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupText } from 'reactstrap';
import { GetUsersContext } from '../../context/GetUsersContext';
import axios from 'axios';
import { SubmitSuccess, SubmitFailed } from '../layouts/Alert';
import { useStyles } from '../../components/Styles';

function AddExpenseForm(props) {
  const { getManagers, managers } = useContext(GetUsersContext);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    getManagers();
  }, []);

  useEffect(() => { }, [managers]);

  const [managerIncharge, setManagerIncharge] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [receiptImage, setReceiptImage] = useState('');
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [receiptUrl, setReceiptUrl] = useState('');

  useEffect(() => {
    if (receiptUrl) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const dataa = JSON.stringify({
        managerIncharge: managerIncharge,
        category: category,
        paymentMethod: paymentMethod,
        amount: amount,
        description: description,
        transactionDate: transactionDate,
        receiptUrl: receiptUrl,
      });

      axios
        .post('http://localhost:3000/transaction', dataa, config)
        .then((res) => setSubmissionStatus('success'))
        .catch((err) => {
          setSubmissionStatus('fail');
        });
    }
  }, [receiptUrl]);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', receiptImage);
    data.append('upload_preset', 'receipt-expense-management');
    data.append('cloud_name', 'avok');
    fetch('https://api.cloudinary.com/v1_1/avok/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setReceiptUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const classes = useStyles();

  return (
    <Form
      onSubmit={(e) => onSubmit(e)}
      className="container"
      encType="multipart/form-data"
    >
      <FormGroup>
        <Label for="managerSelect">To</Label>

        <Input
          required
          type="select"
          className="form-control"
          name="managerIncharge"
          placeholder="Manager"
          onChange={(e) => setManagerIncharge(e.target.value)}
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
        <Label for="categorySelect">Category</Label>
        <Input
          required
          type="select"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option aria-label="None" value="" />
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Hotel">Accomodation</option>
          <option value="Other">Other</option>
        </Input>
      </FormGroup>
      <FormGroup className={classes.container} noValidate>
        <Label for="TransactionDate">Transaction Date</Label>
        <Input
          required
          type="date"
          name="transactionDate"
          onChange={(e) => setTransactionDate(e.target.value)}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="paymentSelect">Payment Method</Label>
        <Input
          required
          type="select"
          name="paymentMethod"
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option aria-label="None" value="" />
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
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
            onChange={(e) => setAmount(e.target.value)}
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
          onChange={(e) => setDescription(e.target.value)}
          id="exampleText"
        />
      </FormGroup>
      <FormGroup>
        <Label for="receiptImage">Attach Receipt</Label>
        <Input
          type="file"
          name="receiptImage"
          onChange={(e) => setReceiptImage(e.target.files[0])}
          id="receiptImage"
        />
        <FormText color="muted">
          {submissionStatus === 'success' ? <SubmitSuccess /> : null}
          {submissionStatus === 'fail' ? <SubmitFailed /> : null}
        </FormText>
      </FormGroup>
      <div className="SubmitBtn">
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
}

export default AddExpenseForm;
