import React from 'react';
import { Button, CardBody, CardGroup, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label } from 'reactstrap';
import { Spinner } from 'reactstrap';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import * as userActions from '../../../store/user/actions';
import { createHashHistory } from 'history' // or createBrowserHistory
import { checkPropTypes } from 'prop-types';


const history = createHashHistory();

function checkNotNull(params) {
  if(params != null && params != '' && params != undefined){
      return true;
  }else{
      return false;
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    //this.props.logout();

    this.state = {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
}

componentDidMount() {
  // userService.deepLinking(new URLSearchParams(this.props.location.search));
}

handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
}

handleClick = (e) => {
    e.preventDefault();
    this.submit();
}

submit() {
  this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      console.log(this.props.userList);
      if(username == 'admin' && password == 'admin'){
        history.push({
          pathname: '/user'
        })
      }
      if(checkNotNull(this.props.userList) && (Object.keys(this.props.userList).length > 0)){       
        for (let index = 0; index < this.props.userList.length; index++) {
          const user = this.props.userList[index];
          if(user.email.toLowerCase() == username.toLowerCase() && user.password.toLowerCase() == password.toLowerCase()){
            history.push({
              pathname: '/user'
            })
          }
        }
      }else{
        this.setState({submitted: false})
      }
    }
}

handleEnterPress = (event) =>{
  var code = event.keyCode || event.which;
  if(code === 13) {
    this.handleClick(event);
  }
}

  render() {
    const { username, password, submitted } = this.state;
    return (
      <div className="app">

          <Row className="row ml-0 mr-0">
            <Col md="4" lg="4" sm="8" xl="4" xs="12" className={'mx-auto'}>                
              <CardGroup>
                <Col className="p-4 w-100 mt-4 rounded bg-light">
                  {<CardBody>
                      <h1 className="text-center" style={{"fontWeight": "400"}}>Login</h1>
                      <p className="text-muted text-center">Sign In to your account</p>
                      <Label className="mt-4 loginFont">Username</Label>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user bg-light"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="username" placeholder="Username" autoComplete="username" name="username" value={username} onChange={this.handleChange}/>
                      </InputGroup>
                      <Label className="loginFont">Password</Label>
                      <InputGroup className="mb-5">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-lock bg-light"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" placeholder="Password" autoComplete="current-password" name="password" value={password} onKeyPress={this.handleEnterPress.bind(this)} onChange={this.handleChange}/>
                      </InputGroup>
                      <Row>
                        <Col xs="12">
                          <Button color="primary" className="px-4 loginBtn w-100" onClick={this.handleClick.bind(this)}>Login <Spinner size="sm" color="light" className={(submitted)? '': 'd-none'} /></Button>
                        </Col>
                      </Row>
                  </CardBody>}
                </Col>
              </CardGroup>
            </Col>
          </Row>
      </div>
    );
  }
}

// export default Login;
export default connect(
  state => ({
    userList: state.user.userList
  }),
  dispatch => ({
    userActions: bindActionCreators(Object.assign({}, userActions), dispatch),
  })
)(Login);
