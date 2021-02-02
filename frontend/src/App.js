import React from 'react';
import './App.css';

import MessageList from './components/messageList.js';
import MessageForm from './components/messageForm.js';

class MessageApp extends React.Component {
  render(){
    return (
      <div className="App">
      <MessageForm/>
      <MessageList/>
      </div>
    );
  }
}


export default MessageApp;
