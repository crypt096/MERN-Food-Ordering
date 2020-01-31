import React, { Component } from "react";

// Reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

import { connect } from "react-redux";
import { update } from "../actions/authActions";
import PropTypes from "prop-types";

class UserProfile extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    error: PropTypes.object,
    update: PropTypes.func
  };

  state = {
    name: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    favoriteFood: ""
  };

  printState = e => {
    e.preventDefault();
    console.log(this.state);
    console.log(this.props.user);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log("Changed!");
    });
  };

  onSubmit = e => {
    e.preventDefault();

    // Create user object
    const updatedUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      favoriteFood: this.state.favoriteFood
    };

    // Attempt to register
    this.props.update(updatedUser);

    console.log(this.props);

    // Log message
    console.log("User updated successfully!");

    window.location = "/";
  };

  render() {
    return (
      <>
        <div className="content">
          {this.props.user ? (
            <div>
              <Row>
                <Col md="8">
                  <Card
                    body
                    inverse
                    style={{ backgroundColor: "#333", borderColor: "#333" }}
                  >
                    <Col className="pr-md-1">
                      <h5 className="title">Edit Profile</h5>
                    </Col>
                    <CardBody>
                      <Form onSubmit={this.onSubmit}>
                        <Row>
                          <Col className="pr-md-3" md="3">
                            <FormGroup>
                              <label htmlFor="name">Username</label>
                              <Input
                                name="name"
                                defaultValue={this.props.user.name}
                                onChange={this.onChange}
                                placeholder="Username"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-md-3" md="3">
                            <FormGroup>
                              <label htmlFor="email">Email address</label>
                              <Input
                                name="email"
                                placeholder="username@email.com"
                                type="email"
                                defaultValue={this.props.user.email}
                                onChange={this.onChange}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-md-3" md="3">
                            <FormGroup>
                              <label htmlFor="password">Password</label>
                              <Input
                                name="password"
                                placeholder="password"
                                type="password"
                                defaultValue={this.props.user.password}
                                onChange={this.onChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pr-md-3" md="6">
                            <FormGroup>
                              <label htmlFor="firstName">First Name</label>
                              <Input
                                name="firstName"
                                defaultValue={this.props.user.firstName}
                                onChange={this.onChange}
                                placeholder="Company"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-md-3" md="6">
                            <FormGroup>
                              <label htmlFor="lastName">Last Name</label>
                              <Input
                                name="lastName"
                                defaultValue={this.props.user.lastName}
                                onChange={this.onChange}
                                placeholder="Last Name"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label htmlFor="address">Address</label>
                              <Input
                                name="address"
                                defaultValue={this.props.user.address}
                                onChange={this.onChange}
                                placeholder="Home Address"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label htmlFor="favoriteFood">
                                Favorite food
                              </label>
                              <Input
                                name="favoriteFood"
                                defaultValue={this.props.user.favoriteFood}
                                onChange={this.onChange}
                                placeholder="Favorite food"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <div className="mt-5">
                          <Button
                            onClick={this.printState}
                            className="btn-fill"
                            color="secondary"
                            type="submit"
                            style={{ width: "100%" }}
                          >
                            Save
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-user">
                    <CardBody style={{ alignSelf: "center" }}>
                      <CardText />
                      <div className="author">
                        <img
                          alt="..."
                          className="avatar"
                          src={`https://cdn.pixabay.com/photo/2017/10/24/00/39/bot-icon-2883144_960_720.png`}
                          width={"150px"}
                          height={"150px"}
                        />
                        <h5
                          className="title mt-3"
                          style={{ textAlign: "center" }}
                        >
                          Smart AI
                        </h5>
                        <p
                          className="description"
                          style={{ textAlign: "center" }}
                        >
                          Ceo/Co-Founder
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { update })(UserProfile);
