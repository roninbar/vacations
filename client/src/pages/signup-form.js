import { Button, TextField, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            password2: '',
            available: true,
            submitted: false,
        };
    }

    onChange({ target: { name, value } }) {
        this.setState({ [name]: value });
    }

    async onSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        try {
            const { firstname, lastname, username, password } = this.state;
            const body = new URLSearchParams();
            body.set('firstname', firstname);
            body.set('lastname', lastname);
            body.set('username', username);
            body.set('password', password);
            const { status } = await fetch('/user', {
                method: 'POST',
                body,
            });
            if (status === 201) {
                this.setState({
                    firstname: '',
                    lastname: '',
                    username: '',
                    password: '',
                    password2: '',
                });
            }
        } finally {
            this.setState({ submitted: false });
        }
    }

    render() {
        const { firstname, lastname, username, available, password, password2, submitted } = this.state;
        const { classes } = this.props;
        return (
            <form className={classes.root} noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
                <TextField
                    variant="outlined"
                    type="text"
                    name="firstname"
                    label="First Name"
                    helperText={!firstname && 'Required.'}
                    error={!firstname}
                    value={firstname}
                    onChange={this.onChange.bind(this)}
                />
                <TextField
                    variant="outlined"
                    type="text"
                    name="lastname"
                    label="Last Name"
                    helperText={!lastname && 'Required.'}
                    error={!lastname}
                    value={lastname}
                    onChange={this.onChange.bind(this)}
                />
                <TextField
                    variant="outlined"
                    type="text"
                    name="username"
                    label="Username"
                    helperText={!username ? 'Required.' : !available && `"${username}" is not available.`}
                    error={!username || !available}
                    value={username}
                    onChange={this.onChange.bind(this)}
                />
                <TextField
                    variant="outlined"
                    type="password"
                    name="password"
                    label="Password"
                    helperText={!password && 'Required.'}
                    error={!password}
                    value={password}
                    onChange={this.onChange.bind(this)}
                />
                <TextField
                    variant="outlined"
                    type="password"
                    name="password2"
                    label="Repeat Password"
                    helperText={password !== password2 && 'Passwords don\'t match.'}
                    error={password !== password2}
                    value={password2}
                    onChange={this.onChange.bind(this)}
                />
                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    size="large"
                    disabled={!firstname || !lastname || !username || !available || !password || password !== password2 || submitted}
                    ref={this.submitButton}
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