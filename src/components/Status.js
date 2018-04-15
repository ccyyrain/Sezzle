import React, {Component} from 'react';

export default class Status extends Component {
    render() {
        return(<div className="status">Online Guests: {this.props.onlineCount}, Guest List: {this.props.userhtml}</div>)
    }
}
