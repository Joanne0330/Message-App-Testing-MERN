import { expect } from 'chai';
import MessageApp from './app.js';

describe('app', function() {
    let testApp

    beforeEach(() => {
        testApp = new MessageApp;
        testApp.post('hi world');
    });

    it('app has messages', function() {
        expect(testApp.messages).to.be.an('array');
    });

    it('app creates message .post', function() {
        testApp.post('hello world');
        expect(testApp.messages.length).to.equal(2);
    });

    it('message has content, date and id', function() {
        expect(testApp.messages[0].content).to.equal('hi world');
        expect(testApp.messages[0].date).not.to.equal(undefined);
        expect(testApp.messages[0].id).to.equal(1);
    });

    it('app reads messages .get', function() {
        expect(testApp.get(1).content).to.equal('hi world');
    })

    it('app updates .update', function() {
        testApp.update(1, "hello world")
        expect(testApp.get(1).content).to.equal('hello world')
    });

    it('app deletes .delete', function() {
        testApp.delete(1);
        expect(testApp.messages.length).to.equal(0)
    });

    it("id's are always unique", function() {
        testApp.post('1') //id: 2
        testApp.post('2') //id: 3
        testApp.delete(1)
        testApp.post('3') //id: 4
        expect(testApp.messages[1].id).to.equal(3) //post: '2'
      });

      it("app deletes correctly", function() {
        testApp.post('1')
        testApp.post('2')
        testApp.post('3')
        testApp.delete(0)
        testApp.delete(2)
        expect(testApp.get(1).id).to.equal(1)
      });

      it("app updates correctly", function() {
        testApp.post('1')
        testApp.post('2')
        testApp.delete(1)
        testApp.update(2, 'update')
        expect(testApp.get(2).content).to.equal('update')
      });

      it('getAll returns all messages', function() {
          expect(testApp.getAll()).to.be.an('array');
          expect(testApp.getAll().length).to.equal(1);
      })

      //below section tests the fs data
      it("app reads from given filepath", function() {

        //first test there's nothing in the arr
        let testFileWriteApp = new MessageApp("/\///json/\//testMessages.json")
        expect(testFileWriteApp.messages.length).to.equal(0);

        //then post one message and see if there's 1 in the arr
        testFileWriteApp.post("Hi")
        expect(testFileWriteApp.messages.length).to.equal(1);

        //now we set a new variable and read the message(s) previously posted
        let testFileReadApp = new MessageApp("/\///json/\//testMessages.json")
        expect(testFileReadApp.messages.length).to.equal(1);

        //last we test delete
        testFileReadApp.delete(1)
        let testFileClearApp = new MessageApp("/\///json/\//testMessages.json")
        expect(testFileClearApp.messages.length).to.equal(0);

      });

      //below tests are for edge cases without the 'hi world' input and empty post
      it('rejects empty messages', function() {
          let testApp = new MessageApp();
          expect(testApp.post('')).to.deep.equal([]);
      });

      it("no messages if no messages are sent", function() {
        let testApp = new MessageApp()
        expect(testApp.getAll()).to.deep.equal([])
      });

      it("rejects false update", function() {
        let testApp = new MessageApp()
        expect(testApp.update(0, "")).to.deep.equal([])
      });

      it("errors if no message to delete", function() {
        let testApp = new MessageApp()
        expect(testApp.delete(0)).to.deep.equal('Message not found in database')
      });

})