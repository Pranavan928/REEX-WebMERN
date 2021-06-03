import React, { useEffect, useContext, useState } from 'react';
import Sidenav from '../components/SideNav/Sidenav';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ViewUserForm from './ViewUserForm';
import Copyright from '../components/Footer/Footer';
import { GetUsersContext } from '../context/GetUsersContext';
import { BankDetailsContext } from '../context/BankDetailsContext';
import { ReimbursementContext } from '../context/ReimbursementContext';
import { TopupContext } from '../context/TopupContext';
import { TransactionContext } from '../context/TransactionContext';
import { useStyles } from '../components/Styles';

export default function CreateUser(props) {
  const classes = useStyles();
  let viewUserId = props.match.params.userId;
  let selectedUserId = '';

  const { getSelectedUser, selectedUser } = useContext(GetUsersContext);
  const { allBankDetails, getAllBankDetails } = useContext(BankDetailsContext);
  const { transactions, getAllTransactions } = useContext(TransactionContext);
  const { topups, getAllTopups } = useContext(TopupContext);
  const { getAllReimbursement, reimbursements } = useContext(
    ReimbursementContext
  );

  useEffect(() => {
    getSelectedUser(viewUserId);
  }, []);

  useEffect(() => {
    getAllTransactions();
  }, []);

  useEffect(() => {
    getAllReimbursement();
  }, []);

  useEffect(() => {
    getAllTopups();
  }, []);

  useEffect(() => {
    getAllBankDetails();
  }, []);

  return (
    <div className={classes.root}>
      <Sidenav />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <ViewUserForm
            selectedUser={selectedUser}
            allBankDetails={allBankDetails}
            transactions={transactions}
            topups={topups}
            reimbursements={reimbursements}
          />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
