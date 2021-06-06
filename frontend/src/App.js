import React, {useEffect} from 'react';
// libraries
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// components
import Header from './components/Header';
import Footer from './components/Footer';
// screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { loadUser } from './actions/userActions';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  },)

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
