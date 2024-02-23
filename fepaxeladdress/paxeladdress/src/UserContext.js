import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');

  const updateUser = (compname, web) => {
    setCompany(compname);
    setWebsite(web);
  };

  const userState = {
    company,
    website,
    updateUser,
  };

  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
};
