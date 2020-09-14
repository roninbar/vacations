import { Badge, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, withStyles } from '@material-ui/core';
import { Html5Entities } from 'html-entities';
import React from 'react';

const entities = new Html5Entities();

function Vacation({ classes, desc, from, to, picture, price, followers = 0 }) {
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={picture}
                    title={desc}
                />
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {desc}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {entities.decode(`${from.toDateString()}&ndash;${to.toDateString()}`)}
                    </Typography>
                    <Typography variant="subtitle2">&euro;{price}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Badge badgeContent={followers} color="primary">
                    <Button size="small" color="primary">
                        <Typography variant="button">
                            Follow
                        </Typography>
                    </Button>
                </Badge>
            </CardActions>
        </Card>
    );
}

const styles = {
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

export default withStyles(styles)(Vacation);