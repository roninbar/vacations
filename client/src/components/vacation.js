import { Badge, Card, CardActions, CardContent, CardMedia, GridListTileBar, IconButton, Typography, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ToggleButton } from '@material-ui/lab';
import { Html5Entities } from 'html-entities';
import React, { Component } from 'react';

const entities = new Html5Entities();

class Vacation extends Component {

    render() {
        const { classes, desc, from, to, picture, price, followers, isFollowing, onChangeFollowing, userRole, onDelete } = this.props;
        return (
            <Card className={classes.root}>
                <CardMedia className={classes.media} image={picture} title={desc} >
                    {userRole === 'admin' &&
                        <GridListTileBar actionIcon={
                            <IconButton className={classes.mediaIcon}>
                                <EditIcon />
                            </IconButton>
                        }
                        />
                    }
                </CardMedia>
                <CardContent>
                    <Typography variant="h5" gutterBottom className={classes.contentRow}>
                        {desc}
                        {userRole === 'admin' &&
                            <div className="overlay">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </div>
                        }
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.contentRow}>
                        {entities.decode(`${from.toDateString()}&ndash;${to.toDateString()}`)}
                        {userRole === 'admin' &&
                            <div className="overlay">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </div>
                        }
                    </Typography>
                    <Typography variant="h6" className={classes.contentRow}>
                        &euro;{price}
                        {userRole === 'admin' &&
                            <div className="overlay">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </div>
                        }
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions}>
                    {userRole === 'user' &&
                        <Badge badgeContent={followers} color="primary">
                            <ToggleButton value="check" selected={Boolean(isFollowing)} onChange={() => onChangeFollowing(!isFollowing)} >
                                <Typography variant="button">Follow</Typography>
                            </ToggleButton>
                        </Badge>
                    }
                    {userRole === 'admin' &&
                        <IconButton onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    }
                </CardActions>
            </Card>
        );
    }

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
    mediaIcon: {
        color: 'rgba(255, 255, 255, 1.0)',
    },
    contentRow: {
        position: 'relative',
        '& .overlay': {
            display: 'flex',
            flexDirection: 'row-reverse',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            opacity: 0,
        },
        '&:hover .overlay': {
            opacity: 1,
        },
    },
    actions: {
        flexDirection: ({ userRole }) => userRole === 'admin' ? 'row-reverse' : 'row',
    },
};

export default withStyles(styles)(Vacation);

