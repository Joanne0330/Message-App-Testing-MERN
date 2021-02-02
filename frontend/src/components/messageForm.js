import React from 'react';

class MessageForm extends React.Component {
  render(){
    return (
      <form
        id='message_form' 
       >
        <textarea
            id='message_box'
            placeholder='A message here...'>
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