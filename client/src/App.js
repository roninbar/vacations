import './App.css';
import { AppBar, Button, Container, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { logOutAsync } from 'features/userSlice';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/private-route';
import HomePage from './pages/home-page';
import LoginForm from './pages/login-form';
import SignupForm from './pages/signup-form';

function App({ classes, username, logOutAsync }) {
  return (
    <BrowserRouter>
      <Container maxWidth="xl" className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>Vacations</Typography>
            {username ?
              <Button color="inherit" onClick={logOutAsync}>Log Out</Button> :
              <Button color="inherit">Log In</Button>}
          </Toolbar>
        </AppBar>
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
      </Container>
    </BrowserRouter>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logout: {
    float: 'right',
  },
});

function mapStateToProps({ user: { name: username } }) {
  return { username };
}

const mapDispatchToProps = { logOutAsync };

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(withStyles(styles)(App));

