import { Badge, Card, CardActions, CardContent, CardMedia, ClickAwayListener, IconButton, TextField, Typography, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ToggleButton } from '@material-ui/lab';
import { Html5Entities } from 'html-entities';
import React, { Component } from 'react';

const entities = new Html5Entities();

class Vacation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: 'nothing',
        };
    }

    onChange({ target: { name, value } }) {
        this.setState({ [name]: value });
    }

    onSubmitField() {
        this.setState({ editing: 'nothing' });
    }

    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.setState({ editing: 'nothing' });
        }
    }

    onClickAway() {
        this.setState({ editing: 'nothing' });
    }

    render() {
        const { destination, from, to, price, description, image, followers, isFollowing, onChangeFollowing, onDelete, userRole, classes } = this.props;
        const { editing } = this.state;
        return (
            <Card className={classes.root}>
                <CardMedia className={classes.media} image={image} title={destination}>
                    {userRole === 'admin' && editing === 'nothing' &&
                        <div className="overlay">
                            <IconButton className={classes.imageEditButton}>
                                <EditIcon />
                            </IconButton>
                        </div>
                    }
                </CardMedia>
                <CardContent>
                    {editing === 'destination'
                        ? (
                            <ClickAwayListener onClickAway={this.onClickAway.bind(this)}>
                                <form onSubmit={this.onSubmitField.bind(this)}>
                                    <TextField
                                        name="destination"
                                        value={this.state.destination || destination}
                                        onChange={this.onChange.bind(this)}
                                        onKeyUp={this.onKeyUp.bind(this)}
                                    />
                                </form>
                            </ClickAwayListener>)
                        : (
                            <Typography className={classes.contentRow} variant="h5" gutterBottom>
                                {destination}
                                {userRole === 'admin' && editing === 'nothing' &&
                                    <div className="overlay">
                                        <IconButton onClick={() => this.setState({ editing: 'destination' })}>
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                }
                            </Typography>)
                    }
                    <Typography className={classes.contentRow} variant="subtitle1" gutterBottom>
                        <strong>{entities.decode(`${from.toDateString()}&ndash;${to.toDateString()}`)}</strong>
                        {userRole === 'admin' && editing === 'nothing' &&
                            <div className="overlay">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </div>
                        }
                    </Typography>
                    <Typography className={classes.contentRow} variant="body1" gutterBottom component="div">
                        {description}
                        {userRole === 'admin' && editing === 'nothing' &&
                            <div className="overlay">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </div>
                        }
                    </Typography>
                    <Typography className={classes.contentRow} variant="h6">
                        <strong>&euro;{price}</strong>
                        {userRole === 'admin' && editing === 'nothing' &&
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
            </Card >
        );
    }

}

const styles = {
    root: {
    },
    media: {
        position: 'relative',
        height: 140,
        '& .overlay': {
            display: 'none',
            flexDirection: 'row-reverse',
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: 0,
            opacity: 0.5,
            backgroundColor: 'black',
        },
        '&:hover .overlay': {
            display: 'flex',
        },
    },
    imageEditButton: {
        color: 'rgba(255, 255, 255, 1.0)',
    },
    contentRow: {
        position: 'relative',
        '& .overlay': {
            display: 'none',
            flexDirection: 'row-reverse',
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: 0,
        },
        '&:hover .overlay': {
            display: 'flex',
        },
    },
    actions: {
        flexDirection: ({ userRole }) => userRole === 'admin' ? 'row-reverse' : 'row',
    },
};

export default withStyles(styles)(Vacation);

