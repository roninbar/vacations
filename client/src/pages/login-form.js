import { Button, CircularProgress, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { logInAsync } from 'features/userSlice';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

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
        const { logInAsync, history } = this.props;
        const { username, password } = this.state;
        await logInAsync({ username, password });
        history.push('/');
    }

    onChangeField({ target: { name, value } }) {
        this.setState({ [name]: value });
    }

    render() {
        const { loading, classes } = this.props;
        const { username, password } = this.state;
        return (
            <div className={classes.root}>
                <form noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)} className={classes.form}>
                    <TextField
                        variant="outlined"
                        type="text"
                        name="username"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Username"
                        // autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={this.onChangeField.bind(this)}
                    />
                    <TextField
                        variant="outlined"
                        type="password"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        id="password"
                        // autoComplete="current-password"
                        value={password}
                        onChange={this.onChangeField.bind(this)}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={!username || !password || loading}
                        className={classes.submit}
                    >
                        {loading ? <CircularProgress /> : 'Log In'}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <NavLink to="/signup">
                                {"Don't have an account? Sign Up"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }

}

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

const withRedux = connect(({ user: { loading } }) => ({ loading }), { logInAsync });

export default withRedux(withRouter(withStyles(styles)(LoginForm)));

