import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getUser } from '../../store/selectors';

const PrivateRouter: React.FC<{ children: any }> = (props) => {
  const user = useAppSelector(getUser);

  if (user.role !== 'admin') {
    return <Navigate to={'/courses'} />;
  }

  return <div>{props.children}</div>;
};

export default PrivateRouter;
