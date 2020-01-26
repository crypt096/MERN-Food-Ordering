import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Container
} from 'reactstrap';

export class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <div>
        <Navbar color='dark' dark expand='md' className='mb-5'>
          <Container>
            <NavbarBrand href='/'>ShoppingList</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='mr-auto' navbar>
                <NavItem>
                  <NavLink href="/items">Items</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/orders'>Orders</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/food'>Food</NavLink>
                </NavItem>
              </Nav>
              <NavbarText>Simple Text</NavbarText>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
