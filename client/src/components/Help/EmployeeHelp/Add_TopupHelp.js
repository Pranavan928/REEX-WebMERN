import React from 'react';
import AddTop1 from '../../../assests/add_topup_emp1.png';
import AddTop2 from '../../../assests/add_topup_emp2.png';
import AddTop3 from '../../../assests/add_topup_emp3.png';
import { Typography } from '@material-ui/core';

function Add_TopupHelp() {
    return (
        <div>
            <Typography variant="h6">First login to your account. then you will be directed to dashboard. in dashboard you can see a button "TOPUP". please click that..</Typography>
            <img width="auto" height="400px" src={AddTop1} alt="" />
            <br />
            <br />
            <Typography variant="h6">Then you will be directed to form like this. Then fill all the necessary input fields about your transaction details and click the submit button.</Typography>
            <img width="auto" height="400px" src={AddTop2} alt="" />
            <br />
            <br />
            <Typography variant="h6">If your submission is successful then you will show a alert like this..</Typography>
            <img width="auto" height="400px" src={AddTop3} alt="" />
        </div>
    )
}

export default Add_TopupHelp;