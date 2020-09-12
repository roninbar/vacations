import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, withStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import { Subscriptions } from '@material-ui/icons';
import { Html5Entities } from 'html-entities';
import React from 'react';
import { red } from '@material-ui/core/colors';

const entities = new Html5Entities();

function Vacation({ classes, desc, from, to, picture, price }) {
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>{desc.charAt(0).toUpperCase()}</Avatar>
                }
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={desc}
                subheader={entities.decode(`${from.toDateString()}&ndash;${to.toDateString()}`)} />
            <CardMedia
                className={classes.media}
                image={picture}
                title={desc} />
            <CardContent className={classes.content}>
                <Typography>
                    &euro;{price}
                </Typography>
                <Button variant="contained" color="primary">Book</Button>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                    <FavoriteIcon />
                </IconButton>
                <IconButton>
                    <ShareIcon />
                </IconButton>
                <IconButton>
                    <Subscriptions />
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
    avatar: {
        backgroundColor: red[500],
    },
};

export default withStyles(styles)(Vacation);