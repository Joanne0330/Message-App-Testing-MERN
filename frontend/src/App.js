import React from 'react';
import './App.css';

import MessageList from './components/messageList.js';
import MessageForm from './components/messageForm.js';

import axios from 'axios';
const PORT = 'http://localhost:3001';

class MessageApp extends React.Component {
  constructor(){
    super()
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.getAllMessages();
  }

  getAllMessages = async() => {
    const result = await axios.get(`${PORT}/`)

    this.setState({messages: result.data})
      // .then((result)  =>  {
      //   this.setState({
      //   messages: result.data
      //   })
      // })
  }

  submitMessage = (data) => {
    axios.post(`${PORT}/message`, {
      content: data
    })
  }

  render(){
    return (
      <div className="App">
      <MessageForm
        ref='messageFormRef'
        submitMessage={this.submitMessage} // this calls for child to be connect to the func in this state
      />
      <MessageList
        ref='messageListRef'
        messages={this.state.messages}
      />
      </div>
    );
  }
}


export default MessageApp;
