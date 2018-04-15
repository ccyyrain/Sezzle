import React, { Component, PropTypes } from 'react';
import ChatRoom from '../components/ChatRoom';
import './loginbox.scss';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            uid:'',
            socket: io()
        }
    }

    // Get a random UserID
    generateUid() {
        return new Date().getTime()+""+Math.floor(Math.random()*9+1);
    }

    // 监控名称变化
    handleChange(e) {
        this.setState({username: e.target.value})
    }

    // 监控点击提交或按回车
    handleClick(e) {
        e.preventDefault();
        this.handleLogin();
    }
    handleKeyPress(e) {
        if (e.key == 'Enter') {
            this.handleLogin()
        }
        return false;
    }

    // 登陆
    handleLogin() {
        let username = this.state.username;

        // 随机生成游客名字
        // username = '游客' + Math.floor(Math.random()*89+10)
        const uid = this.generateUid();
        if (!username) {
            username = 'Guest'+ uid;
        }
        this.setState({uid:uid, username:username});
        this.state.socket.emit('login', {uid:uid, username:username})
    }
    render() {
        let renderDOM;
        if (this.state.uid) {
            renderDOM = <ChatRoom uid={this.state.uid} username={this.state.username} socket={this.state.socket}/>
        } else {
            renderDOM = (<div className="login-box">
                            <h2>Log In</h2>
                            <div className="input">
                                <input type="text" placeholder="Please input a nick name" onChange={this.handleChange.bind(this)}
                                onKeyPress={this.handleKeyPress.bind(this)}/>
                            </div>
                            <div className="submit">
                                <button type="button" onClick={this.handleClick.bind(this)} >Submit</button>
                            </div>
                        </div>)
        }
        return (<div>{renderDOM}</div>)
    }
}
