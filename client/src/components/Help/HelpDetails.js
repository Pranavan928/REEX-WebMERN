import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import SignInHelp from './SignInHelp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddExpenseHelp from './EmployeeHelp/Add_ExpenseHelp';
import AddTopupHelp from './EmployeeHelp/Add_TopupHelp';
import Report from './EmployeeHelp/Report';
import History from './EmployeeHelp/History';
import ReceivedReport from './EmployeeHelp/ReceivedReport';
import SentReport from './EmployeeHelp/SentReport';
import DeleteReport from './EmployeeHelp/DeleteReport';
import Reimbusement from './EmployeeHelp/Reimbusement';
import CreateNews from './AdminHelp/CreateNews';
import CreateUser from './AdminHelp/CreateUser';
import ViewStaff from './AdminHelp/ViewStaff';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion() {
  const AccordiansEmployee = [
    { heading: "Get Help to Sign in", component: <SignInHelp /> },
    { heading: "Get Help to Add expenses", component: <AddExpenseHelp /> },
    { heading: "Get Help to Add Topup requests", component: <AddTopupHelp /> },
    { heading: "How to view Expense and Topup history", component: <History /> },
    { heading: "Get Help to Report to Manager or Admin", component: <Report /> },
    { heading: "How to Check Received Reports", component: <ReceivedReport /> },
    { heading: "How to Check Sent Reports", component: <SentReport /> },
    { heading: "How to Delete Sent Reports", component: <DeleteReport /> },
    { heading: "How to view cash expenses", component: <Reimbusement /> },
    { heading: "How to view our profile", component: <ViewProfile /> },
    { heading: "How to edit our profile", component: <EditProfile /> },
  ]

  const AccordiansManager = [
    { heading: "How to Check Received Reports", component: <ReceivedReport /> },
    { heading: "How to Check Sent Reports", component: <SentReport /> },
    { heading: "How to view cash expenses", component: <Reimbusement /> },
    { heading: "How to View Employees", component: <ViewStaff /> },
    { heading: "How to view our profile", component: <ViewProfile /> },
    { heading: "How to edit our profile", component: <EditProfile /> },
  ]

  const AccordiansAdmin = [
    { heading: "How to create news", component: <CreateNews /> },
    { heading: "How to create users", component: <CreateUser /> },
    { heading: "How to View staffs", component: <ViewStaff /> },
    { heading: "How to view our profile", component: <ViewProfile /> },
    { heading: "How to edit our profile", component: <EditProfile /> },
  ]

  const classes = useStyles();

  var currentUser = JSON.parse(localStorage.getItem('user')); 

  return (
    <div className={classes.root}>
      {currentUser.role === 'employee' ? 
      <>
      {AccordiansEmployee.map(e => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" >{e.heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {e.component}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      </> : 
      currentUser.role === 'manager' ? 
      <>
      {AccordiansManager.map(e => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" >{e.heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {e.component}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      </> :
      currentUser.role === 'admin' ? 
      <>
      {AccordiansAdmin.map(e => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" >{e.heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {e.component}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      </> : null }
    </div>
  );
}