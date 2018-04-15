import React, { Component } from "react";
import ReactDOM from "react-dom";
import socket from '../io';
import "./ChatInput.css";

import ChatButton from "../ChatButton";

class ChatInput extends React.Component {
    state = {
        user: this.props.user,
        msg: ''
    };

    createChatObj = () => {
        if(this.state.msg.trim()){
            const chatMsgObj = {
                user: this.props.user,
                msg: this.state.msg
            }
            this.props.sendChatMsg(chatMsgObj);
            console.log('createChatObj');
            console.log(chatMsgObj);
            this.setState({
                msg: ''
            });
        }
    }

    handleTextAreaChange = (event) => {
        // console.log(event.target.value);
        this.setState({
            msg: event.target.value
        });
    }

    render() {
        return (
            <div className="chatInput">
                <textarea className="form-control inputBoxStyle" id="chat-text" rows="3" value={this.state.msg} onChange={this.handleTextAreaChange}></textarea>
                <ChatButton sendChatMsg={this.createChatObj}> </ChatButton>
            </div>
        )
    }

}

export default ChatInput;