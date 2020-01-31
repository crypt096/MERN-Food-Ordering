import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrderById, editOrder } from "../actions/orderActions";
import PropTypes from "prop-types";
import { FormGroup, Form, Input, Button, Label } from "reactstrap";

export class EditOrder extends Component {
  static propTypes = {
    editOrder: PropTypes.func.isRequired,
    getOrderById: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  state = {
    name: "",
    description: "",
    quantity: "",
    rating: "",
    place_of_delivery: ""
  };

  componentDidMount() {
    const ID = window.location.pathname.substring(7);
    this.props.getOrderById(ID);
  }

  checkInputValue = e => {
    if (e.target.value === e.target.defaultValue) {
      this.setState({ [e.target.name]: e.target.defaultValue });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log("Changed!");
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const updatedOrder = {
      name: this.state.name,
      description: this.state.description,
      quantity: this.state.quantity,
      rating: this.state.rating,
      place_of_delivery: this.state.place_of_delivery
    };

    console.log(updatedOrder);

    // Add order via addOrder action
    this.props.editOrder(window.location.pathname.substring(7), updatedOrder);

    // Close modal
    console.log("Order edited successfully!");

    window.location = "/orders";
  };

  render() {
    const { orders } = this.props.order;

    return (
      <div>
        <h1 className="display-3">Edit Order</h1>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="order" className="mb-1">
              <strong>Order name</strong>
            </Label>
            <Input
              type="text"
              name="name"
              id="order"
              defaultValue={orders.name}
              onChange={this.onChange}
              onMouseLeave={this.checkInputValue}
              className="mb-3"
            />

            <Label for="order" className="mb-1">
              <strong>Description</strong>
            </Label>
            <Input
              type="text"
              name="description"
              id="description"
              defaultValue={orders.description}
              onChange={this.onChange}
              onMouseLeave={this.checkInputValue}
              className="mb-3"
            />

            <Label for="order" className="mb-1">
              <strong>Quantity</strong>
            </Label>
            <Input
              type="number"
              name="quantity"
              id="quantity"
              defaultValue={orders.quantity}
              onChange={this.onChange}
              onMouseLeave={this.checkInputValue}
              className="mb-3"
            />

            <Label for="order" className="mb-1">
              <strong>Rating</strong>
            </Label>
            <Input
              type="number"
              name="rating"
              id="rating"
              defaultValue={orders.rating}
              onChange={this.onChange}
              onMouseLeave={this.checkInputValue}
              className="mb-3"
            />

            <Label for="order" className="mb-1">
              <strong>Place of delivery</strong>
            </Label>
            <Input
              type="text"
              name="place_of_delivery"
              id="place_of_delivery"
              defaultValue={orders.place_of_delivery}
              onChange={this.onChange}
              onMouseLeave={this.checkInputValue}
              className="mb-3"
            />

            <Button color="dark" style={{ marginTop: "2rem" }} block>
              Save order
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, { getOrderById, editOrder })(EditOrder);
