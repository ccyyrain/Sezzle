import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';



export default class Messages extends Component {

    componentDidUpdate() {
        const messageList = ReactDOM.findDOMNode(this.refs.messages);

        window.scrollTo(0, messageList.clientHeight + 50);
    }
    render() {
        const myId = this.props.myId;
        const arr = this.props.messages;
        //console.log(this.props.messages,'1');
         arr.sort(function(a, b) {
           return parseFloat(b.timestamp) - parseFloat(a.timestamp);
         });
        //const arr1 = arr.slice(0, 3);
        //console.log(arr1,'arr1');
        //console.log(this.props.messages,'2');
        const oneMessage = this.props.messages.slice(0, 10).map(function(message){
            return(
                    <Message key={message.msgId}  msgUser={message.username} action={message.action} isMe={(myId == message.uid)? true : false} time={message.time}/>
                )
        })
        return(<div className="messages" ref="messages">{oneMessage}</div>)
    }
}

class Message extends Component {
    render() {
            return (
                <div className={(this.props.isMe)? 'me one-message':'other one-message'}>
                        <div className="message-content">
                        <span> User: {this.props.msgUser} &nbsp;&nbsp; Time: {this.props.time}&nbsp;&nbsp; Equation: {this.props.action}</span>
                        </div>
                </div>
            )
    }
}
