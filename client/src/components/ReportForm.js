import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { SuccessMessage, FailedMessage } from './layouts/Alert';

const ModalExample = (props) => {
  const { className, allUsers } = props;

  const [modal, setModal] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState();

  const toggle = () => setModal(!modal);

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      title,
      message,
      receiver,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    axios
      .post('http://localhost:3000/report', data, config)
      .then((res) => {
        setSubmissionStatus('success');
        setTimeout(() => {
          setSubmissionStatus('');
        }, 5000);
      })
      .catch((err) => {
        setSubmissionStatus('failed');
        setTimeout(() => {
          setSubmissionStatus('');
        }, 5000);
      });
  };
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <a onClick={toggle}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </a>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        style={{ paddingTop: 50 }}
      >
        <ModalHeader toggle={toggle} close={closeBtn}>
          Create Report
        </ModalHeader>
        {submissionStatus === 'success' ? (
          <SuccessMessage message="Report Successfully Submitted" />
        ) : null}
        {submissionStatus === 'failed' ? (
          <FailedMessage message="Report Submittion failed" />
        ) : null}
        <ModalBody>
          <Form
            onSubmit={(e) => onSubmit(e)}
            className="container"
            encType="multipart/form-data"
          >
            <FormGroup>
              <Label for="categorySelect">Receiver</Label>
              <Input
                required
                type="select"
                name="sender"
                onChange={(e) => setReceiver(e.target.value)}
              >
                <option aria-label="None" value="" />
                {allUsers
                  ? allUsers.map((user) => {
                      if (currentUser._id !== user._id) {
                        return (
                          <option value={user._id}>
                            {' '}
                            {user.userId} - {user.name} ({user.role})
                          </option>
                        );
                      }
                    })
                  : null}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="paymentSelect">Title</Label>
              <Input
                required
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Message</Label>
              <Input
                type="textarea"
                name="message"
                onChange={(e) => setMessage(e.target.value)}
                id="exampleText"
              />
            </FormGroup>
            <div className="SubmitBtn">
              <Button color="primary" type="submit">
                Send Report
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalExample;
