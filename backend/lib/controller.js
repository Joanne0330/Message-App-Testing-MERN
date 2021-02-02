// import MessageModel from './model';
// let messageApp  = new MessageModel(`/\///json/\//testMessages.json`);
import MessageApp from './model.js';

let messageApp;
// setting up the testing environment with process.env routes
if (process.env.npm_lifecycle_event == "test") {
    // if we run npm test
    messageApp = new MessageApp(`/\///json/\//testMessages.json`)
} else {
    // if we run npm start
    messageApp = new MessageApp(`/\///json/\//messages.json`)
}


function getAll(){
  return new Promise((resolve, reject) => {
    var result = messageApp.getAll()
        if (result.length !== 0) {
        resolve(result)  // if status 200
        } else {
        reject("No messages in database")  // if status 404
        }
  })
}

function getSingleMessage(id) {
    return new Promise((resolve, reject) => {
        let result = messageApp.get(id)
            if(result) {
                resolve(result)
            } else {
                reject("Message not found in database")
            }
    })
}

function updateMessage(id, content){
    return new Promise((resolve, reject) => {
      let message = messageApp.update(id, content)
      if (message.length !== 0) {
        resolve(message)
      } else {
        reject("Cannot find origianl message to update")
      }
    })
  }

function post(content) {
    return new Promise((resolve, reject) => {
        let message = messageApp.post(content)
            if(message !== []) {
                resolve(message)
            } else {
                reject("You can't post an empty message")
            }
    })
}

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        let result = messageApp.delete(id)
            if(result !== 'Message not found in database') {
                resolve(result)
            } else {
                reject(result)
            }
    })
}

module.exports = {
  getAll, 
  getSingleMessage,
  post, 
  deleteMessage, 
  updateMessage
}