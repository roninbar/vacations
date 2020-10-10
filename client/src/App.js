import './App.css';
import { AppBar, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { logInAsync, logOutAsync } from 'features/userSlice';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/private-route';
import HomePage from './pages/home-page';
import LoginForm from './pages/login-form';
import SignupForm from './pages/signup-form';
import Chart from 'pages/chart';

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      menuAnchorEl: null,
    };
  }

  onClickMenuButton({ currentTarget }) {
    this.setState({
      menuAnchorEl: currentTarget,
    });
  }

  onCloseMenu() {
    this.setState({
      menuAnchorEl: null,
    });
  }

  render() {
    const { username, userRole, logOutAsync, classes } = this.props;
    const { menuAnchorEl } = this.state;
    return (
      <BrowserRouter>
        <Container maxWidth="xl" className={classes.root}>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                disabled={!username}
                onClick={this.onClickMenuButton.bind(this)}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={menuAnchorEl} open={menuAnchorEl} onClose={this.onCloseMenu.bind(this)}>
                <MenuItem>
                  <Link to="/">Home</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/chart" disabled={userRole !== 'admin'}>Chart</Link>
                </MenuItem>
              </Menu>
              <Typography variant="h6" className={classes.title}>Vacations</Typography>
              {username ?
                <Button color="inherit" onClick={logOutAsync}>Log Out</Button> :
                <Button color="inherit">Log In</Button>}
            </Toolbar>
          </AppBar>
          {/* Render another <Toolbar> to prevent the <AppBar> from hiding some content. */}
          {/* See https://material-ui.com/components/app-bar/#fixed-placement. */}
          <Toolbar />
          <Switch>
            <Route exact path="/signup">
              <SignupForm />
              <Link to="/login">Already have an account?</Link>
            </Route>
            <Route exact path="/login">
              <LoginForm />
              <Link to="/signup">Don't have an account yet?</Link>
            </Route>
            <PrivateRoute exact path="/chart" component={Chart} />
            <PrivateRoute exact path="/" component={HomePage} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }

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

const mapDispatchToProps = { logInAsync, logOutAsync };

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(withStyles(styles)(App));

