import React, { useEffect, useState, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  // use can compare checkingStatus to loading

  // just to remove memory leak warning
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setCheckingStatus(false);
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return { loggedIn, checkingStatus };
};

export default useAuthStatus;
