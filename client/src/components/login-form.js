import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    async onSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        const { status } = await fetch('/login', {
            method: 'POST',
            body,
        });
        const { history } = this.props;
        if (history && 200 <= status && status < 300) {
            history.push('/');
        }
    }

    onChangeField({ target: { name, value } }) {
        this.setState({ [name]: value });
    }

    render() {
        const { classes } = this.props;
        const { username, password } = this.state;
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
                    disabled={!username || !password}
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

export default withRouter(withStyles(styles)(LoginForm));