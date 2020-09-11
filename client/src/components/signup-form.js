import { Button, TextField, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
            available: true,
        };
    }

    onChange({ target: { name, value } }) {
        this.setState({ [name]: value });
    }

    async onSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        await fetch('/user', {
            method: 'POST',
            body,
        });
    }

    render() {
        const { username, password, password2, available } = this.state;
        const { classes } = this.props;
        return (
            <form className={classes.root} noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
                <TextField
                    variant="outlined"
                    type="text"
                    name="username"
                    label="Username"
                    error={!username || !available}
                    value={username}
                    onChange={this.onChange.bind(this)}
                />
                <TextField
                    variant="outlined"
                    type="password"
                    name="password"
                    label="Password"
                    error={!password}
                    value={password}
                    onChange={this.onChange.bind(this)}
                />
                <TextField
                    variant="outlined"
                    type="password"
                    name="password2"
                    label="Repeat Password"
                    error={password !== password2}
                    value={password2}
                    onChange={this.onChange.bind(this)}
                />
                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    size="large"
                >Sign Up</Button>
            </form>
        );
    }

    async componentDidUpdate(prevProps, { username: prevUsername }) {
        const { username } = this.state;
        if (username && username !== prevUsername) {
            const { status } = await fetch(`/user/${username}`, { method: 'HEAD' });
            this.setState({ available: status === 404 });
        }
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

export default withRouter(withStyles(styles)(SignupForm));