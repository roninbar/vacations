import { Badge, Card, CardActions, CardContent, CardMedia, GridListTileBar, IconButton, Typography, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ToggleButton } from '@material-ui/lab';
import { Html5Entities } from 'html-entities';
import React from 'react';

const entities = new Html5Entities();

function Vacation({ classes, desc, from, to, picture, price, followers, isFollowing, onChangeFollowing, userRole }) {
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={picture} title={desc} >
                {userRole === 'admin' &&
                    <GridListTileBar actionIcon={
                        <IconButton className={classes.icon}>
                            <EditIcon />
                        </IconButton>
                    }
                    />
                }
            </CardMedia>
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
                {userRole === 'user' &&
                    <Badge badgeContent={followers} color="primary">
                        <ToggleButton value="check" selected={Boolean(isFollowing)} onChange={() => onChangeFollowing(!isFollowing)} >
                            <Typography variant="button">
                                Follow
                        </Typography>
                        </ToggleButton>
                    </Badge>
                }
                {userRole === 'admin' &&
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                }
            </CardActions>
        </Card>
    );
}

const styles = {
    root: {
        maxWidth: 345,
    },
    media: {
        position: 'relative',
        height: 140,
        [`& .MuiGridListTileBar-root`]: {
            opacity: 0,
        },
        [`&:hover .MuiGridListTileBar-root`]: {
            opacity: 1,
        },
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
};

export default withStyles(styles)(Vacation);

