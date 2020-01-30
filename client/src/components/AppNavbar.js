import React, { Component, Fragment } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/items">Items</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/orders">Orders</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/food">Food</NavLink>
          </NavItem>
        </Nav>
        <NavbarText className="navbar-text mr-5">
          <strong>{user ? `Welcome ${user.name}` : ""}</strong>
        </NavbarText>
        <Logout />
        <strong style={{ color: "white" }}>|</strong>
        <NavLink href="/profile" style={{ color: "white" }}>
          <strong>My profile</strong>
        </NavLink>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <Nav className="ml-auto">
          <RegisterModal />
          <LoginModal />
        </Nav>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">ShoppingList</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);
