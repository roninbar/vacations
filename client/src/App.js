import './App.css';
import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import LoginForm from './pages/login-form';
import PrivateRoute from './components/private-route';
import SignupForm from './pages/signup-form';
import HomePage from './pages/home-page';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signup">
          <SignupForm />
          <Link to="/login">Already have an account?</Link>
        </Route>
        <Route exact path="/login">
          <LoginForm />
          <Link to="/signup">Don't have an account yet?</Link>
        </Route>
        <PrivateRoute exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
