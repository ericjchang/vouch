import React, { useContext, useState, useEffect, memo, createRef, useRef, forwardRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import InputField from '../Components/InputField';

const ChatContainer = forwardRef(function ChatContainerRef({ from, children, username }, ref) {
  let style = null;
  let triangleStyle = null;
  if (from === 'user') {
    style = {
      alignSelf: 'flex-end',
      color: 'white',
      padding: 15,
      maxWidth: '30vh',
      background: '#5DB075',
      borderRadius: 12,
      marginRight: '10px',
    };
    triangleStyle = {
      marginRight: '10px',
      alignSelf: 'flex-end',
      width: 0,
      height: 0,
      borderTop: '20px solid #5DB075',
      borderLeft: '20px solid transparent',
      marginTop: -10,
      marginBottom: 12,
    };
  } else {
    style = {
      marginLeft: '10px',
      padding: 15,
      borderRadius: 12,
      maxWidth: '30vh',
      background: '#f6f6f6',
      alignSelf: 'flex-start',
    };

    triangleStyle = {
      width: 0,
      height: 0,
      borderTop: '20px solid #f6f6f6',
      borderRight: '20px solid transparent',
      marginTop: -8,
      marginBottom: 12,
      marginLeft: '10px',
    };
  }

  return (
    <>
      {from !== 'user' && <div style={{ fontSize: 14, marginLeft: '12px' }}>{username}</div>}
      <div ref={ref} style={style}>
        {children}
      </div>
      <div style={triangleStyle}></div>
    </>
  );
});

const ChatListMemo = memo(
  function ChatList({ chats, onScroll }) {
    const [queryParameters] = useSearchParams();
    const username = queryParameters.get('username');

    let chatRef = createRef();
    let ChatContainerRef = createRef();

    useEffect(() => {
      ChatContainerRef.current.addEventListener('scroll', e => onScroll(e, ChatContainerRef.current));
      if (chatRef.current) {
        chatRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    });

    return (
      <div
        ref={ChatContainerRef}
        style={{
          width: '100%',
          height: '88%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        {chats.map((val, idx) => {
          return (
            <ChatContainer
              ref={chatRef}
              username={val.username}
              from={val.username === username ? 'user' : 'other'}
              key={idx}
            >
              {val.message}
            </ChatContainer>
          );
        })}
      </div>
    );
  },
  () => {}
);

const ChatRoom = () => {
  const [queryParameters] = useSearchParams();
  const room = queryParameters.get('room');
  const [message, setMessage] = useState('');
  const [chatData, setChatData] = useState({
    data: [],
    page: 1,
    total_page: 1,
  });

  let { socket, axios } = useContext(AppContext);
  const navigate = useNavigate();

  const GetChatData = (reset = false) => {
    if (reset) {
      chatData.data = [];
      chatData.page = 1;
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/chat`, {
        params: {
          page: chatData.page,
          room,
        },
      })
      .then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          console.log(i);
          chatData.data.unshift(res.data.data[i]);
        }
        chatData.total_page = res.data.total_page;
        setChatData({
          ...chatData,
        });
      });
  };

  useEffect(() => {
    if (room) {
      GetChatData(true);
    }
  }, [axios, room]);

  const messageRef = useRef(null);

  useEffect(() => {
    if (socket) {
      if (!messageRef.current) {
        socket.on('message', data => {
          chatData.data.push(data);
          setChatData({
            ...chatData,
          });
        });
        messageRef.current = true;
      }
    }
  }, [socket, chatData]);

  const handleSendMessage = () => {
    if (socket) {
      if (message.length > 0) {
        socket.emit('sendMessage', message, err => {
          if (err) {
            alert(err);
            console.log('error', err);
          } else {
            setMessage('');
          }
        });
      }
    } else {
      alert('connection error');
      navigate('/');
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '50px',
            flexDirection: 'column',
            alignContent: 'center',
            marginBottom: '25px',
            paddingLeft: '25px',
          }}
        >
          <span
            onClick={() => {
              if (socket) socket.disconnect();
              navigate('/');
            }}
            style={{ color: '#5DB075', cursor: 'pointer', fontSize: '20px' }}
          >
            Exit
          </span>
          <div style={{ alignSelf: 'center', position: 'absolute', fontSize: '25px' }}>{room}</div>
        </div>
        <ChatListMemo
          chats={chatData.data}
          onScroll={(e, el) => {
            if (el && el?.scrollTop === 0 && chatData.page < chatData.total_page) {
              chatData.page += 1;
              setChatData({
                ...chatData,
              });
              GetChatData();
            }
          }}
        />
        <div
          style={{
            padding: '0 10px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <InputField
            value={message}
            onInput={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Message here...'
            style={{ marginBottom: '10px', borderRadius: '50px', flexGrow: 2 }}
          />
          <div
            style={{
              color: 'white',
              background: '#5DB075',
              borderRadius: '50px',
              width: 50,
              height: 50,
              fontSize: 25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginLeft: '-55px',
              marginTop: '10px',
            }}
            onClick={handleSendMessage}
          >
            &#8593;
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
