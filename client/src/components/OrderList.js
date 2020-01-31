import React, { Component } from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { getOrders, deleteOrder } from "../actions/orderActions";
import PropTypes from "prop-types";
import { FaTrash, FaEdit, FaGripLinesVertical, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export class OrderList extends Component {
  static propTypes = {
    getOrders: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      order: [],
      search: ""
    };
  }

  componentDidMount() {
    this.props.getOrders();
  }

  onDeleteClick = id => {
    this.props.deleteOrder(id);
  };

  updateSearch(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    const { orders } = this.props.order;

    let filteredOrders = orders.filter(
      ({
        _id,
        name,
        description,
        quantity,
        status,
        rating,
        place_of_delivery,
        date
      }) => {
        return (
          name.toLowerCase().indexOf(this.state.search) !== -1 ||
          name.indexOf(this.state.search) !== -1 ||
          description.indexOf(this.state.search) !== -1 ||
          description.toLowerCase().indexOf(this.state.search) !== -1 ||
          place_of_delivery.indexOf(this.state.search) !== -1 ||
          place_of_delivery.toLowerCase().indexOf(this.state.search) !== -1 ||
          date.indexOf(this.state.search) !== -1
        );
      }
    );

    const orderTableRows = filteredOrders.map(
      (
        {
          _id,
          name,
          description,
          quantity,
          status,
          rating,
          place_of_delivery,
          date
        },
        i
      ) => (
        <tr key={_id}>
          <th scope="row">{i + 1}</th>
          <td style={{ textAlign: "center" }}>{name}</td>
          <td style={{ textAlign: "center" }}>{description}</td>
          <td style={{ textAlign: "center" }}>{quantity}</td>
          <td style={{ textAlign: "center" }}>{status}</td>
          <td style={{ textAlign: "center" }}>
            {rating} <FaStar className="mb-1 ml-1" />
          </td>
          <td style={{ textAlign: "center" }}>{place_of_delivery}</td>
          <td style={{ textAlign: "center" }}>{date.substring(0, 10)}</td>
          <td style={{ textAlign: "center" }}>
            {status === "closed" ? null : (
              <span>
                <Link to={`/order/${_id}`} key={_id}>
                  <FaEdit color="white" />
                </Link>
                <FaGripLinesVertical color="white" />
              </span>
            )}
            <a href="/orders" onClick={this.onDeleteClick.bind(this, _id)}>
              <FaTrash color="white" />
            </a>
          </td>
        </tr>
      )
    );

    return (
      <div>
        <h1 className="display-3">Search for orders</h1>
        <br />
        <input
          className="form-control col-4"
          placeholder="Search orders by name | description | date "
          type="search"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        />
        <br />
        {this.props.isAuthenticated ? (
          <Table dark>
            <thead>
              <tr>
                <th>#</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Description</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Rating</th>
                <th style={{ textAlign: "center" }}>Place of delivery</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>{orderTableRows}</tbody>
          </Table>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  getOrders,
  deleteOrder
})(OrderList);
