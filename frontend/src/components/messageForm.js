import React from 'react';

class MessageForm extends React.Component {
    constructor() {
        super()
        this.state = {
            currentMessage: ''
        }
    }

    changeMessageValue(change) {
        this.setState({ currentMessage: change })
    }

    processSubmit(e) {
        e.preventDefault()
        this.props.submitMessage(this.state.currentMessage) //calling the func in parent
        // this.changeMessageValue('')
        this.setState({ currentMessage: ''})
    }

  render(){
    return (
      <form
        id='message_form' 
        ref='formRef'
        onSubmit={(e)=>this.processSubmit(e)}
       >
        <textarea
            id='message_box'
            placeholder='A message here...'
            value={this.state.currentMessage}
            onChange={(e) => this.changeMessageValue(e.target.value)}
        >
        </textarea>
        <br/>
        <button
            id="submit"
            type="button"
            name="Submit"
        >
        Submit
      </button>
      </form>
    );
  }
}

export default MessageForm;