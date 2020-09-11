import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signup">
          <h1>Sign Up</h1>
        </Route>
        <Route exact path="/login">
          <h1>Log In</h1>
        </Route>
        <Route exact path="/">
          <h1>Homepage</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
