import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <>
      <div>WelcomePage</div>
      <Link to="/login">Login / Sign up</Link>
    </>
  );
};

export default WelcomePage;
