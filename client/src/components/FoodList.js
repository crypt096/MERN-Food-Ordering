import React, { Component } from 'react';
import { Col, CardDeck, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import { connect } from 'react-redux';
import { getFoods } from '../actions/foodActions';
import PropTypes from 'prop-types'
import OrderModal from './OrderModal';

export class FoodList extends Component {

  componentDidMount() {
    this.props.getFoods();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }

  render() {
    const { foods } = this.props.food;

    const foodCards = foods.map(({_id,name,opis,image,ocena,cena}) => (
            <Col sm="4">
              <Card style={{ marginBottom: '50px' }}>
               <CardImg top width="100%" height="215px" src={image} alt="Card image cap" />
               <CardBody>
                 <CardTitle>{name}</CardTitle>
                 <CardSubtitle>{opis}</CardSubtitle>
                 <CardText><strong>Cena :</strong> {cena} RSD</CardText>
                 <CardText>{ocena}</CardText>
                 <OrderModal/>
               </CardBody>
             </Card>
            </Col>
      ))

      
    return (
      <div>
      <CardDeck className="row">
        {foodCards}
      </CardDeck>
      </div>
    );
  }
}

FoodList.propTypes = {
  getFoods : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  food: state.food
})

export default connect(mapStateToProps, {
  getFoods
})(FoodList);
