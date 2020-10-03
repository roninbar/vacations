import { Button, Snackbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import { logInAsync } from 'features/userSlice';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
        const { logInAsync, history } = this.props;
        const { username, password } = this.state;
        this.setState({ submitted: true });
        await logInAsync({ username, password });
        history.push('/');
    }

    onChangeField({ target: { name, value } }) {
        this.setState({ [name]: value });
    }

    render() {
        const { classes, error } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className={classes.root}>
                <form noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
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
                <Snackbar open={error}>
                    <Alert variant="filled" severity="error" elevation={6}>{error.message}</Alert>
                </Snackbar>
            </div>
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

const withRedux = connect(({ user: { error } }) => ({ error }), { logInAsync });

export default withRedux(withRouter(withStyles(styles)(LoginForm)));

