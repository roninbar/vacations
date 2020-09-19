import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logInAsync } from '../actions/user';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false,
        };
    }

    async onSubmit(e) {
        e.preventDefault();
        const { logIn, history } = this.props;
        const { username, password } = this.state;
        this.setState({ submitted: true });
        await logIn(username, password);
        history.replace('/');
    }

    onChangeField({ target: { name, value } }) {
        this.setState({ [name]: value });
    }

    render() {
        const { classes } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <form className={classes.root} noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
                <TextField
                    variant="outlined"
                    type="text"
                    name="username"
                    label="Username"
                    value={username}
                    onChange={this.onChangeField.bind(this)} />
                <TextField
                    variant="outlined"
                    type="password"
                    name="password"
                    label="Password"
                    value={password}
                    onChange={this.onChangeField.bind(this)}
                />
                <Button type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!username || !password || submitted}
                >Log In</Button>
            </form>
        );
    }

}

const styles = theme => ({
    root: {
        '& .MuiTextField-root, & .MuiButton-root': {
            margin: theme.spacing(1),
        },
        '& .MuiTextField-root': {
            width: '25ch',
        },
    },
});

const mapDispatchToProps = dispatch => ({ logIn: (username, password) => dispatch(logInAsync(username, password)) });

const withRedux = connect(null, mapDispatchToProps);

export default withRedux(withRouter(withStyles(styles)(LoginForm)));

