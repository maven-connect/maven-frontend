import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfile} from '@/features/profileSlice';

const LoginRequired = ({navStat, children}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {data: profileData, status} = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (profileData && status === 'failed') {
    router.push('/login');
    return null;
  }
  if (status === 'succeeded') {
    return <>{children}</>;
  }
};

export default LoginRequired;
