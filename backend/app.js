import fs from 'fs';
import path from 'path';

class MessageApp {
    constructor(filepath) {
        this.filepath = filepath
        this.messages = filepath ? this.readFromJson() : [];
    }
    
    
    newId(array){
        if (array.length > 0) {
            return array[array.length-1].id + 1;
        } else {
            return 1
        }
    }
    
    post(message) {
        let item = {
            id: this.newId(this.messages),  
            content: message,
            date: new Date()
        }

        this.messages.push(item);
        this.writeToJson();
        return this.messages;
    }
    
    get(id) {
        return this.messages.filter(message => message.id === id)[0];
    }
    
    update(id, update) {
        let index = this.messages.findIndex(message => message.id == id);
        this.writeToJson();
        this.messages[index].content = update;
        // return this.messages;
    }
    
    delete(id) {
        this.messages = this.messages.filter(message => message.id != id);
        this.writeToJson();
        return this.messages;
        
    }
    
    readFromJson() {
        return JSON.parse(fs.readFileSync(
            __dirname+path.normalize(this.filepath), "utf8", (err, data) => {
                if (err) throw err
            }
        ))
    }

    writeToJson() {
        if(this.filepath) { //if the filepatch exist
            const jsonItem = JSON.stringify(this.messages)  //JSON format the item
            fs.writeFileSync(
                __dirname+path.normalize(this.filepath), jsonItem, (err) => {// sending(writing) the item to this path
                if(err) throw err;
            });
        }
    }

}

export default MessageApp;