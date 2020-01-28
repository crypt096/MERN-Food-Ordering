import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import  { addOrder }  from '../actions/orderActions';

class OrderModal extends Component {
  state = {
    orderModal: false,
    name: ''
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

    const newOrder = {
      name: this.state.name,
      description : this.state.description,
      quantity : this.state.quantity,
      rating : this.state.rating,
      place_of_delivery : this.state.place_of_delivery
    };

    // Add order via addOrder action
    this.props.addOrder(newOrder);

    // Close modal
    this.toggle();

    alert('Order successfully added!');
  };

  render() {
    return (
      <div>
        
          <Button
            color='dark'
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Order
          </Button>
        

        <Modal isOpen={this.state.orderModal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Ordering List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='order'>Order</Label>
                <Input
                  type='text'
                  name='name'
                  id='order'
                  placeholder='Order name'
                  onChange={this.onChange}
                />

                <Input
                  type='text'
                  name='description'
                  id='order'
                  placeholder='Order description'
                  onChange={this.onChange}
                />

                <Input
                  type='number'
                  name='quantity'
                  id='order'
                  placeholder='Quantity'
                  onChange={this.onChange}
                />

                <Input
                  type='number'
                  name='rating'
                  id='order'
                  placeholder='Rating'
                  onChange={this.onChange}
                />

                <Input
                  type='text'
                  name='place_of_delivery'
                  id='order'
                  placeholder='Place of delivery'
                  onChange={this.onChange}
                />

                <Button color='dark' style={{ marginTop: '2rem' }} block>
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
  order: state.order
});

export default connect(
  mapStateToProps,
  { addOrder }
)(OrderModal);