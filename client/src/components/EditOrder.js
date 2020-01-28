import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getOrderById , editOrder } from '../actions/orderActions';
import PropTypes from 'prop-types';
import { FormGroup, Form , Input , Button , Label } from 'reactstrap';

export class EditOrder extends Component {
    state = {
        name : '',
        description : '',
        quantity : '',
        rating : '',
        place_of_delivery : ''
    }
    componentDidMount() {
        const ID = window.location.pathname.substring(7);
        this.props.getOrderById(ID);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            console.log('Changed!')
        });
      };
    
    onSubmit = e => {
        e.preventDefault();

        // const {name,description,quantity,rating,place_of_delivery} = this.props.order.orders;

        const updatedOrder = {
        name : this.state.name,
        description : this.state.description,
        quantity : this.state.quantity,
        rating : this.state.rating,
        place_of_delivery : this.state.place_of_delivery
        };

        console.log(updatedOrder);

        // Add order via addOrder action
        this.props.editOrder(window.location.pathname.substring(7),updatedOrder);

        // Close modal
        console.log('Order edited successfully!');

        window.location = '/orders';
    }

    render() {
        const { orders } = this.props.order;
        return (
            <div>
            <h1>EDIT ORDER</h1>
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for='order'>Order name</Label>
                    <Input
                    type='text'
                    name='name'
                    id='order'
                    defaultValue={orders.name}
                    onChange={this.onChange}
                    />

                    <Label for='order'>Description</Label>
                    <Input
                    type='text'
                    name='description'
                    id='order'
                    defaultValue={orders.description}
                    onChange={this.onChange}
                    />

                    <Label for='order'>Quantity</Label>
                    <Input
                    type='number'
                    name='quantity'
                    id='order'
                    defaultValue={orders.quantity}
                    onChange={this.onChange}
                    />

                    <Label for='order'>Rating</Label>
                    <Input
                    type='number'
                    name='rating'
                    id='order'
                    defaultValue={orders.rating}
                    onChange={this.onChange}
                    />

                    <Label for='order'>Place of delivery</Label>
                    <Input
                    type='text'
                    name='place_of_delivery'
                    id='order'
                    defaultValue={orders.place_of_delivery}
                    onChange={this.onChange}
                    />


                    <Button color='dark' style={{ marginTop: '2rem' }} block>
                    Save order
                    </Button>
                </FormGroup>
            </Form>
            </div>
        )
    }
}

EditOrder.propTypes = {
    getOrderById : PropTypes.func.isRequired,
    editOrder : PropTypes.func.isRequired
  }

const mapStateToProps = (state) => ({
    order : state.order
})

export default connect(mapStateToProps, {getOrderById , editOrder
  })(EditOrder);
