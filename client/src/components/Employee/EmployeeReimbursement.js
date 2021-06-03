import React, { useContext, useEffect } from 'react';
import { Box, Container } from '@material-ui/core';
import Sidenav from '../SideNav/Sidenav';
import Footer from '../Footer/Footer';
import { ReimbursementContext } from '../../context/ReimbursementContext';
import { GetUsersContext } from '../../context/GetUsersContext';
import { TransactionContext } from '../../context/TransactionContext';
import { BankDetailsContext } from '../../context/BankDetailsContext';
import EmployeeReimbursementData from './EmployeeReimbursementData';
import { useStyles } from '../../components/Styles';

export default function EmployeeReimbursement() {
  const classes = useStyles();

  const { transactions, getEmployeeTransactions } = useContext(
    TransactionContext
  );

  const { bankDetails, getUserBankDetails } = useContext(BankDetailsContext);

  const { getManagers, managers } = useContext(GetUsersContext);

  const {
    reimbursements,
    getEmployeeReimbursement,
    getManagerReimbursement,
  } = useContext(ReimbursementContext);

  useEffect(async () => {
    await getUserBankDetails();
  }, []);

  useEffect(async () => {
    await getEmployeeTransactions();
  }, []);

  useEffect(async () => {
    await getEmployeeReimbursement();
  }, []);

  useEffect(async () => {
    await getManagers();
  }, []);

  return (
    <div className={classes.root}>
      <Sidenav />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <EmployeeReimbursementData
            managers={managers}
            reimbursements={reimbursements}
            transactions={transactions}
            bankDetails={bankDetails}
          />
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
