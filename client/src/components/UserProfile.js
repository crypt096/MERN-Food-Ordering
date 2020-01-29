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

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    // console.log(isAuthenticated);
    if (error !== prevProps.error) {
      // Check for update error
      if (error.id === "UPDATE_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

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

    console.log(updatedUser);

    // Attempt to register
    this.props.update(updatedUser);

    // Log message
    console.log("Order edited successfully!");

    window.location = "/";
  };

  render() {
    return (
      <>
        <div className="content">
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
                      <Col className="pr-md-3" md="6">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            defaultValue={this.state.name}
                            onChange={this.onChange}
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-3" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input
                            placeholder="mike@email.com"
                            type="email"
                            defaultValue={this.state.email}
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-3" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue={this.state.firstName}
                            onChange={this.onChange}
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-3" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue={this.state.lastName}
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
                          <label>Address</label>
                          <Input
                            defaultValue={this.state.address}
                            onChange={this.onChange}
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label>Favorite food</label>
                          <Input
                            defaultValue={this.state.favoriteFood}
                            onChange={this.onChange}
                            placeholder="Favorite food"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="mt-5">
                      <Button
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
                    <h5 className="title mt-3" style={{ textAlign: "center" }}>
                      Smart AI
                    </h5>
                    <p className="description" style={{ textAlign: "center" }}>
                      Ceo/Co-Founder
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
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
