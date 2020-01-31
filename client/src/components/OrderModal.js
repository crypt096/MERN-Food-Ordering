import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { addOrder } from "../actions/orderActions";
import PropTypes from "prop-types";

class OrderModal extends Component {
  state = {
    orderModal: false,
    alertVisible: false,
    errorVisible: false,
    name: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  showAlert = () => {
    this.setState({
      alertVisible: true
    });
  };

  showErrorAlert = () => {
    this.setState({
      errorVisible: true
    });
  };

  toggle = () => {
    this.setState({
      orderModal: !this.state.orderModal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    if (
      !this.state.name ||
      !this.state.description ||
      !this.state.quantity ||
      !this.state.rating ||
      !this.state.place_of_delivery
    ) {
      this.showErrorAlert();
      setTimeout(() => {
        this.setState({
          errorVisible: false
        });
      }, 3000);
    } else {
      const newOrder = {
        name: this.state.name,
        description: this.state.description,
        quantity: this.state.quantity,
        rating: this.state.rating,
        status: "in progress",
        place_of_delivery: this.state.place_of_delivery
      };

      // Add order via addOrder action
      this.props.addOrder(newOrder);

      this.showAlert();

      setTimeout(() => {
        // Close modal
        this.toggle();
      }, 2000);
    }
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            outline
            color="dark"
            className="mb-2 mt-2"
            width="150px"
            onClick={this.toggle}
          >
            Order
          </Button>
        ) : (
          <Alert color="danger">
            Please <strong>Log In</strong> or <strong>Register</strong> to order
            food
          </Alert>
        )}

        <Modal isOpen={this.state.orderModal} toggle={this.toggle}>
          <Alert
            className="mx-3 my-3"
            color="success"
            isOpen={this.state.alertVisible}
          >
            Your food has been successfully ordered
          </Alert>
          <Alert
            className="mx-3 my-3"
            color="danger"
            isOpen={this.state.errorVisible}
          >
            Please enter all fields
          </Alert>
          <ModalHeader toggle={this.toggle}>Add To Ordering List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="order" className="mb-1">
                  <strong>Order name</strong>
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="order"
                  placeholder="Order name"
                  onChange={this.onChange}
                  className="mb-3"
                />

                <Label for="description" className="mb-1">
                  <strong>Description</strong>
                </Label>
                <Input
                  type="text"
                  name="description"
                  id="order"
                  placeholder="Order description"
                  onChange={this.onChange}
                  className="mb-3"
                />

                <Label for="quantity" className="mb-1">
                  <strong>Quantity</strong>
                </Label>
                <Input
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="Quantity"
                  onChange={this.onChange}
                  className="mb-3"
                />

                <Label for="rating" className="mb-1">
                  <strong>Rating</strong>
                </Label>
                <Input
                  type="number"
                  name="rating"
                  id="rating"
                  placeholder="Rating"
                  onChange={this.onChange}
                  className="mb-3"
                />

                <Label for="place_of_delivery" className="mb-1">
                  <strong>Place of delivery</strong>
                </Label>
                <Input
                  type="text"
                  name="place_of_delivery"
                  id="place_of_delivery"
                  placeholder="Place of delivery"
                  onChange={this.onChange}
                  className="mb-3"
                />

                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Finish ordering
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addOrder })(OrderModal);
