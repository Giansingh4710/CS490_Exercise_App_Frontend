import React from "react";
import { useState, useEffect } from "react";
import "./MyMessagesWithCoach.css";

export default function MyMessagesWithCoach({ coachName }) {
  var testMsgs = [
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
  const [newMsg, setNewMsg] = useState("");
  const [msgs, setMsgs] = useState(testMsgs);
  const [msgError, setMsgError] = useState("");

  const handleOnSendMsg = async () => {
    if (newMsg != "") {
      setMsgs((prev) => [
        ...prev,
        {
          sender: "User",
          msgText: newMsg,
          timeStamp: "3/3/23 10:00pm",
        },
      ]);
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
            Message Coach {coachName}
          </h2>
        </div>
        <div className="my-msg-with-coach-text-area-container">
          <div className="my-msgs-container" id="my-msgs-container">
            {msgs?.map((msg) => (
              <Message
                msgText={msg.msgText}
                timeStamp={msg.timeStamp}
                orientation={msg.sender == "User" ? "right" : "left"}
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
          <div className="error-msg">{msgError == "" ? " " : msgError}</div>
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
    if (msgError != "") {
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
      <div className="send-msg-text-box-container">
        <form onSubmit={handleOnSubmit}>
          <input
            className="send-msg-text-box"
            value={newMsg}
            placeholder="Send a message ..."
            onChange={handleOnMsgTextChange}
          ></input>
        </form>
      </div>
      <div className="send-msg-btn-container">
        <button
          className="send-msg-btn"
          onClick={handleOnSendMsg}
          type="submit"
        >
          <span className="material-symbols-outlined send-icon">send</span>
        </button>
      </div>
    </div>
  );
}
