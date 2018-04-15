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

export default class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.socket,
            message:'',
            myId: this.props.myId,
            myName: this.props.myName,
            valueText : '0',
            record:[], //user+date+string
        }
    }

    //监听所有按钮的click事件
    handleValueInput(data) {
    let curState = this.state.valueText;
    let res = this.checkClickType(curState,data);
    this.setState({valueText:res})
}

//根据按钮自带的type属性来做不同的反应
    checkClickType(cur_value,data){
        let initFlag = cur_value === '0'&& data.type!=='point';//初次输入且不打算输入小数
        const socket = this.state.socket;
        switch (data.type) {
            case 'equal': //=
                let val = eval(cur_value)+'';
                let resultbefore = cur_value + ' = ' +val;
                let username = this.props.myName;
                console.log(resultbefore,'suanshi');
                console.log(val,'jieguo');
                let myDate = new Date();
                let time = myDate.toLocaleString();
                this.state.record.push({time:time,user:username,value:resultbefore});
                console.log(this.state.record,'record');
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

            case 'operator'://操作符
                //不能出现连续操作符的情况
                let valueArr = cur_value.split(' ');
                if(valueArr[valueArr.length-1]===''&&valueArr[valueArr.length-2]!==')'){
                    //删除操作符及左右的空格
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
                    //如果前面的符号为/
                    if(valueArr[valueArr.length-2]==='/'){
                        alert('Divisor Cannot Be 0!');
                        return cur_value;//直接清零
                    }
                }
                return cur_value + data.value
        }
    }

        //生成按钮列表
    initButtonList(list,value){
        value.forEach(data => {
            list.push(
                <button className='div_class_button'
                    key={data.value}
                    onClick = {this.handleValueInput.bind(this,data)}
                >{data.value}</button>
            );
        });
        return list;
    }

    render() {
      let buttonlist = [];//按钮列表
      buttonlist = this.initButtonList(buttonlist,BUTTONVALUE);
        return(
            <div className='div_class_calculator'>
                    <div className='div_class_databar'>
                        <h1>Calculator</h1>
                        <input type="text"
                            value={this.state.valueText}
                            readOnly
                        />
                    </div>
                    <div className='div_class_buttonlist'>
                        {buttonlist}
                    </div>
                </div>
            )
    }
}
