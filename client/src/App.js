import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
// import ShoppingList from "./components/ShoppingList";
// import ItemModel from "./components/ItemModel";
import OrderList from "./components/OrderList";
import EditOrder from "./components/EditOrder";
import FoodList from "./components/FoodList";
import UserProfile from "./components/UserProfile";

import { Container } from "reactstrap";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <Container>
              <Switch>
                <Route exact path={["/", "/food"]}>
                  <FoodList />
                </Route>

                <Route path="/orders">
                  <OrderList />
                </Route>

                <Route exact path="/order/:id">
                  <EditOrder />
                </Route>

                {/* <Route path="/items">
                  <ItemModel />
                  <ShoppingList />
                </Route> */}

                <Route path="/users/:id">
                  <UserProfile />
                </Route>
              </Switch>
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
