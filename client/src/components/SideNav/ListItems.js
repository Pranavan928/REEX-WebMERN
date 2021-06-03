import React, { useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CachedIcon from '@material-ui/icons/Cached';
import HistoryIcon from '@material-ui/icons/History';
import PeopleIcon from '@material-ui/icons/People';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import LaunchIcon from '@material-ui/icons/Launch';
import { Link, Redirect } from 'react-router-dom';
import { AuthTokenContext } from '../../context/AuthTokenContext';
import '../../App.css';

function ListItems(props) {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const { authData } = useContext(AuthTokenContext);
  return (
    <div className='list'>
      {currentUser.role === 'employee' ? (
        <div>
          <Link className="nav-link" to="/Dashboard">
            <span className="sr-only"></span>
            <ListItem>
              <ListItemIcon className="ji">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link className="nav-link" to="/NewsPage">
            <ListItem>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="NewsPage" />
            </ListItem>
          </Link>
          <Link className="nav-link" to="/History">
            <ListItem>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="History" />
            </ListItem>
          </Link>
          <Link className="nav-link" to="/Report">
            <ListItem>
              <ListItemIcon>
                <ErrorOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Report" />
            </ListItem>
          </Link>
          <Link className="nav-link" to="/EmployeeReimburement">
            <ListItem>
              <ListItemIcon>
                <CachedIcon />
              </ListItemIcon>
              <ListItemText primary="Reimbursement" />
            </ListItem>
          </Link>
        </div>
      ) : currentUser.role === 'manager' ? (
        <div>
          <Link className="nav-link" to="/Dashboard">
            <span className="sr-only"></span>
            <ListItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link className="nav-link" to="/NewsPage">
            <ListItem>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="NewsPage" />
            </ListItem>
          </Link>
          <Link className="nav-link" to="/Topup">
            <span className="sr-only"></span>
            <ListItem>
              <ListItemIcon>
                <HowToVoteIcon />
              </ListItemIcon>
              <ListItemText primary="Topup" />
            </ListItem>
          </Link>
          <Link className="nav-link" to="/Transaction">
            <span className="sr-only"></span>
            <ListItem>
              <ListItemIcon>
                <LaunchIcon />
              </ListItemIcon>
              <ListItemText primary="Transaction" />
            </ListItem>
          </Link>
          <Link className="nav-link" to="/Report">
            <ListItem>
              <ListItemIcon>
                <ErrorOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Report" />
            </ListItem>
          </Link>
          <Link className="nav-link" to="/Reimbursement">
            <ListItem>
              <ListItemIcon>
                <CachedIcon />
              </ListItemIcon>
              <ListItemText primary="Reimbursement" />
            </ListItem>
          </Link>
          <Link className="nav-link" to="/EmployeeStaffs">
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="EmployeeStaffs" />
            </ListItem>
          </Link>
        </div>
      ) : currentUser.role === 'admin' ? (
        <div>
          <Link className="nav-link" to="/Dashboard">
            <span className="sr-only"></span>
            <ListItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link className="nav-link" to="/NewsPage">
            <ListItem>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="NewsPage" />
            </ListItem>
          </Link>
          <Link className="nav-link" to="/Staffs">
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Staffs" />
            </ListItem>
          </Link>
        </div>
      ) : currentUser.role === null || currentUser.role === '' ? (
        <div>
          <Redirect to={'/login'} />;
        </div>
      ) : (
        <div>
          <p>Please login</p>
        </div>
      )}
    </div>
  );
}
export default ListItems;
