import { Badge, Card, CardActions, CardContent, CardMedia, Typography, withStyles } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import { Html5Entities } from 'html-entities';
import React from 'react';

const entities = new Html5Entities();

function Vacation({ classes, desc, from, to, picture, price, followers, isFollowing, onChangeFollowing }) {
    return (
        <Card className={classes.root}>
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
                <Typography variant="h6">
                    &euro;{price}
                </Typography>
            </CardContent>
            <CardActions>
                <Badge badgeContent={followers} color="primary">
                    <ToggleButton value="check" selected={Boolean(isFollowing)} onChange={() => onChangeFollowing(!isFollowing)} >
                        <Typography variant="button">
                            Follow
                        </Typography>
                    </ToggleButton>
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

