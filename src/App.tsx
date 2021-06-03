import './App.css';
import { ReactElement } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProductsPage from './Pages/Products/Products.Page';
import CartPage from './Pages/Cart/Cart.Page';
import OrderPage from './Pages/Order/Order.Page';

function App(): ReactElement {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/products" />
        </Route>
        <Route path="/products" component={ProductsPage} exact />
        <Route path="/cart" component={CartPage} exact />
        <Route path="/order" component={OrderPage} exact />
      </Switch>
    </div>
  );
}

export default App;
