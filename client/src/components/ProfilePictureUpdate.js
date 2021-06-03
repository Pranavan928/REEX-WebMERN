import React, { useState, useEffect, useContext } from 'react';
import DefaultProf from './Admin/profImg.jpg';
import { Button } from 'reactstrap';
import axios from 'axios';
import { SuccessMessage, FailedMessage } from './layouts/Alert';
import { Input } from 'reactstrap';
import { GetUsersContext } from '../context/GetUsersContext';

function ProfilePictureUpdate(props) {
  const [profileImage, setProfileImage] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const { reloadUser } = useContext(GetUsersContext);

  const userDetails = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (profileImageUrl) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const dataa = JSON.stringify({
        profilePictureUrl: profileImageUrl,
      });

      axios
        .patch('http://localhost:3000/users/me', dataa, config)
        .then((res) => {
          reloadUser();
          setSubmissionStatus('success');
        })
        .catch((err) => {
          setSubmissionStatus('failed');
        });
    }
  }, [profileImageUrl]);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', profileImage);
    data.append('upload_preset', 'receipt-expense-management');
    data.append('cloud_name', 'avok');
    fetch('https://api.cloudinary.com/v1_1/avok/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileImageUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
        setSubmissionStatus('failed');
      });
  };

  return (
    <div style={{ textAlign: 'center', paddingBottom: 10 }}>
      <form onSubmit={(e) => onSubmit(e)}>
        {userDetails.profilePictureUrl ? (
          <img style={{width:"100%", height:"450px"}} src={userDetails.profilePictureUrl} />
        ) : (
          <img style={{width:"100%", height:"450px"}} src={DefaultProf} alt="" />
        )}
        <br />
        <br />
        <Input
          className="form-control"
          type="file"
          name="profImg"
          required
          onChange={(e) => setProfileImage(e.target.files[0])}
          id="profImg"
        />
        <br />
        {submissionStatus === 'success' ? (
          <SuccessMessage message="Profile Picture Successfully Updated. Please Refresh." />
        ) : null}
        {submissionStatus === 'failed' ? (
          <FailedMessage message="Failed to update profile picture." />
        ) : null}
        <Button color="primary" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
}

export default ProfilePictureUpdate;
