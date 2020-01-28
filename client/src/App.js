import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModel from './components/ItemModel';
import OrderList from './components/OrderList';
import EditOrder from './components/EditOrder';
import FoodList from './components/FoodList';

import { Container } from 'reactstrap';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <AppNavbar />
          <Container>
              <Switch>
              <Route exact path={["/", "/items"]}>
                <ItemModel />
                <ShoppingList/>
              </Route>

              <Route path="/orders">
                <OrderList/>
              </Route>

              <Route exact path='/order/:id'>
              <EditOrder/>
              </Route>

              <Route path="/food">
                <FoodList/>
              </Route>
              </Switch>
          </Container>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
