import React, { Component } from "react";
// import API from "../../utils/API";
// import {Redirect} from "react-router-dom";
import socket from '../../components/io';
import Login from '../../components/Login';
import Pregame from '../../components/Pregame';
import QuestionActive from '../../components/QuestionActive';
import Intermission from '../../components/Intermission';
import GameEnd from '../../components/GameEnd';

class Home extends Component {
  state = {
    loggedIn:false,
    username: "",
    password: "",
    errors:[],
    endpoint: "localhost:3001",
    gameState: "pregame",
    question: {},
    answer: "",
    correctAnswer: "",
    timer:0,
    users:[]
  };

  componentWillMount() {
  }

  componentDidMount(){
    // socket.on('message', (msg) => {
    //   console.log(msg);
    // });

    // //Used for yarn start-reactDev
    // socket.on('roomState-test', (msg) => {
    //   console.log(msg);
    //   //Sets gameState based on response. Sets timer. Sets questions and correctAnswer when applicable.
    //   this.setState({timer:msg.timer});
    //   if(this.state.gameState !== msg.state){
    //     this.setState({gameState:msg.state,question:msg.question,correctAnswer:msg.question.correct_answer}, ()=>{
    //       console.log(this.state.question);
    //       console.log("this.state.gameState changed to "+this.state.gameState);
    //       console.log("this.state.correctAnswer changed to "+this.state.correctAnswer);
    //     })
    //   }
    // });

    //Used for yarn start
    socket.on('gameState', (msg) => {

      console.log(msg);
      //Sets gameState based on response. Sets timer. Sets questions and correctAnswer when applicable.
      this.setState({timer:msg.timer});
      if(this.state.gameState !== msg.gameState){
        this.setState({gameState:msg.gameState,question:msg.question,correctAnswer:msg.correctAnswer}, ()=>{
          console.log(this.state.question);
          console.log("this.state.gameState changed to "+this.state.gameState);
          console.log("this.state.correctAnswer changed to "+this.state.correctAnswer);
        })
      }
    });    
  }

  setHomeState(msg){
    this.setState({gameState:msg.state},()=>{
      console.log("this.state.gameState changed to "+msg.state);
    })
  }

  loggedInTrue(){
    console.log('loggedIn true!');
    this.setState({loggedIn:true});
  }

  render() {
    return (
      <div className = "container">
        {!this.state.loggedIn?<Login loggedInTrue={this.loggedInTrue.bind(this)} setHomeState={this.setHomeState.bind(this)} />:
          this.state.gameState==='pregame'?<Pregame />:
          this.state.gameState==='questionActive'?<QuestionActive />:
          this.state.gameState==='intermission'?<Intermission />:
          this.state.gameState==='gameEnd'?<GameEnd />:""
          }
      </div>
    );
  }

}

export default Home;