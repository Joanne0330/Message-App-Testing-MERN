import React, {Component} from 'react';
import './App.css';

function MessageApp() {
  return(
    <div className="App">
      <h1>Message App</h1>
      <textarea 
        id='message_box' 
        placeholder='write a message...'
      >
      </textarea>
      <br />
      <button
        id='submit'
        type='submit'
        name='Submit'
      >
      Submit Message
      </button>
      <br/>
      <ul
        id='message_list'
      >message
        <li></li>
      </ul>
  
    </div>
  )
}

export default MessageApp;
