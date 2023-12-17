import React from 'react'
import { useState, useEffect } from 'react'
import apiClient from '../../../services/apiClient'
import './Messaging.css'

export default function Messaging({ user, setModalIsOpen }) {
  const [newMsg, setNewMsg] = useState('')
  const [msgs, setMsgs] = useState(null)
  const [msgError, setMsgError] = useState('')

  const fetchMessages = async () => {
    const { data, error } = await apiClient.getMessages(user.userID)
    if (data) {
      setMsgs(data)
    }
    if (error) {
      setMsgs([])
    }
  }

  const handleOnSendMsg = async () => {
    if (newMsg !== '') {
      const newMessage = {
        content: newMsg,
        receiverID: user.userID,
        created: new Date().toLocaleString(),
      }
      const { data, error } = await apiClient.sendMessage(newMessage)
      if (data) {
        setMsgs((prev) => [...prev, newMessage])
      }
      if (error) {
        setMsgError('Error sending message')
      }

      setNewMsg('')
    } else {
      setMsgError('Cannot send an empty message!')
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    const objDiv = document.getElementById('my-msgs-container')
    objDiv.scrollTop = objDiv.scrollHeight
  }, [msgs])

  useEffect(() => {}, [msgs])
  return (
    <div className='modal-background'>
      <div className='modal-container'>
        {/* modal header: header text & a close button */}
        <div className='header'>
          <p> Message {user.firstName + ' ' + user.lastName}</p>
          <button
            className='close-modal-btn'
            onClick={() => {
              setModalIsOpen(false)
            }}>
            X
          </button>
        </div>
        <div className='my-msg-with-user'>
          <div className='my-msg-with-user-container'>
            <div className='my-msg-with-user-text-area-container'>
              <div className='my-msgs-container' id='my-msgs-container'>
                {msgs?.map((msg, index) => (
                  <Message
                    key={index}
                    msgText={msg.content}
                    timeStamp={new Date(msg.created).toLocaleString()}
                    orientation={msg.senderID === user.userID ? 'left' : 'right'}
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
              <div className='error-msg'>{msgError === '' ? ' ' : msgError}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Message({ msgText, timeStamp, orientation }) {
  return (
    <div className='msg-line'>
      <div className={orientation === 'left' ? 'msg-container-left' : 'msg-container-right'}>
        <div className='msg-text'>{msgText}</div>
        <div className='msg-timestamp'>{timeStamp}</div>
      </div>
    </div>
  )
}

function SendMessage({ newMsg, setNewMsg, handleOnSendMsg, msgError, setMsgError }) {
  const handleOnMsgTextChange = async (event) => {
    if (msgError !== '') {
      setMsgError('')
    }
    setNewMsg(event.target.value)
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    handleOnSendMsg()
  }

  return (
    <div className='send-msg-container'>
      <form id='send-msg-form' onSubmit={handleOnSubmit} className='send-msg-form'>
        <div className='send-msg-text-box-container'>
          <input
            id='send-msg-input'
            className='send-msg-text-box'
            value={newMsg}
            placeholder='Send a message ...'
            onChange={handleOnMsgTextChange}></input>
        </div>
        <div className='send-msg-btn-container'>
          <button className='send-msg-btn' type='submit'>
            <span className='material-symbols-outlined send-icon'>send</span>
          </button>
        </div>
      </form>
    </div>
  )
}
