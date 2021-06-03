import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Box, Tab, Tabs, Paper } from '@material-ui/core';
import TopupPending from './TopupPending';
import TopupAccept from './TopupAccept';
import TopupReject from './TopupReject';
import { TopupContext } from '../../context/TopupContext';
import { GetUsersContext } from '../../context/GetUsersContext';

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
  const { topups, getManagerTopups } = useContext(TopupContext);

  const { employees, getEmployees } = useContext(GetUsersContext);

  useEffect(async () => {
    await getManagerTopups();
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
          <Tab label="Accept" {...a11yProps(1)} />
          <Tab label="Reject" {...a11yProps(2)} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <TopupPending topups={topups} employees={employees} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TopupAccept topups={topups} employees={employees} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TopupReject topups={topups} employees={employees} />
      </TabPanel>
    </div>
  );
}
