import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfile, selectProfile} from '@/features/profileSlice';
import Loader from '../UI/Loader';

const LoginRequired = ({children}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {data: profileData, status} = useSelector(selectProfile);

  useEffect(() => {
    if(status==="idle"){
    dispatch(fetchProfile());
    }
  }, [dispatch, profileData, status]);

  if (status === 'loading') {
    return <Loader/>;
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
