import React, {Component} from 'react';

const BUTTONVALUE = [
    {value: '7',type:'number'},
    {value: '8',type:'number'},
    {value: '9',type:'number'},
    {value: '←',type:'back'},
    {value: 'C',type:'clear'},
    {value: '4',type:'number'},
    {value: '5',type:'number'},
    {value: '6',type:'number'},
    {value: '*',type:'operator'},
    {value: '/',type:'operator'},
    {value: '1',type:'number'},
    {value: '2',type:'number'},
    {value: '3',type:'number'},
    {value: '+',type:'operator'},
    {value: '-',type:'operator'},
    {value: '0',type:'number'},
    {value: '.',type:'point'},
    {value: '=',type:'equal'}
];

export default class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.socket,
            message:'',
            myId: this.props.myId,
            myName: this.props.myName,
            valueText : '0',
        }
    }

//Listen on click
    handleValueInput(data) {
    let curState = this.state.valueText;
    let res = this.checkClickType(curState,data);
    this.setState({valueText:res})
}

//Calculator input tppe
    checkClickType(cur_value,data){
        let initFlag = cur_value === '0'&& data.type!=='point';//whether input '.' at first
        const socket = this.state.socket;
        switch (data.type) {
            case 'equal': //=
                let val = eval(cur_value)+'';
                let resultbefore = cur_value + ' = ' +val;
                if (resultbefore) {
                    const obj = {
                        uid: this.state.myId,
                        username: this.state.myName,
                        message: resultbefore
                    }
                    socket.emit('message', obj)
                }
                return val;

            case 'back':  // <-
                cur_value = cur_value.substring(0,cur_value.length-1) || '0';//Delete the last digit
                return cur_value;

            case 'clear': //C
                cur_value = '0';
                return cur_value;

            case 'operator':
                //cannot have two operators in consistant
                let valueArr = cur_value.split(' ');
                if(valueArr[valueArr.length-1]===''){
                    //replace the opeartor in array
                    cur_value =  cur_value.substring(0,cur_value.length-3)
                    return  cur_value + ' ' + data.value + ' ';
                }
                return cur_value + ' ' + data.value + ' ';

            default://number
                if(initFlag){
                    cur_value = ''
                }
                if(data.value==='0'){
                    let valueArr = cur_value.split(' ');
                    // divisor cannot be 0
                    if(valueArr[valueArr.length-2]==='/'){
                        alert('Divisor Cannot Be 0!');
                        return cur_value;
                    }
                }
                return cur_value + data.value
        }
    }

    initButtonList(list,value){
        value.forEach(data => {
            list.push(
                <button className='cal_button'
                    key={data.value}
                    onClick = {this.handleValueInput.bind(this,data)}
                >{data.value}</button>
            );
        });
        return list;
    }

    render() {
      let buttonlist = [];
      buttonlist = this.initButtonList(buttonlist,BUTTONVALUE);
        return(
            <div className='calculator'>
                    <div className='databar'>
                        <h1>Calculator</h1>
                        <input type="text"
                            value={this.state.valueText}
                            readOnly
                        />
                    </div>
                    <div className='cal_buttonlist'>
                        {buttonlist}
                    </div>
            </div>
            )
    }
}
