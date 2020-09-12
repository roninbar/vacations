import { withStyles } from '@material-ui/core';
import React from 'react';
import Vacation from './vacation';

function HomePage({ classes }) {
    const vacations = [
        {
            id: 1,
            desc: 'Coyhaique',
            price: 1000,
            picture: 'https://radiogenial.cl/wp-content/uploads/2019/09/foto-centro-coyhaique--696x426.jpg',
            from: new Date('2020-11-01'),
            to: new Date('2020-11-11'),
        }
    ];
    return (
        <div className={classes.root}>
            {vacations.map(({ id, ...rest }) => (
                <Vacation key={id} {...rest} />
            ))}
        </div>
    );
}

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        padding: '24px',
        backgroundColor: '#f5f5f5',
    },
};

export default withStyles(styles)(HomePage);

