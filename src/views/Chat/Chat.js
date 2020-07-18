import React, { Component } from 'react';
import {
    Col,
    Input,
    Row
} from 'reactstrap';
import Send from '../../component/send';
import Receive from '../../component/receive';
import * as chatActions from '../../store/chat/actions';
import * as userActions from '../../store/user/actions';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { createHashHistory } from 'history' // or createBrowserHistory


const history = createHashHistory();

function checkNotNull(params) {
    if(params != null && params != '' && params != undefined){
        return true;
    }else{
        return false;
    }
}

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
            stateList: [],
            selectedUser: {},
            userMessage: ''
        }
    }
    componentDidMount(){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userList = [...this.props.userList];
        for (let index = 0; index < userList.length; index++) {
            const element = userList[index];
            if(currentUser.userId == element.userId){
                userList.splice(index, 1);
                break;
            }
        }
        this.setState({currentUser: currentUser, stateList: userList});
    }

    send(){
        let self = this.state;
        if(checkNotNull(self.selectedUser) && (Object.keys(self.selectedUser).length > 0)){
            let message = {
                receiverId: self.selectedUser.userId,
                messageId: this.create_UUID(),
                message: self.userMessage,
                title: self.selectedUser.firstName[0]+''+self.selectedUser.lastName[0],
                senderId: self.currentUser.userId};
            this.props.chatActions.addChat(Object.assign({}, message));
            this.setState({userMessage: ''});
        }
        
    }

    create_UUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    changeUser= ({ target: { value } }) => {
        var self = this.state;
        for (let index = 0; index < self.stateList.length; index++) {
            const element = self.stateList[index];
            if(value == element.userId){
                this.setState({selectedUser: element});
                break;
            }
        }    
      };
      
      messageHandler(event){
        let value = event.target.value;
        this.setState({userMessage: value});
      }
    render() {
        return (
            <div className={`animated fadeIn`}>
                <Row>
                    <Col lg={12} className={'d-flex mb-3'}>
                        <Col lg={2}>
                        <button className={`btn btn-primary`} onClick={()=>{
                               history.push({
                                pathname: '/user'
                              })
                            }}>Back to User</button>
                        </Col>
                        <Col lg={7}>
                            
                        </Col>
                        <Col lg={3}>
                            <Input type="select" onChange={this.changeUser}  name="userId" id="userId">
                            <option disabled selected value="">--- Select User ---</option>
                            {
                            (this.state.stateList).map((user, index) =>
                                <option key={index} value={user.userId}>{user.firstName+ ' '+ user.lastName}</option>
                            )}
                        </Input>
                        </Col>                
                    </Col>
                </Row>
                <div className={`bodycontent`}>
                {
                   this.props.chatRoom.length > 0 && (this.props.chatRoom? this.props.chatRoom: []).map(message=>
                        <>
                            {(message.senderId == this.state.currentUser.userId)? 
                                <Send message={message.message} title={this.state.currentUser.firstName}></Send>:
                                (message.receiverId == this.state.currentUser.userId&&<Receive message={message.message} title={message.title}></Receive>)
                            }
                        </>
                        )
                }
                </div>   
                <div className={`singletsk-footer`}>
                    <div className={`commentcomposer d-flex p-3`}>
                        <input type="text" id="userMessage" name="userMessage" value={this.state.userMessage} onChange={(e)=>this.messageHandler(e)}/>
                        <button type="button" onClick={()=>this.send()}>Send</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
  state => ({
    chatRoom: state.chat.chatRoom,
    userList: state.user.userList
  }),
  dispatch => ({
    chatActions: bindActionCreators(Object.assign({}, chatActions), dispatch),
    userActions: bindActionCreators(Object.assign({}, userActions), dispatch),
  })
)(Chat);

