import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor() {
    super();
    this.state = {
    
    }
  }

  componentDidMount( ){
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <Nav navbar>
          <NavItem className={`px-3 nav-page-tab`}>
            <Link to="/user" className={`nav-link `} ><i className="fa fa-user-o mr-2 mb-1" aria-hidden="true" ></i>
              User</Link>
          </NavItem>
          <NavItem className={`px-3 nav-page-tab`}>
            <Link to="/chat" className={`nav-link `} ><i className="fa fa-comments mr-2 mb-1" aria-hidden="true" ></i>
              Chat</Link>
          </NavItem>
        </Nav>
        <Nav className="xsmall-dev" navbar> 
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/1.jpg'} className="img-avatar" alt="" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><Link to="/user" className={`nav-link `} ><i className="fa fa-user-o"></i> User </Link></DropdownItem>
              <DropdownItem><Link to="/chat" className={`nav-link `} ><i className="fa fa-comments"></i> Chat </Link> </DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
