import { Button, TextField, withStyles } from '@material-ui/core';
import { logInAsync, signUpAsync } from 'features/userSlice';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
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
        const { signUpAsync, logInAsync, history } = this.props;
        const { username, password, firstName, lastName } = this.state;
        const { payload: { status } } = await signUpAsync({ username, password, firstName, lastName });
        if (status === 201) {
            await logInAsync({ username, password });
            history.push('/');
        }
    }

    render() {
        const { firstName, lastName, username, available, password, password2, submitted } = this.state;
        const { classes } = this.props;
        return (
            <form className={classes.root} noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
                <TextField
                    variant="outlined"
                    type="text"
                    name="firstName"
                    label="First Name"
                    helperText={!firstName && 'Required.'}
                    error={!firstName}
                    value={firstName}
                    onChange={this.onChange.bind(this)}
                />
                <TextField
                    variant="outlined"
                    type="text"
                    name="lastName"
                    label="Last Name"
                    helperText={!lastName && 'Required.'}
                    error={!lastName}
                    value={lastName}
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
                    disabled={!firstName || !lastName || !username || !available || !password || password !== password2 || submitted}
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

const withRedux = connect(null, { signUpAsync, logInAsync });

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

export default withRedux(withRouter(withStyles(styles)(SignupForm)));