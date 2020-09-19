import { Grid, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logOutAsync } from '../actions/user';
import Vacation from '../components/vacation';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vacations: [],
        };
    }

    render() {
        const { classes, username, logOut } = this.props;
        const { vacations } = this.state;
        return (
            <div className={classes.root}>
                <Typography className={classes.logout}>
                    {username} (<Link to="/login" onClick={logOut}>log out</Link>)
                </Typography>
                <Grid container spacing={4}>
                    {vacations.map(({ id, ...rest }) => (
                        <Grid item key={id} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Vacation {...rest} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }

    async componentDidMount() {
        const response = await fetch('/vacation/all');
        if (200 <= response.status && response.status < 300) {
            const vacations = await response.json();
            this.setState({
                vacations: vacations.map(({ from, to, ...rest }) => ({
                    from: new Date(from),
                    to: new Date(to),
                    ...rest,
                })),
            });
        }
    }
    
}

const styles = {
    root: {
        padding: '2rem',
        backgroundColor: '#f5f5f5',
    },
    logout: {
        float: 'right',
    },
};

const mapStateToProps = ({ user: { name: username } }) => ({ username });

const mapDispatchToProps = dispatch => ({ logOut: () => dispatch(logOutAsync()) });

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(withRouter(withStyles(styles)(HomePage)));

