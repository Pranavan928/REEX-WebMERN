import React from 'react';
import AddExp1 from '../../../assests/add_ex_emp1.png';
import AddExp2 from '../../../assests/add_ex_emp2.png';
import AddExp3 from '../../../assests/add_ex_emp3.png';
import AddExp4 from '../../../assests/add_ex_emp4.png';
import { Typography } from '@material-ui/core';

function Add_ExpenseHelp() {
    return (
        <div>
            <Typography variant="h6">First login to your account. then you will be directed to dashboard. in dashboard you can see a button "ADD EXPENSE". please click that..</Typography>
            <img width="auto" height="400px" src={AddExp1} alt="" />
            <br />
            <br />
            <Typography variant="h6">Then you will be directed to form like this.</Typography>
            <img width="auto" height="400px" src={AddExp2} alt="" />
            <br />
            <br />
            <Typography variant="h6">Then fill all the necessary input fields about your transaction details and click the submit button.</Typography>
            <img width="auto" height="400px" src={AddExp3} alt="" />
            <br />
            <br />
            <Typography variant="h6">If your submission is successful then you will show a alert like this.</Typography>
            <img width="auto" height="400px" src={AddExp4} alt="" />
        </div>
    )
}

export default Add_ExpenseHelp;