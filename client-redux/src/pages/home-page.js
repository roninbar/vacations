import { Grid, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logOutAsync } from '../actions/user';
import Vacation from '../components/vacation';

function HomePage({ classes, username, logOut }) {

    const vacations = [
        {
            id: 1,
            desc: 'Coyhaique',
            price: 1000,
            picture: 'https://radiogenial.cl/wp-content/uploads/2019/09/foto-centro-coyhaique--696x426.jpg',
            from: new Date('2020-11-01'),
            to: new Date('2020-11-11'),
            followers: 5,
        }, {
            id: 2,
            desc: 'Puerto Aysén',
            price: 1000,
            picture: 'https://s0.wklcdn.com/image_38/1145035/7179015/4066224Master.jpg',
            from: new Date('2020-11-01'),
            to: new Date('2020-11-11'),
        }, {
            id: 3,
            desc: 'Punta Arenas',
            price: 2000,
            picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
            from: new Date('2020-12-01'),
            to: new Date('2020-12-05'),
        }, {
            id: 4,
            desc: 'Punta Arenas',
            price: 2000,
            picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
            from: new Date('2020-12-01'),
            to: new Date('2020-12-05'),
        }, {
            id: 5,
            desc: 'Punta Arenas',
            price: 2000,
            picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
            from: new Date('2020-12-01'),
            to: new Date('2020-12-05'),
        }, {
            id: 6,
            desc: 'Punta Arenas',
            price: 2000,
            picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
            from: new Date('2020-12-01'),
            to: new Date('2020-12-05'),
        }, {
            id: 7,
            desc: 'Punta Arenas',
            price: 2000,
            picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
            from: new Date('2020-12-01'),
            to: new Date('2020-12-05'),
        }, {
            id: 8,
            desc: 'Punta Arenas',
            price: 2000,
            picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
            from: new Date('2020-12-01'),
            to: new Date('2020-12-05'),
        }, {
            id: 9,
            desc: 'Punta Arenas',
            price: 2000,
            picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
            from: new Date('2020-12-01'),
            to: new Date('2020-12-05'),
        }, {
            id: 10,
            desc: 'Punta Arenas',
            price: 2000,
            picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
            from: new Date('2020-12-01'),
            to: new Date('2020-12-05'),
        }, {
            id: 11,
            desc: 'Punta Arenas',
            price: 2000,
            picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
            from: new Date('2020-12-01'),
            to: new Date('2020-12-05'),
        }, {
            id: 12,
            desc: 'Punta Arenas',
            price: 2000,
            picture: 'https://creatividadnatural.com/wp-content/uploads/2018/09/MG_9778.jpg',
            from: new Date('2020-12-01'),
            to: new Date('2020-12-05'),
        }
    ];

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

