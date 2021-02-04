import React from 'react';
import './App.css';

import MessageList from './components/messageList.js';
import MessageForm from './components/messageForm.js';
import ErrorHandler from './components/errorHandler.js';

import axios from 'axios';
const PORT = 'http://localhost:3001';

class MessageApp extends React.Component {
  constructor(){
    super()
    this.state = {
      messages: [], 
      error: null
    }
  }

  componentDidMount() {
    this.getAllMessages();
  }
  setError(error) {
    this.setState({error: error})
  }

  setMessages(messages) {
    this.setState({messages: messages})
  }

  getAllMessages = async() => {
    try {
      const result = await axios.get(`${PORT}/`)
  
      this.setState({messages: result.data})
      // .then((result)  =>  {
        //   this.setState({
        //   messages: result.data
        //   })
        // })      
    } catch (err) {
      this.setError(err)
    }
  }

  submitMessage = async (data) => {
    try {
      const result = await axios.post(`${PORT}/message`, { content: data })
      this.getAllMessages();
    } catch (err) {
      this.setError(err)
    }
    // axios.post(`${PORT}/message`, {
    //   content: data
    // })
    // .then(result => {
    //   this.getAllMessages()
    // })
    // .catch(err => {
    //   this.setError(err)
    // })
  }
  deleteMessage = (id) => {
    axios.delete(`${PORT}/delete/${id}`, {
      id: id
    })
    .then((result)=>{
      this.getAllMessages()
    })
    .catch((err)=>{
      this.setError(err);
    })
  }

  sendUpdate = (id, content) => {
    axios.put(`${PORT}/update/${id}`, {
      content: content
    })
    .then((result)=>{
      this.getAllMessages()
    })
    .catch((err)=>{
      this.setState(err)
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
        deleteMessage={this.deleteMessage}
        sendUpdate={this.sendUpdate}
        />
      <ErrorHandler error={this.state.error} />
      </div>
    );
  }
}


export default MessageApp;
