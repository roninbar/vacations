import { Grid, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logOutAsync } from '../actions/user';
import { loadVacations } from '../actions/vacations';
import Vacation from '../components/vacation';

class HomePage extends Component {

    render() {
        const { classes, username, logOut, vacations } = this.props;
        return (
            <div className={classes.root}>
                <Typography className={classes.logout}>
                    {username} (<Link to="/login" onClick={logOut}>log out</Link>)
                </Typography>
                <Grid container spacing={4}>
                    {vacations.map(({ id }) => (
                        <Grid item key={id} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Vacation id={id} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }

    async componentDidMount() {
        this.props.loadVacations();
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

const mapStateToProps = ({ user: { name: username }, vacations: { vacations } }) => ({ username, vacations });

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOutAsync()),
    loadVacations: () => dispatch(loadVacations()),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(withRouter(withStyles(styles)(HomePage)));

