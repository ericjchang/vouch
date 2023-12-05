import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import ChatRoom from './Pages/ChatRoom';

const App = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/chat' element={<ChatRoom />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
