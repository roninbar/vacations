import { Badge, Card, CardActions, CardContent, CardMedia, ClickAwayListener, IconButton, TextField as MuiTextField, Typography, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ToggleButton } from '@material-ui/lab';
import { Html5Entities } from 'html-entities';
import React, { Component } from 'react';

const entities = new Html5Entities();

function TextField({ onSubmit, onClickAway, ...rest }) {
    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <form onSubmit={onSubmit}>
                <MuiTextField {...rest} />
            </form>
        </ClickAwayListener>
    );
}

class Vacation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: 'nothing',
        };
    }

    onClickEditButton(what) {
        this.setState({ editing: what });
    }

    onChange({ target: { name, value } }) {
        this.setState({ [name]: value });
    }

    onSubmitField(e) {
        e.preventDefault();
        const { onChangeField } = this.props;
        const { editing: name, [name]: value } = this.state;
        onChangeField(name, value);
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
        const { destination, from, to, price, description, image, followers, isFollowing, onChangeFollowing, onChangeField, onDelete, userRole, classes } = this.props;
        const { editing } = this.state;

        function onBlur(name, { target: { innerText: value } }) {
            return onChangeField(name, value);
        }

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
                            <TextField
                                autoFocus
                                name="destination"
                                value={this.state.destination || destination}
                                onChange={this.onChange.bind(this)}
                                onSubmit={this.onSubmitField.bind(this)}
                                onClickAway={this.onClickAway.bind(this)}
                                onKeyUp={this.onKeyUp.bind(this)}
                            />)
                        : (
                            <Typography className={classes.contentRow} variant="h5" gutterBottom>
                                {destination}
                                {userRole === 'admin' && editing === 'nothing' &&
                                    <div className="overlay">
                                        <IconButton onClick={this.onClickEditButton.bind(this, 'destination')}>
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                }
                            </Typography>)
                    }
                    <Typography className={classes.contentRow} variant="subtitle1" gutterBottom>
                        <strong contentEditable={userRole === 'admin'} onBlur={onBlur.bind(null, 'dates')}>
                            {entities.decode(`${from.toDateString()}&ndash;${to.toDateString()}`)}
                        </strong>
                    </Typography>
                    <Typography className={classes.contentRow} variant="body1" gutterBottom component="div" contentEditable={userRole === 'admin'} onBlur={onBlur.bind(null, 'description')}>
                        {description}
                    </Typography>
                    <Typography className={classes.contentRow} variant="h6">
                        <strong>
                            &euro;<span contentEditable={userRole === 'admin'} onBlur={onBlur.bind(null, 'price')}>{price}</span>
                        </strong>
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

