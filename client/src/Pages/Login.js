import React, { useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

import Button from '../Components/Button';
import InputField from '../Components/InputField';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const { setSocket } = useContext(AppContext);

  const handleJoin = () => {
    if (!username || !roomId) {
      alert('Username & roomId cannot be empty');
      return;
    }

    const socket = io(process.env.REACT_APP_API_URL);

    socket.emit('login', { name: username, room: roomId }, err => {
      if (err) {
        alert(err);
        socket.disconnect();
        return;
      }

      setSocket(socket);
      navigate(`/chat?username=${username}&room=${roomId}`);
    });
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '35px 0' }}>Join ChatroomId</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '25px' }}>
        <InputField type='text' placeholder='Username' onChange={e => setUsername(e.target.value)} />
        <InputField type='text' placeholder='Room ID' onChange={e => setRoomId(e.target.value)} />
        <Button type='submit' label='JOIN' onClick={() => handleJoin()} style={{ marginTop: '50px' }} />
      </div>
    </>
  );
};

export default Login;
