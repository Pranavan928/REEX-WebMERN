import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, Paper, makeStyles } from '@material-ui/core';
import ReportReceived from './ReportReceived';
import ReportSent from './ReportSent';
import { Col, Row } from 'reactstrap';
import ReportForm from './ReportForm';

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

export default function NavTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const { allUsers, sentReports, receivedReports } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Row>
        <Col xs={5} sm={5}></Col>
        <Col xs={2} sm={2}>
          <ReportForm allUsers={allUsers} />
        </Col>
        <Col xs={5} sm={5}></Col>
      </Row>
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
          <Tab label="Received" {...a11yProps(0)} />
          <Tab label="Sent" {...a11yProps(1)} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <ReportReceived receivedReports={receivedReports} allUsers={allUsers} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ReportSent sentReports={sentReports} allUsers={allUsers} />
      </TabPanel>
    </div>
  );
}
