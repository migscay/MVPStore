import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Customers  from './components/Customer/Customers';
import Products  from './components/Product/Products';
import Stores  from './components/Store/Stores';
import Sales  from './components/Sales/Sales';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Customers} />
        <Route exact path='/Customers' component={Customers} />
        <Route exact path='/Products' component={Products} />
        <Route exact path='/Stores' component={Stores} />
        <Route exact path='/Sales' component={Sales} />
      </Layout>
    );
  }
}
