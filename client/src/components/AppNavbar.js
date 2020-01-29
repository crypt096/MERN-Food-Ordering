import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

// export class AppNavbar extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isOpen: false
//     };
//   }

//   toggle = () => {
//     this.setState({ isOpen: !this.state.isOpen });
//   };
//   render() {
//     return (
//       <div>
//         <Navbar color="dark" dark expand="md" className="mb-5">
//           <Container>
//             <NavbarBrand href="/">ShoppingList</NavbarBrand>
//             <NavbarToggler onClick={this.toggle} />
//             <Collapse isOpen={this.state.isOpen} navbar>
//               <Nav className="mr-auto" navbar>
//                 <NavItem>
//                   <NavLink href="/items">Items</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink href="/orders">Orders</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink href="/food">Food</NavLink>
//                 </NavItem>
//               </Nav>
//               <Nav className="ml-auto" navbar>
//                 <NavItem>
//                   <RegisterModal />
//                 </NavItem>
//                 <NavItem>
//                   <Logout />
//                 </NavItem>
//               </Nav>
//             </Collapse>
//           </Container>
//         </Navbar>
//       </div>
//     );
//   }
// }

// export default AppNavbar;

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
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}` : ""}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">ShoppingList</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
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
