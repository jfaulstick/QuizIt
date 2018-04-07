const Game = require('./game');
const mongoose = require('mongoose');
const Session = require('../models/gameSession');
const axios = require('axios');
const triviaAPI = require('../utils/triviaAPI');

function GameSession(io) {
    
    // Array that stores the userIds of all users within this game session
    this.users = [];
    // Variable that we will instantiate each new game into
    this.currentGame = undefined;
    // Variable for storing the session's ID
    this._id = undefined;
    // Variable for storign the session's type. 
    this.type = undefined;
    

    // Method that sets up the session's state
    this.create = ()=>{
        // NEED code to create a new session document in Mongo and return the objectId
        this.addUser('User Object To Go Here');
        this.createNewGame();
    };

    // Method that adds a user to the session
    this.addUser = (user)=>{
        // REPLACE the key value with the user object's id.
        this.users.push(user);
        // console.log(this);
    };

    // Method for removing a user from the session by userId
    this.remUser = (userId)=>{
        // NEED TO WRITE THIS
    };

    // Method for saving the session to MongoDB
    this.save = (cb)=>{
        const sessionDocument = new Session({
            users: this.users,
            currentGame: this.currentGame,
            type: this.type
        });
        sessionDocument.save().then((res) => {
            this._id = res._id;
            cb(res);
        });
    };

    // Creating a new game
    this.createNewGame = ()=>{
        triviaAPI(res=>{
            let newGame = new Game(res.data.results,io);
            newGame.create();
            this.currentGame=newGame;
            console.log('--------------------------------------------------');
            console.log(this.currentGame.timer);
            this.startGame('master');
        })
    };

    // Game logic for starting the game. Here we will need to go through the questions and send them to the user accordingly via the 'master' room for MVP
    this.startGame = (room)=>{setInterval(()=>{
        this.currentGame.timer--;
        console.log('hello from '+room+' timer is '+this.currentGame.timer+'!');
        io.sockets.to(room).emit('message','hello from master! timer is '+this.currentGame.timer+'!');  
    }, 1000);
    }
}

module.exports = GameSession;