import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, withStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import { Html5Entities } from 'html-entities';
import React from 'react';

const entities = new Html5Entities();

function Vacation({ classes, desc, from, to, picture }) {
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={<Avatar aria-label="recipe" className={classes.avatar}>R</Avatar>}
                action={<IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>}
                title={desc}
                subheader={entities.decode(`${from.toDateString()}&ndash;${to.toDateString()}`)} />
            <CardMedia
                className={classes.media}
                image={picture}
                title={desc} />
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
};

export default withStyles(styles)(Vacation);