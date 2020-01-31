import React, { Component } from "react";
import {
  Col,
  CardDeck,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { FaShoppingBasket, FaStar } from "react-icons/fa";
import { connect } from "react-redux";
import { getFoods } from "../actions/foodActions";
import PropTypes from "prop-types";
import OrderModal from "./OrderModal";

export class FoodList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      food: [],
      search: ""
    };
  }
  componentDidMount() {
    this.props.getFoods();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  updateSearch(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    const { foods } = this.props.food;

    let filteredFood = foods.filter(
      ({ _id, name, opis, image, ocena, cena }) => {
        return (
          name.toLowerCase().indexOf(this.state.search) !== -1 ||
          name.indexOf(this.state.search) !== -1 ||
          opis.indexOf(this.state.search) !== -1 ||
          opis.toLowerCase().indexOf(this.state.search) !== -1 ||
          ocena.indexOf(this.state.search) !== -1 ||
          cena.indexOf(this.state.search) !== -1
        );
      }
    );

    const foodCards = filteredFood.map(
      ({ _id, name, opis, image, ocena, cena }) => (
        <Col sm="4" key={_id}>
          <Card style={{ marginBottom: "50px" }}>
            <CardImg
              top
              width="100%"
              height="215px"
              src={image}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle
                className="pr-5"
                style={{ fontSize: "24px", color: "black", fontWeight: "500" }}
              >
                {name}
              </CardTitle>
              <CardSubtitle
                className="mb-2 mt-1"
                style={{ fontSize: "14px", color: "gray" }}
              >
                {opis}
              </CardSubtitle>
              <CardText>
                <FaShoppingBasket
                  className="mb-1 mr-2"
                  style={{ fontSize: "20px" }}
                />
                <strong> {cena} RSD </strong>
              </CardText>
              <CardText>
                <FaStar className="mb-1 mr-2" style={{ fontSize: "20px" }} />
                <strong>{ocena}</strong>
              </CardText>
              <OrderModal />
            </CardBody>
          </Card>
        </Col>
      )
    );

    return (
      <div>
        <div className="ml-3">
          <h1 className="display-3">Search for food</h1>
          <br />
          <input
            className="form-control col-4"
            placeholder="Search food by name | opis | ocena | cena"
            type="search"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
          <br />
        </div>
        <CardDeck className="row">{foodCards}</CardDeck>
      </div>
    );
  }
}

FoodList.propTypes = {
  getFoods: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  food: state.food
});

export default connect(mapStateToProps, {
  getFoods
})(FoodList);
