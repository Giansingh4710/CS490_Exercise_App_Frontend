import React from "react";
import "./MyMessagesWithCoach.css";

export default function MyMessagesWithCoach({ coachName }) {
  var testMsgs = [
    { sender: "User", msgText: "testing", timeStamp: "3/3/23 12:01pm" },
    {
      sender: "Coach Doe",
      msgText: "testing coach messages",
      timeStamp: "3/3/23 12:10pm",
    },
  ];
  return (
    <div className="my-msg-with-coach">
      <div className="my-msg-with-coach-container">
        <div className="my-msg-with-coach-header-container">
          <h2 className="my-msg-with-coach-header">
            Message Coach {coachName}
          </h2>
        </div>
        <div className="my-msgs-container">
          {testMsgs?.map((msg) => (
            <Message
              msgText={msg.msgText}
              timeStamp={msg.timeStamp}
              orientation={msg.sender == "User" ? "right" : "left"}
            />
          ))}
        </div>
        <SendMessage />
      </div>
    </div>
  );
}

function Message({ msgText, timeStamp, orientation }) {
  return (
    <div
      className={
        orientation == "left" ? "msg-container-right" : "msg-container-left"
      }
    >
      <div className="msg-text">{msgText}</div>
      <div className="msg-timestamp">{timeStamp}</div>
    </div>
  );
}

function SendMessage() {
  return (
    <div className="send-msg-container">
      <div className="send-msg-text-box-container">
        <input
          className="send-msg-text-box"
          placeholder="Send a message ..."
        ></input>
      </div>
      <div className="send-msg-button-container">
        <button> Send</button>
      </div>
    </div>
  );
}
