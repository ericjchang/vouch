import React, { useState, createContext } from 'react';
import axios from 'axios';

const AppContext = createContext();

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  timeout: 1000,
});

const AppProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  return <AppContext.Provider value={{ axios: axiosInstance, socket, setSocket }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
