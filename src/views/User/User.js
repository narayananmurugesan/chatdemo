import React, { Component } from 'react'
import {
    Row,
    Table,
    Progress,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    CardBody,
    Button,
    UncontrolledTooltip,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import usermasterVar from '../../directives/variables/user';
import UserProfileValid from '../../FormError/UserProfile/UserProfileValid';
import { userprofileFields } from '../../FormError/UserProfile/UserProfilefields';
import * as userActions from '../../store/user/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

function loadImage(params) {
    if(params==0){
        return 'assets/img/avatars/1.jpg';
    }else if(params==1){
        return 'assets/img/avatars/2.jpg';
    }else if(params==2){
        return 'assets/img/avatars/3.jpg';
    }else if(params==3){
        return 'assets/img/avatars/4.jpg';
    }else if(params==4){
        return 'assets/img/avatars/5.jpg';
    }else if(params==5){
        return 'assets/img/avatars/6.jpg';
    }else if(params==6){
        return 'assets/img/avatars/7.jpg';
    }else if(params==7){
        return 'assets/img/avatars/8.jpg';
    }else{
        return 'assets/img/avatars/1.jpg';
    }
}

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            ModalShow: false,
            userprofileErrors: usermasterVar,
            userprofileValid: UserProfileValid,
            userprofile: usermasterVar,
            userList: []
        }
        this.ChangeUserProfileHandler = this.ChangeUserProfileHandler.bind(this);
    }

    componentDidMount() {
        let userList = [...this.props.userList];
        this.setState({userList: userList});
        // console.log(this.props.userList);
    }

    toggleModel = () => {
        this.setState({
            modal: !this.state.modal,
            ModalShow: false,
            userprofile: Object.assign({}, usermasterVar)
        });
    }

    userprofileValidateField(fieldName, value) {
        let response = userprofileFields.fieldsVerfication(fieldName, value, this.state.userprofileErrors, this.state.userprofileValid);
        let stateFields = response.stateFields;
        this.setState({ formErrors: response.fieldValidationErrors, stateFields }, this.validateForm);
    }

    validateForm() {
        this.state.userprofileValid.formValid = this.state.userprofileValid.firstName && this.state.userprofileValid.lastName && this.state.userprofileValid.email && this.state.userprofileValid.password;
        let state = this.state;
        this.setState({ state });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    errorShow(error) {
        return (error.length === 0 ? 'd-none' : '');
    }

    ChangeUserProfileHandler = (event) => {
        let objectName = event.target.getAttribute('data_obj');
        let name = event.target.name;
        let value = event.target.value;
        var thisData = this.state[objectName];
        thisData[name] = value;
        this.setState(this.state, () => { this.userprofileValidateField(name, value) });
    }

    handleUserFormSubmit() {
        let userprofile = this.state.userprofile;
        userprofile.userId = this.create_UUID();
        this.props.userActions.addUser(userprofile);
        this.toggleModel();
        this.componentDidMount();
    };

    handleUserFormUpdate() {
        this.props.userActions.updateUser({...this.state.userprofile});
        this.toggleModel();
        this.componentDidMount();
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

    chatRoom(param){
        localStorage.setItem('currentUser', JSON.stringify(param));
        setTimeout(()=>{
            this.props.history.push({pathname: '/chat'});
        }, 300);        
    };

    edit(param){
        this.setState({userprofile: {...param}, ModalShow: true});
    }


    render() {
        const { classes } = this.props
        return (
            <div className={`animated fadeIn`}>
                <Row>
                    <Col xs="12" sm="12" lg="12">
                        <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                    <th className="text-center"><i className="icon-people"></i></th>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>PhoneNumber</th>
                                    <th>Designation</th>
                                    <th><button className={`btn btn-outline-primary pt-1 pb-1`} onClick={() => this.setState({
                                        ModalShow: true,
                                        userprofile: Object.assign({}, usermasterVar),
                                        modal: !this.state.modal
                                    })}>Add Contact</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (this.state.userList).map((user, index)=>
                                    <tr>
                                        <td className="text-center">
                                            <div className="avatar">
                                                <img src={loadImage(index)} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                                <span className="avatar-status badge-success"></span>
                                            </div>
                                        </td>
                                        <td>
                                            {user.firstName+ ' '+user.lastName}
                                        </td>
                                        <td>
                                            {user.email}
                                        </td>
                                        <td>
                                             {user.phoneNumber}
                                        </td>
                                        <td>
                                            {user.designation}
                                        </td>
                                        <td>
                                            <span className={`p-2 chatopen cursor_pointer mr-2 bg-success`}><i className="fa fa-comment-o pl-1 pr-1" onClick={() => this.chatRoom(user)}></i></span>
                                            <span className={`p-2 chatopen cursor_pointer bg-primary`}><i className="fa fa-pencil pr-1 pl-1" onClick={() => this.edit(user)}></i></span>
                                        </td>
                                    </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Col>
                    
                    <Modal isOpen={this.state.ModalShow} backdrop="static" toggle={this.toggleModel} className={'modal-lg ' + this.props.className}>

                        <ModalHeader toggle={this.toggleModel}>Add Contact</ModalHeader>
                        <ModalBody>
                            <CardBody className="">
                                <Row className="userForm">
                                    <Col lg={5}>

                                        <FormGroup className={`${this.errorClass(this.state.userprofileErrors.firstName)}`}>
                                            <Label for="name">First Name <b className={`text-danger`}>*</b></Label>
                                            <span className="helpIcon" style={{ textDecoration: "underline", color: "#000000d9" }} href="" id="target0"><i className="fa fa-question-circle-o" aria-hidden="true"></i></span>
                                            <UncontrolledTooltip placement="top" target="target0">
                                                Please Enter First Name
                            </UncontrolledTooltip>
                                            <Input type="text" tabIndex="1" className="underline" value={this.state.userprofile.firstName} onChange={this.ChangeUserProfileHandler} data_obj="userprofile" name="firstName" id="firstName" placeholder="Name" />
                                            <span className={`${this.errorShow(this.state.userprofileErrors.firstName)}`}><span className={`text-danger`}>Please Enter First Name</span></span>
                                        </FormGroup>

                                        <FormGroup className={`${this.errorClass(this.state.userprofileErrors.email)}`}>
                                            <Label for="name">Email <b className={`text-danger`}>*</b></Label>
                                            <span className="helpIcon" style={{ textDecoration: "underline", color: "#000000d9" }} href="" id="target1"><i className="fa fa-question-circle-o" aria-hidden="true"></i></span>
                                            <UncontrolledTooltip placement="top" target="target1">
                                                Please Enter Email
                              </UncontrolledTooltip>
                                            <Input type="email" tabIndex="3" className="underline" value={this.state.userprofile.email} onChange={this.ChangeUserProfileHandler} data_obj="userprofile" name="email" id="email" placeholder="Email" />
                                            <span className={`${this.errorShow(this.state.userprofileErrors.email)}`}><span className={`text-danger`}>Please Enter Email</span></span>
                                        </FormGroup>

                                        <FormGroup className={`${this.errorClass(this.state.userprofileErrors.password)}`}>
                                            <Label for="name">Password <b className={`text-danger`}>*</b></Label>
                                            <span className="helpIcon" style={{ textDecoration: "underline", color: "#000000d9" }} href="" id="target5"><i className="fa fa-question-circle-o" aria-hidden="true"></i></span>
                                            <UncontrolledTooltip placement="top" target="target5">
                                                Please Enter Password
                              </UncontrolledTooltip>
                                            <Input type="password" tabIndex="5" className="underline" value={this.state.userprofile.password} onChange={this.ChangeUserProfileHandler} data_obj="userprofile" name="password" id="password" placeholder="Password" />
                                            <span className={`${this.errorShow(this.state.userprofileErrors.password)}`}><span className={`text-danger`}>Please Enter Password</span></span>
                                        </FormGroup>

                                    </Col>
                                    <Col lg={5} className="offset-lg-1">
                                        <FormGroup className={`${this.errorClass(this.state.userprofileErrors.lastName)}`}>
                                            <Label for="name">Last Name <b className={`text-danger`}>*</b></Label>
                                            <span className="helpIcon" style={{ textDecoration: "underline", color: "#000000d9" }} href="" id="target3"><i className="fa fa-question-circle-o" aria-hidden="true"></i></span>
                                            <UncontrolledTooltip placement="top" target="target3">
                                                Please Enter Last Name
                            </UncontrolledTooltip>
                                            <Input type="text" tabIndex="2" className="underline" value={this.state.userprofile.lastName} onChange={this.ChangeUserProfileHandler} data_obj="userprofile" name="lastName" id="lastName" placeholder="Last Name" />
                                            <span className={`${this.errorShow(this.state.userprofileErrors.lastName)}`}><span className={`text-danger`}>Please Enter LastName</span></span>
                                        </FormGroup>

                                        <FormGroup className={`${this.errorClass(this.state.userprofileErrors.phoneNumber)}`}>
                                            <Label for="phoneNumber">Phone Number <b className={`text-danger`}>*</b></Label>
                                            <span className="helpIcon" style={{ textDecoration: "underline", color: "#000000d9" }} href="" id="target4"><i className="fa fa-question-circle-o" aria-hidden="true"></i></span>
                                            <UncontrolledTooltip placement="top" target="target4">
                                                Please Enter Phone Number
                            </UncontrolledTooltip>
                                            <Input type="text" tabIndex="4" className="underline" value={this.state.userprofile.phoneNumber} onChange={this.ChangeUserProfileHandler} data_obj="userprofile" name="phoneNumber" id="phoneNumber" placeholder="phoneNumber" />
                                            <span className={`${this.errorShow(this.state.userprofileErrors.phoneNumber)}`}><span className={`text-danger`}>Please Enter Phone Number</span></span>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="designation">Designation</Label>
                                            <span className="helpIcon" style={{ textDecoration: "underline", color: "#000000d9" }} href="" id="target7"><i className="fa fa-question-circle-o" aria-hidden="true"></i></span>
                                            <UncontrolledTooltip placement="top" target="target7">
                                                Please Enter Designation
                            </UncontrolledTooltip>
                                            <Input type="text" tabIndex="6" className="underline" value={this.state.userprofile.designation} onChange={this.ChangeUserProfileHandler} data_obj="userprofile" name="designation" id="designation" placeholder="designation" />
                                        </FormGroup>

                                    </Col>
                                </Row>
                            </CardBody>
                        </ModalBody>
                        <ModalFooter>
                            {
                                (this.state.userprofile.userId)? 
                                    <Button color="primary" className={``} onClick={() => this.handleUserFormUpdate()} disabled={!this.state.userprofileValid.formValid} >Update </Button>:
                                    <Button color="primary" className={``} onClick={() => this.handleUserFormSubmit()} disabled={!this.state.userprofileValid.formValid} >Save </Button>
                            }
                            <Button color="secondary" onClick={() => this.setState({ ModalShow: false })}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                </Row>
            </div>
        )
    }
}
export default connect(
    state => ({
        userList: state.user.userList
    }),
    dispatch => ({
        userActions: bindActionCreators(Object.assign({}, userActions), dispatch),
    })
)(User);