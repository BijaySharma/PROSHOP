import React from 'react';
// libraries
import { Container } from 'react-bootstrap';
// components
import Header from './components/Header';
import Footer from './components/Footer';
// screens
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <>
    <Header />
    <main className="py-3">
      <Container>
        <HomeScreen />
      </Container>
    </main>
    <Footer />
    </>
  );
}

export default App;