import React from 'react';
class MessageList extends React.Component {
    constructor() {
        super()
        this.state = {
            
        }
    }
  render(){
    if(this.props.messages) {
        return (
          <ul id="message_list">
            {this.props.messages.map(message => {
                return (
                    <li
                        className='message'
                        key={message.id}
                    >
                    {message.contend}
                    <br />
                    {message.date}
                    </li>
                )
            })}
          </ul>
        )
    } else {
        return (
            <ul id='message_list'>
            no messages
            </ul>
        )
    }
  }
}
export default MessageList;