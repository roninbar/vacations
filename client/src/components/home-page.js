import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, withStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import { Html5Entities } from 'html-entities';
import React from 'react';

const entities = new Html5Entities();

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
        <div className={classes.container}>
            {vacations.map(({ id, desc, price, picture, from, to }) => (
                <Card key={id} className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>R</Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={desc}
                        subheader={entities.decode(`${from.toDateString()}&ndash;${to.toDateString()}`)}
                    />
                    <CardMedia
                        className={classes.media}
                        image={picture}
                        title={desc}
                    />
                    <CardContent className={classes.content}>
                        <Button variant="contained" color="primary">Book</Button>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton>
                            <ShareIcon />
                        </IconButton>
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
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        padding: '24px',
        backgroundColor: '#f5f5f5',
    },
};

export default withStyles(styles)(HomePage);