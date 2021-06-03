import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Employee/Dashboard';
import Report from './components/Report';
import History from './components/History';
import CreateNews from './components/News/CreateNews';
import Topup from './components/Manager/Topupreq';
import Transaction from './components/Manager/Transactionreq';
import NewsPage from './components/News/NewsPage';
import CreateUser from './components/Admin/CreateUser';
import Reimbursement from './components/Manager/ReimburseRequests';
import Staffs from './components/Staffs/Staffs';
import EmployeeStaffs from './components/Staffs/EmployeeStaff';
import ViewProfile from './components/ViewProfile';
import EditProfile from './components/EditProfile';
import EditUser from './components/EditUser';
import ViewUser from './components/ViewUser';
import ViewEmployee from './components/ViewEmployee';
import BankDetails from './components/BankDetail';
import ChangePassword from './components/ChangePassword';
import HelpSignIn from './components/Help/SignInHelp';
import EmployeeReimbursement from './components/Employee/EmployeeReimbursement';
import {
  BrowserRouter,
  Router,
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Landing from './components/landing';
import Login from './components/Login/login';
import Help from './components/Help/Help';
import { AuthTokenContextProvider } from './context/AuthTokenContext';
import { GetUsersContextProvider } from './context/GetUsersContext';
import { TransactionContextProvider } from './context/TransactionContext';
import { TopupContextProvider } from './context/TopupContext';
import { BankDetailsContextProvider } from './context/BankDetailsContext';
import { CardDetailsContextProvider } from './context/CardDetailsContext';
import { ReimbursementContextProvider } from './context/ReimbursementContext';
import { NewsContextProvider } from './context/NewsContext';
import { ReportsContextProvider } from './context/ReportsContext';
import {
  ProtectedRouterEmployee,
  ProtectedRouterManager,
  ProtectedRouterAdmin,
  ProtectedRouter,
  ProtectedRouterEmployeeManager,
} from './components/ProtecterRouter';

function App() {
  return (
    <React.Fragment>
      <AuthTokenContextProvider>
        <TransactionContextProvider>
          <TopupContextProvider>
            <GetUsersContextProvider>
              <ReimbursementContextProvider>
                <BankDetailsContextProvider>

                  <CardDetailsContextProvider>
                    <NewsContextProvider>
                      <ReportsContextProvider>
                        <BrowserRouter>
                          <Switch>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/help" component={Help} />

                            {/* Common Routes */}
                            <ProtectedRouter
                              exact
                              path="/Dashboard"
                              component={Dashboard}
                            />
                            <ProtectedRouter
                              exact
                              path="/NewsPage"
                              component={NewsPage}
                            />
                            <ProtectedRouter
                              exact
                              path="/EditProfile"
                              component={EditProfile}
                            />
                            <ProtectedRouter
                              exact
                              path="/ViewProfile"
                              component={ViewProfile}
                            />
                            <ProtectedRouter
                              exact
                              path="/BankDetails"
                              component={BankDetails}
                            />
                            <ProtectedRouter
                              exact
                              path="/ChangePassword"
                              component={ChangePassword}
                            />
<ProtectedRouter
                            exact
                            path="/help"
                            component={Help}
                          />
    
                            {/* Admin Routes */}
                            <ProtectedRouterAdmin
                              exact
                              path="/Staffs"
                              component={Staffs}
                            />
                            <ProtectedRouterAdmin
                              exact
                              path="/CreateUser"
                              component={CreateUser}
                            />
                            <ProtectedRouterAdmin
                              exact
                              path="/CreateNews"
                              component={CreateNews}
                            />
                            <ProtectedRouterAdmin
                              path="/EditUser/:userId"
                              component={EditUser}
                            />
                            <ProtectedRouterAdmin
                              path="/ViewUser/:userId"
                              component={ViewUser}
                            />

                            {/* Employee & Manager Routes */}
                            <ProtectedRouterEmployeeManager
                              exact
                              path="/Report"
                              component={Report}
                            />

                            {/* Manager Routes */}
                            <ProtectedRouterManager
                              exact
                              path="/Topup"
                              component={Topup}
                            />
                            <ProtectedRouterManager
                              exact
                              path="/Transaction"
                              component={Transaction}
                            />
                            <ProtectedRouterManager
                              exact
                              path="/Reimbursement"
                              component={Reimbursement}
                            />
                            <ProtectedRouterManager
                              exact
                              path="/EmployeeStaffs"
                              component={EmployeeStaffs}
                            />
                            <ProtectedRouterManager
                              path="/ViewEmployee/:userId"
                              component={ViewEmployee}
                            />

                            {/* Employee Routes */}
                            <ProtectedRouterEmployee
                              exact
                              path="/History"
                              component={History}
                            />
                            <ProtectedRouterEmployee
                              exact
                              path="/EmployeeReimburement"
                              component={EmployeeReimbursement}
                            />
                            <Route path="*" component={() => '404 NOT FOUND'} />
                          </Switch>
                        </BrowserRouter>
                      </ReportsContextProvider>
                    </NewsContextProvider>
                  </CardDetailsContextProvider>
                </BankDetailsContextProvider>
              </ReimbursementContextProvider>
            </GetUsersContextProvider>
          </TopupContextProvider>
        </TransactionContextProvider>
      </AuthTokenContextProvider>
    </React.Fragment>
  );
}

export default App;
