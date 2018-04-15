import React, {Component} from 'react';

export default class RoomStatus extends Component {
    render() {
        return(<div className="room-status">Online Guests: {this.props.onlineCount}, Guest List: {this.props.userhtml}</div>)
    }
}
