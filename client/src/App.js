import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import HomePage from './components/home-page';
import LoginForm from './components/login-form';
import PrivateRoute from './components/private-route';
import SignupForm from './components/signup-form';
import { reduceUser } from './reducers/user';

const store = createStore(combineReducers({ user: reduceUser }), composeWithDevTools(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
