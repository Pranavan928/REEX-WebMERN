import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box, Paper } from '@material-ui/core';
import ReimbursementPending from './ReimbursementPending';
import ReimbursementAccept from './ReimbursementAccept';
import ReimbursementReject from './ReimbursementReject';
import { GetUsersContext } from '../../context/GetUsersContext';
import { ReimbursementContext } from '../../context/ReimbursementContext';
import { TransactionContext } from '../../context/TransactionContext';
import { BankDetailsContext } from '../../context/BankDetailsContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs() {
  const { reimbursements, getManagerReimbursement } = useContext(
    ReimbursementContext
  );
  const { getAllBankDetails, allBankDetails } = useContext(BankDetailsContext);
  const { transactions, getAllTransactions } = useContext(TransactionContext);
  const { employees, getEmployees, getManagers, managers } = useContext(
    GetUsersContext
  );

  useEffect(async () => {
    await getManagers();
  }, []);

  useEffect(async () => {
    await getAllTransactions();
  }, []);

  useEffect(async () => {
    await getAllBankDetails();
  }, []);

  useEffect(async () => {
    await getManagerReimbursement();
  }, []);

  useEffect(async () => {
    await getEmployees();
  }, []);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper
        elevation={3}
        style={{ background: '#fff', color: '#1278B8', width: 'auto' }}
      >
        <Tabs
          indicatorColor="primary"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <Tab label="Pending" {...a11yProps(0)} />
          <Tab label="Completed" {...a11yProps(1)} />
          <Tab label="Cancelled" {...a11yProps(2)} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <ReimbursementPending
          reimbursements={reimbursements}
          employees={employees}
          transactions={transactions}
          allBankDetails={allBankDetails}
          managers={managers}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ReimbursementAccept
          reimbursements={reimbursements}
          employees={employees}
          transactions={transactions}
          allBankDetails={allBankDetails}
          managers={managers}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ReimbursementReject
          reimbursements={reimbursements}
          employees={employees}
          transactions={transactions}
          allBankDetails={allBankDetails}
          managers={managers}
        />
      </TabPanel>
    </div>
  );
}
