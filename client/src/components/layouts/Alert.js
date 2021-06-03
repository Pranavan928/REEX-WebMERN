import React from 'react';
import { Alert } from 'reactstrap';

export const SubmitSuccess = function (props) {
  return (
    <div>
      <Alert color="success">
        Successfully Submitted. Please close the form
      </Alert>
    </div>
  );
};

export const SuccessMessage = function (props) {
  return (
    <div>
      <Alert color="success">{props.message}</Alert>
    </div>
  );
};

export const FailedMessage = function (props) {
  return (
    <div>
      <Alert color="danger">{props.message}</Alert>
    </div>
  );
};

export const SubmitFailed = function (props) {
  return (
    <div>
      <Alert color="danger">Submission Failed. Please check</Alert>
    </div>
  );
};

export const passwordNotMatched = function (props) {
  return (
    <div>
      <Alert color="danger">Passwords did not matched.Please try again.</Alert>
    </div>
  );
};

export const LoginFailed = function (props) {
  return (
    <div>
      <Alert color="danger">Login Failed. Please try again</Alert>
    </div>
  );
};
