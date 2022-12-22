import React from 'react';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';

const layout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default layout;
