import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const Profile = () => {
  const auth = getAuth();

  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  const onLogOut = () => {
    auth.signOut();
    navigate('/');
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      // Update in firestore
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, { name: name });
    } catch (error) {
      toast.error('Could not update profile Details');
    }
  };

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button className='logOut' type='button' onClick={onLogOut}>
          LogOut
        </button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails(!changeDetails);
            }}
          >
            {changeDetails ? 'Done' : 'Change'}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              type='text'
              value={name}
              disabled={!changeDetails}
              onChange={onChange}
            />
            <input
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              type='email'
              value={email}
              disabled={!changeDetails}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
