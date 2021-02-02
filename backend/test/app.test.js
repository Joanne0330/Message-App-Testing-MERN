import request from 'supertest';
import { expect } from 'chai';

import MessageApp from '../app.js';

// @Testing the functionality of the api - status 200
describe('Hello World test', function() {
    it('posts a message', function() {
        const data = {
            content: 'hi world'
        };

        const res = request(MessageApp)
        .post("/message")
        .send(data)
        .set("Accept", "application/json")
        res.expect(200)
        .end(function(err, res) {
            if(err) {
                return done(err)
            }
            expect(res.body[0].content).to.equal('hi world');
            // done();
        })

    it('gets a single message', function() {
        const res = request(MessageApp)
        .get("/message/1")
        res.expect(200)
        .end(function(err, res) {
            if(err) {
                return done(err)
            }
            expect(res.body.id).to.equal(1);
            // done()
        })
    })    

    it('gets all messages', function() {
        const res = request(MessageApp)
        .get("/")
        res.expect(200)
        .end(function(err, res) {
            if(err) {
                return done(err)
            }
            expect(res.body.length).to.equal(1)
            // done();
            })
        })
    })

    it("updates a message", function() {
        const data = {
          content: "Hello World"
        }
        const res = request(MessageApp)
        .put('/update/1')
        .send(data)
        .set("Accept", "application/json")
        res.expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err)
          }
          expect(res.body[0].content).to.equal("Hello World")
        //   done()
        })
      })
    

    it('deletes a message', function() {
        const res = request(MessageApp)
        .delete("/delete/1")
        .set("Accept", "application/json")
        res.expect(200)
        .end(function(err, res) {
            if(err) {
                return done(err)
            }
            expect(res.body.length).to.equal(0)
            // done()
        })
    })
})

// @Testing errors - status 404
describe("message api errors correctly", function(){
    it("posts a message errors", function() {
      const data = {
        content: ""
      };
      const res = request(MessageApp)
      .post("/message")
      .send(data)
      .set("Accept", "application/json")
      res.expect(404)
      .end(function(err, res) {
        if (err) {
          return done(err)
        }
        expect(res.body).to.equal("You can't post an empty message")
        // done()
      })
    })

    it('gets all erros when no messages', function() {
        const res = request(MessageApp)
        .get("/")
        res.expect(404)
        .end(function(err, res) {
            if(err) {
                return done(err)
            }
            expect(res.body).to.equal("No messages in database")
        })
    })

    it('errors if cannot find single message', function() {
        const res = request(MessageApp)
        .get("/message/1")
        res.expect(404)
        .end(function(err, res) {
            if(err) {
                return done(err)
            }
            expect(res.body).to.equal("Message not found in database")
        })
    })

    it("errors when updating with incorrect id", function() {
        const data = {
            contect: "Hiya World"
        };
        const res = request(MessageApp)
        .put("/update/0")
        .send(data)
        .set('Accept', 'application/json')
        res.expect(404)
        .end(function(err, res) {
            if(err) {
                return done(err)
            }
            expect(res.body).to.equal("Cannot find origianl message to update")
        })

    })

    it('erros when trying to delete a message that does not exist', function() {
        const res = request(MessageApp)
        .delete("/delete/0")
        res.expect(404)
        .end(function(err, res) {
            if(err) {
                return done(err)
            }
            expect(res.body).to.equal("Message not found in database")
        })
    })
})