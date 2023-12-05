

import React, { useState, useEffect } from 'react';
import './MyMessagesWithCoach.css';

export default function MyMessagesWithCoach({ coachName }) {
 
  var initialMessages = [
    { sender: "User", msgText: "testing", timeStamp: "3/3/23 12:01pm" },
    {
      sender: "Coach Doe",
      msgText: "testing coach messages",
      timeStamp: "3/3/23 12:10pm",
    },
    {
      sender: "User",
      msgText:
        "testing user messages testing user messages testing user testing user messages testing user messages testing user ",
      timeStamp: "3/3/23 12:01pm",
    },
    {
      sender: "Coach Doe",
      msgText: "testing coach messages",
      timeStamp: "3/3/23 12:10pm",
    },
    { sender: "User", msgText: "testing", timeStamp: "3/3/23 12:01pm" },
    {
      sender: "Coach Doe",
      msgText: "testing coach messages",
      timeStamp: "3/3/23 12:10pm",
    },
    { sender: "User", msgText: "testing", timeStamp: "3/3/23 12:01pm" },
    {
      sender: "Coach Doe",
      msgText:
        "testing coach messages testing coach messages testing coach messages testing coach messages testing coach messages testing coach messages",
      timeStamp: "3/3/23 12:10pm",
    },
  ];
  const [newMsg, setNewMsg] = useState('');
  const [msgs, setMsgs] = useState(initialMessages);
  const [msgError, setMsgError] = useState('');

  const handleOnSendMsg = async () => {
    if (newMsg.trim()) {
      setMsgs(prevMsgs => [...prevMsgs, { sender: 'User', msgText: newMsg, timeStamp: '3/3/23 10:00pm' }]);
      setNewMsg('');
    } else {
      setMsgError('Cannot send an empty message!');
    }
  };

  useEffect(() => {
    const messageContainer = document.getElementById('my-msgs-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }, [msgs]);

  return (
    <div className="my-msg-with-coach">
      <div className="my-msg-with-coach-container">
        <MessageHeader coachName={coachName} />
        <MessageDisplay messages={msgs} />
        <MessageInput
          newMsg={newMsg}
          setNewMsg={setNewMsg}
          handleOnSendMsg={handleOnSendMsg}
          msgError={msgError}
          setMsgError={setMsgError}
        />
        <ErrorMessage msgError={msgError} />
      </div>
    </div>
  );
}

function MessageHeader({ coachName }) {
  return (
    <div className="my-msg-with-coach-header-container">
      <h2 className="my-msg-with-coach-header">Message Coach {coachName}</h2>
    </div>
  );
}

function MessageDisplay({ messages }) {
  return (
    <div className="my-msg-with-coach-text-area-container">
      <div className="my-msgs-container" id="my-msgs-container">
        {messages.map((msg, index) => (
          <Message
            key={index}
            msgText={msg.msgText}
            timeStamp={msg.timeStamp}
            orientation={msg.sender === 'User' ? 'right' : 'left'}
          />
        ))}
      </div>
    </div>
  );
}

function Message({ msgText, timeStamp, orientation }) {
  return (
    <div className="msg-line">
      <div className={orientation === 'left' ? 'msg-container-left' : 'msg-container-right'}>
        <div className="msg-text">{msgText}</div>
        <div className="msg-timestamp">{timeStamp}</div>
      </div>
    </div>
  );
}

function MessageInput({ newMsg, setNewMsg, handleOnSendMsg, msgError, setMsgError }) {
  const handleOnMsgTextChange = async (event) => {
    if (msgError !== '') {
      setMsgError('');
    }
    setNewMsg(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    handleOnSendMsg();
  };

  return (
    <div className="send-msg-container">
      <form onSubmit={handleOnSubmit} className="send-msg-form">
        <div className="send-msg-text-box-container">
          <input
            value={newMsg}
            placeholder="Send a message ..."
            onChange={handleOnMsgTextChange}
            className="send-msg-text-box"
          />
        </div>
        <div className="send-msg-btn-container">
          <button type="submit" className="send-msg-btn">
            <span className="material-symbols-outlined send-icon">send</span>
          </button>
        </div>
      </form>
    </div>
  );
}

function ErrorMessage({ msgError }) {
  return <div className="error-msg">{msgError || ' '}</div>;
}
