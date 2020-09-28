import { Grid, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logOutAsync } from 'features/userSlice';
import { loadVacationsAsync, setFollowingAsync } from 'features/vacationsSlice';
import Vacation from 'components/vacation';

class HomePage extends Component {

    onChangeFollowing(vacationId, isFollowing) {
        this.props.setFollowingAsync(vacationId, isFollowing);
    }

    render() {
        const { classes, username, userRole, logOutAsync, vacations } = this.props;
        return (
            <div className={classes.root}>
                <Typography className={classes.logout}>
                    {username} (<Link to="/login" onClick={logOutAsync}>log out</Link>)
                </Typography>
                <Grid container spacing={4}>
                    {vacations.map(({ id, from, to, ...rest }) => (
                        <Grid item key={id} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Vacation
                                from={new Date(from)}
                                to={new Date(to)}
                                {...rest}
                                onChangeFollowing={this.onChangeFollowing.bind(this, id)}
                                userRole={userRole}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }

    async componentDidMount() {
        this.props.loadVacationsAsync();
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

const mapStateToProps = ({ user: { name: username, role: userRole }, vacations: { vacations } }) => ({ username, userRole, vacations });

const mapDispatchToProps = { logOutAsync, loadVacationsAsync, setFollowingAsync };

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(withRouter(withStyles(styles)(HomePage)));

