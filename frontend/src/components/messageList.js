import React from 'react';

class MessageList extends React.Component {
  constructor(){
    super()
    this.state = {
      editMode: {
      id: null,
      content: null
      }
    }
  }
  toggleUpdate(message){
    this.setState({
      editMode: {
        id: message.id,
        content: message.content
      }
    })
  }
  sendUpdate() {
    this.props.sendUpdate(this.state.editMode.id,this.state.editMode.content)
    this.toggleUpdate({id: null, content: null})
  }

//   sendUpdate(){
//     this.props.sendUpdate(this.state.editMode.id, this.refs.updateBox.value)
//           this.toggleUpdate({id:null,content:null})
//   }

  formatMessage(message) {
      let content = message.content
      let updateButton = <button
        onClick={()=>this.toggleUpdate(message)}
        id='update'>
      Update
      </button>

    if(message.id === this.state.editMode.id) {
        content = (<textarea 
            onChange={(e) => this.setState({editMode: {
                id: message.id, 
                content: e.target.value 
            }}
        )}
        value={this.state.editMode.content}
        ref='updateBox'
        id='updateBox'
        >
        </textarea>)

        updateButton = <button
            onClick={()=>this.sendUpdate(message)}
            id='send'
        >Send Update
        </button>
    }
    return <li 
            className={message} 
            key={message.id}
        >
        {message.content}
        <br/>
        {message.date}
        <br/>
        <button 
            onClick={()=> this.props.deleteMessage(message.id)} 
            id='delete'
        >delete
        </button>
        <br/>
        {updateButton}
    </li>
  }
  render() {
    if(this.props.messages) {
      return <div>
      <ul id="message_list">
      {this.props.messages.map((message) => {
        return this.formatMessage(message)
      })} 
      </ul>
      </div>
    } 
    else {
      return <div>
      <ul id="message_list"><li id="no_messages">no meessages</li></ul>
      </div>
    }
  }
}
export default MessageList;