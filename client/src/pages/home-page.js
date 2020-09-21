import { Grid, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logOutAsync } from '../actions/user';
import { loadVacationsAsync, setFollowingAsync } from '../actions/vacations';
import Vacation from '../components/vacation';

class HomePage extends Component {

    onChangeFollowing(vacationId, isFollowing) {
        this.props.setFollowing(vacationId, isFollowing);
    }

    render() {
        const { classes, username, logOut, vacations } = this.props;
        return (
            <div className={classes.root}>
                <Typography className={classes.logout}>
                    {username} (<Link to="/login" onClick={logOut}>log out</Link>)
                </Typography>
                <Grid container spacing={4}>
                    {vacations.map(({ id, from, to, ...rest }) => (
                        <Grid item key={id} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Vacation
                                from={new Date(from)}
                                to={new Date(to)}
                                {...rest}
                                onChangeFollowing={this.onChangeFollowing.bind(this, id)}
                            />
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
    loadVacations: () => dispatch(loadVacationsAsync()),
    setFollowing: (vacationId, isFollowing) => dispatch(setFollowingAsync(vacationId, isFollowing)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(withRouter(withStyles(styles)(HomePage)));

