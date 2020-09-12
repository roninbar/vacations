import { Button, Card, CardActions, CardContent, Typography, withStyles } from '@material-ui/core';
import React from 'react';

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
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <div className={classes.container}>
            {vacations.map(({ id, desc, price, picture, from, to }) => (
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Word of the Day
                    </Typography>
                        <Typography variant="h5" component="h2">
                            be{bull}nev{bull}o{bull}lent
                    </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            adjective
                    </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
                    <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
}

const styles = {
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        backgroundColor: '#f5f5f5',
    },
};

export default withStyles(styles)(HomePage);