import React from "react";
import { useState, useEffect } from "react";
import apiClient from '../../../services/apiClient'
import "./MyMessagesWithCoach.css";

export default function MyMessagesWithCoach({ coach }) {
  const [newMsg, setNewMsg] = useState("");
  const [msgs, setMsgs] = useState(null);
  const [msgError, setMsgError] = useState("");

  useEffect(() => {
    async function getMessages(){
      const { data, error } = await apiClient.getMessages(coach.userID);
      if(data){
        setMsgs(data);
      }
      if(error){
        setMsgs([])
      }
    }
    getMessages();
    // eslint-disable-next-line
  }, [])

  const handleOnSendMsg = async () => {
    if (newMsg !== "") {
      const newMessage = {
        content: newMsg,
        receiverID: coach.userID,
        created: new Date().toLocaleString()
      }
      const { res, error } = await apiClient.sendMessage(newMessage);
      if(res){
        setMsgs((prev) => [
          ...prev, newMessage
        ]);
      }
      if(error){
        setMsgError("Error sending message");
      }
      
      setNewMsg("");
    } else {
      setMsgError("Cannot send an empty message!");
    }
  };

  useEffect(() => {
    const objDiv = document.getElementById("my-msgs-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [msgs]);

  return (
    <div className="my-msg-with-coach">
      <div className="my-msg-with-coach-container">
        <div className="my-msg-with-coach-header-container">
          <h2 className="my-msg-with-coach-header">
            Message Coach {coach.firstName + ' ' + coach.lastName}
          </h2>
        </div>
        <div className="my-msg-with-coach-text-area-container">
          <div className="my-msgs-container" id="my-msgs-container">
            {msgs?.map((msg, index) => (
              <Message
                key={index}
                msgText={msg.content}
                timeStamp={new Date(msg.created).toLocaleString()}
                orientation={msg.senderID === coach.userID ? "left" : "right"}
              />
            ))}
          </div>
          <SendMessage
            newMsg={newMsg}
            setNewMsg={setNewMsg}
            handleOnSendMsg={handleOnSendMsg}
            msgError={msgError}
            setMsgError={setMsgError}
          />
          <div className="error-msg">{msgError === "" ? " " : msgError}</div>
        </div>
      </div>
    </div>
  );
}

function Message({ msgText, timeStamp, orientation }) {
  return (
    <div className="msg-line">
      <div
        className={
          orientation === "left" ? "msg-container-left" : "msg-container-right"
        }
      >
        <div className="msg-text">{msgText}</div>
        <div className="msg-timestamp">{timeStamp}</div>
      </div>
    </div>
  );
}

function SendMessage({
  newMsg,
  setNewMsg,
  handleOnSendMsg,
  msgError,
  setMsgError,
}) {
  const handleOnMsgTextChange = async (event) => {
    if (msgError !== "") {
      setMsgError("");
    }
    setNewMsg(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    handleOnSendMsg();
  };

  return (
    <div className="send-msg-container">
      <form
        id="send-msg-form"
        onSubmit={handleOnSubmit}
        className="send-msg-form"
      >
        <div className="send-msg-text-box-container">
          <input
            id="send-msg-input"
            className="send-msg-text-box"
            value={newMsg}
            placeholder="Send a message ..."
            onChange={handleOnMsgTextChange}
          ></input>
        </div>
        <div className="send-msg-btn-container">
          <button className="send-msg-btn" type="submit">
            <span className="material-symbols-outlined send-icon">send</span>
          </button>
        </div>
      </form>
    </div>
  );
}
