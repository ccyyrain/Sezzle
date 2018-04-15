import React, {Component} from 'react';
import RoomStatus from './RoomStatus';
import Messages from './Messages';
import ChatInput from './ChatInput';


export default class ChatRoom extends Component {
    constructor(props) {
        super(props);
        const socket = this.props.socket;
        this.state = {
            myId: this.props.uid,
            myName: this.props.username,
            uid: this.props.uid,
            username: this.props.username,
            socket: socket,
            messages:[],
            onlineUsers: {},
            onlineCount: 0,
            userhtml:'',
        }
        this.ready();
    }

    // 处理在线人数及用户名
    handleUsers() {
        const users = this.state.onlineUsers;
        let userhtml = '';
        let separator = '';
        for (let key in users) {
            if (users.hasOwnProperty(key)) {
                userhtml+= separator + users[key];
                separator = ',';
            }
        }
        this.setState({userhtml: userhtml})
    }

    // 生成消息id
    generateMsgId() {
        return new Date().getTime()+""+Math.floor(Math.random()*899+100);
    }

    // 更新系统消息
    updateSysMsg(o, action) {
        this.setState({
            onlineCount: o.onlineCount,
            onlineUsers: o.onlineUsers,
        });
        this.handleUsers();
    }

    // 发送新消息
    updateMsg(obj) {
        let messages = this.state.messages;
        const newMsg = {username:obj.username, uid:obj.uid, action:obj.message, msgId:this.generateMsgId(), time:this.generateTime(), timestamp:(new Date()).valueOf()};
        messages = messages.concat(newMsg);
        this.setState({messages:messages})
    }

    // 生成时间
    generateTime() {
        let hour = new Date().getHours(),
            minute = new Date().getMinutes();
        hour = (hour==0) ? '00' : hour;
        minute = (minute<10) ? '0' + minute : minute;
        return hour + ':' + minute;
    }

    handleLogout() {
        location.reload();
    }
    // 开始监控socket
    ready() {
        const socket = this.state.socket;
        socket.on('login', (o)=>{
            this.updateSysMsg(o, 'login');
        })
        socket.on('logout', (o)=>{
            this.updateSysMsg(o, 'logout');
        })
        socket.on('message', (obj)=>{
            this.updateMsg(obj)
        })
    }

    render() {
        return(
            <div className="chat-room">
                <div className="welcome">
                    <div className="room-name">Online Calculator | Nickname: {this.state.myName}</div>
                    <div className="button">
                        <button onClick={this.handleLogout}>Log Out</button>
                    </div>
                </div>
                <RoomStatus onlineCount={this.state.onlineCount} userhtml={this.state.userhtml}/>
                <div ref="chatArea">
                    <Messages messages={this.state.messages} myId={this.state.myId} />
                    <ChatInput myId={this.state.myId} myName={this.state.myName} socket={this.state.socket}/>
                </div>
            </div>)
    }
}
