import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import { Paper } from '@material-ui/core';
import DefaultProf from './Admin/profImg.jpg';
import ExpenseProgress from './Employee/ExpenseProgress';
import TopupProgress from './Employee/TopupProgress';
import ReimbursementProgress from './Employee/ReimbursementProgress';
import { SuccessMessage, FailedMessage } from './layouts/Alert';

const ViewEmployeeForm = (props) => {
    const {
        selectedUser,
        allBankDetails,
        transactions,
        topups,
        reimbursements,
    } = props;

    const [updateStatus, setUpdateStatus] = useState();
    const [deleteStatus, setDeleteStatus] = useState();

    const getDate = (realDate) => {
        const datee = new Date(realDate);
        const year = datee.getUTCFullYear();
        const month = datee.getUTCMonth();
        const date = datee.getUTCDate();
        const correctDate = date + '-' + (month + 1) + '-' + year;
        return correctDate;
    };

    let resetPasswordUrl = '';

    let selectedUserCopy = {
        name: '',
        email: '',
        userId: '',
        gender: '',
        role: '',
        dateOfBirth: '',
        mobileNumber: '',
        profilePictureUrl: '',
    };

    let selectedUserBankDetail = {};
    let selectedUserTransactions = [];
    let selectedUserTopups = [];
    let selectedUserReimbursements = [];
    let editUserUrl = '';
    let deleteUserUrl = '';

    if (selectedUser && allBankDetails) {
        selectedUserCopy.name = selectedUser[0].name;
        selectedUserCopy.email = selectedUser[0].email;
        selectedUserCopy.userId = selectedUser[0].userId;
        selectedUserCopy.gender = selectedUser[0].gender;
        selectedUserCopy.role = selectedUser[0].role;
        selectedUserCopy.dateOfBirth = getDate(selectedUser[0].dateOfBirth);
        selectedUserCopy.mobileNumber = selectedUser[0].mobileNumber;
        selectedUserCopy.profilePictureUrl = selectedUser[0].profilePictureUrl;

        editUserUrl = '/EditUser/' + selectedUser[0].userId;

        resetPasswordUrl =
            'http://localhost:3000/userUpdate/' + selectedUser[0]._id;

        deleteUserUrl = 'http://localhost:3000/users/' + selectedUser[0]._id;

        selectedUserBankDetail = allBankDetails.find(
            (bankDetail) => bankDetail.owner === selectedUser[0]._id
        );
    }

    if (selectedUser && transactions) {
        if (selectedUser[0].role === 'employee') {
            transactions.map((transaction) => {
                if (transaction.transactionBy === selectedUser[0]._id) {
                    selectedUserTransactions.push(transaction);
                }
            });
        } else if (selectedUser[0].role === 'manager') {
            transactions.map((transaction) => {
                if (transaction.managerIncharge === selectedUser[0]._id) {
                    selectedUserTransactions.push(transaction);
                }
            });
        }
    }

    if (selectedUser && topups) {
        if (selectedUser[0].role === 'employee') {
            topups.map((topup) => {
                if (topup.requestBy === selectedUser[0]._id) {
                    selectedUserTopups.push(topup);
                }
            });
        } else if (selectedUser[0].role === 'manager') {
            topups.map((topup) => {
                if (topup.requestTo === selectedUser[0]._id) {
                    selectedUserTopups.push(topup);
                }
            });
        }
    }

    if (selectedUser && reimbursements) {
        if (selectedUser[0].role === 'employee') {
            reimbursements.map((reimbursement) => {
                if (reimbursement.reimbursementTo === selectedUser[0]._id) {
                    selectedUserReimbursements.push(reimbursement);
                }
            });
        } else if (selectedUser[0].role === 'manager') {
            reimbursements.map((reimbursement) => {
                if (reimbursement.reimbursementBy === selectedUser[0]._id) {
                    selectedUserReimbursements.push(reimbursement);
                }
            });
        }
    }

    //.....................User Details...........................
    const [detail, setDetail] = useState(false);

    const extraDetail = (
        <Paper elevation={4} style={{ padding: 10, fontFamily: 'Montserrat' }}>
            <br />
            <Row>
                <Col xs={12} sm={6}>
                    <div className="form-group">
                        <label>
                            <span style={{ fontWeight: 'bold' }}>Name : </span>
                            {selectedUserCopy.name}
                        </label>
                    </div>
                </Col>

                <Col xs={12} sm={6}>
                    <div className="form-group">
                        <label>
                            <span style={{ fontWeight: 'bold' }}>Email : </span>
                            {selectedUserCopy.email}
                        </label>
                    </div>
                </Col>
                <Col xs={12} sm={4}>
                    <div className="form-group">
                        <label>
                            <span style={{ fontWeight: 'bold' }}>UserID : </span>
                            {selectedUserCopy.userId}
                        </label>
                    </div>
                </Col>
                <Col xs={12} sm={4}>
                    <div className="form-group">
                        <label>
                            <span style={{ fontWeight: 'bold' }}>Gender : </span>
                            {selectedUserCopy.gender}
                        </label>
                    </div>
                </Col>
                <Col xs={12} sm={4}>
                    <div className="form-group">
                        <label>
                            <span style={{ fontWeight: 'bold' }}>Role : </span>
                            {selectedUserCopy.role}
                        </label>
                    </div>
                </Col>
                <Col xs={12} sm={6}>
                    <div className="form-group">
                        <label>
                            <span style={{ fontWeight: 'bold' }}>Date of Birth : </span>
              1997-12-07
            </label>
                    </div>
                </Col>
                <Col xs={12} sm={6}>
                    <div className="form-group">
                        <label>
                            <span style={{ fontWeight: 'bold' }}>Mobile Number : </span>
                            {selectedUserCopy.mobileNumber}
                        </label>
                    </div>
                </Col>
            </Row>
        </Paper>
    );
    const PersonalDetailLink = detail
        ? 'Personal Details << '
        : 'Personal Details >> ';

    //.....................Bank Details...........................
    const [bankDetail, setBankDetail] = useState(false);
    const extraBankDetail = (
        <Paper elevation={4} style={{ padding: 10 }}>
            <br />
            <Row>
                <Col xs={12} sm={6}>
                    <div className="form-group">
                        <label>
                            <span style={{ fontWeight: 'bold' }}>Account Number : </span>
                            {selectedUserBankDetail
                                ? selectedUserBankDetail.accountNumber
                                : null}
                        </label>
                    </div>
                </Col>
                <Col xs={12} sm={6}>
                    <div className="form-group">
                        <label>
                            <span style={{ fontWeight: 'bold' }}>Bank Name : </span>
                            {selectedUserBankDetail ? selectedUserBankDetail.bank : null}
                        </label>
                    </div>
                </Col>
                <Col xs={12} sm={6}>
                    <div className="form-group">
                        <label>
                            <span style={{ fontWeight: 'bold' }}>Branch Name :</span>
                            {selectedUserBankDetail ? selectedUserBankDetail.branch : null}
                        </label>
                    </div>
                </Col>
            </Row>
        </Paper>
    );
    const PersonalBankDetailLink = bankDetail
        ? 'Bank Details << '
        : 'Bank Details >> ';

    //.....................User Progress...........................
    const [userProgress, setUserProgress] = useState(false);
    const extraProgressDetail = (
        <div>
            <Paper elevation={4} style={{ padding: 10 }}>
                <ExpenseProgress selectedUserTransactions={selectedUserTransactions} />
            </Paper>
            <br />
            <Paper elevation={4} style={{ padding: 10 }}>
                <TopupProgress selectedUserTopups={selectedUserTopups} />
            </Paper>
            <br />
            <Paper elevation={4} style={{ padding: 10 }}>
                <ReimbursementProgress
                    selectedUserReimbursements={selectedUserReimbursements}
                />
            </Paper>
        </div>
    );
    const ProgressLink = userProgress ? 'User Progress << ' : 'User Progress >> ';

    const onPasswordReset = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        axios
            .patch(resetPasswordUrl, { password: 'kovarthanan' }, config)
            .then((res) => {
                setUpdateStatus(true);
            })
            .catch((err) => {
                console.log(err);
                setUpdateStatus(false);
            });
    };

    const onDeleteuser = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        axios
            .delete(deleteUserUrl, config)
            .then((res) => {
                setDeleteStatus(true);
            })
            .catch((err) => {
                console.log(err);
                setDeleteStatus(false);
            });
    };

    return (
        <Row style={{ fontSize: 18 }}>
            <Col xs={12} sm={4}>
                <Paper Container elevation={4}>
                    {selectedUserCopy.profilePictureUrl === null ? (
                        <img
                            style={{ width: '100%', height: 'auto' }}
                            src={DefaultProf}
                            alt=""
                        />
                    ) : (
                        <img
                            style={{ width: '100%', height: 'auto' }}
                            src={selectedUserCopy.profilePictureUrl}
                        />
                    )}
                </Paper>
            </Col>
            <Col xs={12} sm={8}>
                <div className="container">
                    <Paper elevation={4} style={{ padding: '20px' }}>
                        <a
                            style={{
                                textDecoration: 'none',
                                cursor: 'pointer',
                                fontSize: 20,
                            }}
                            className="read-more-link"
                            onClick={() => {
                                setDetail(!detail);
                            }}
                        >
                            <span>{PersonalDetailLink}</span>
                        </a>
                        {detail && extraDetail}

                        {selectedUserCopy.role === 'employee' ? (
                            <React.Fragment>
                                <br />
                                <br />
                                <a
                                    style={{
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        fontSize: 20,
                                    }}
                                    className="read-more-link"
                                    onClick={() => {
                                        setBankDetail(!bankDetail);
                                    }}
                                >
                                    <span>{PersonalBankDetailLink}</span>
                                </a>
                                {bankDetail && extraBankDetail}
                            </React.Fragment>
                        ) : null}

                        {selectedUserCopy.role !== 'admin' ? (
                            <React.Fragment>
                                <br />
                                <br />
                                <a
                                    style={{
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        fontSize: 20,
                                    }}
                                    className="read-more-link"
                                    onClick={() => {
                                        setUserProgress(!userProgress);
                                    }}
                                >
                                    <span>{ProgressLink}</span>
                                </a>
                                {userProgress && extraProgressDetail}
                            </React.Fragment>
                        ) : null}

                        <br />
                        <hr />
                        {updateStatus === true ? (
                            <SuccessMessage message="Password set to default password" />
                        ) : null}
                        {deleteStatus === true ? (
                            <SuccessMessage message="User Successfully Deleted." />
                        ) : null}
                        {deleteStatus === false ? (
                            <FailedMessage message="Delete User Failed." />
                        ) : null}
                        {updateStatus === false ? (
                            <FailedMessage message="Error to set default password" />
                        ) : null}
                    </Paper>
                </div>
            </Col>
        </Row>
    );
};

export default ViewEmployeeForm;
