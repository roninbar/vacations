import { Badge, Box, Card, CardActions, CardContent, CardMedia, ClickAwayListener, IconButton, TextField as MuiTextField, Typography, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ToggleButton } from '@material-ui/lab';
import { Html5Entities } from 'html-entities';
import React, { PureComponent } from 'react';

const entities = new Html5Entities();

const TextField = withStyles({
    form: {
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'row nowrap',
    },
})(
    function ({ classes, onSubmit, onClickAway, ...rest }) {
        return (
            <ClickAwayListener onClickAway={onClickAway}>
                <form className={classes.form} onSubmit={onSubmit}>
                    <MuiTextField fullWidth={true} {...rest} />
                </form>
            </ClickAwayListener>
        );
    }
)

class Vacation extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            editing: 'nothing',
        };
    }

    fireChangeField() {
        const { onChangeField } = this.props;
        const { editing: name, [name]: value } = this.state;
        if (value) {
            onChangeField(name, value);
        }
        this.setState({
            [name]: undefined,
            editing: 'nothing',
        });
    }

    onClickEditButton(what) {
        this.setState({ editing: what });
    }

    onChange({ target: { name, value } }) {
        this.setState({ [name]: value });
    }

    onSubmitField(e) {
        e.preventDefault();
        this.fireChangeField();
    }

    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.setState({ editing: 'nothing' });
        }
    }

    onClickAway() {
        this.fireChangeField();
    }

    render() {
        const { destination, from, to, price, description, image, followers, isFollowing, onChangeFollowing, onChangeField, onDelete, userRole, classes } = this.props;
        const { editing } = this.state;

        function onBlur(name, { target: { innerText: value } }) {
            return onChangeField(name, value);
        }

        return (
            <Card className={classes.root}>
                <CardMedia className={classes.media + (editing === 'image' ? ' editing' : '')} image={image} title={destination}>
                    {userRole === 'admin' &&
                        <div className="overlay">
                            {editing === 'image'
                                ? (
                                    <TextField
                                        variant="outlined"
                                        autoFocus
                                        type="text"
                                        name="image"
                                        value={typeof this?.state?.image === 'string' ? this?.state?.image : image}
                                        onChange={this.onChange.bind(this)}
                                        onSubmit={this.onSubmitField.bind(this)}
                                        onClickAway={this.onClickAway.bind(this)}
                                        onKeyUp={this.onKeyUp.bind(this)}
                                        inputProps={{
                                            pattern: '^(?:([A-Za-z]+):)?(\\/{0,3})([0-9.\\-A-Za-z]+)(?::(\\d+))?(?:\\/([^?#]*))?(?:\\?([^#]*))?(?:#(.*))?$',
                                        }}
                                        className={classes.imageEditTextField}
                                    />)
                                : (
                                    <IconButton className={classes.imageEditButton} onClick={this.onClickEditButton.bind(this, 'image')}>
                                        <EditIcon />
                                    </IconButton>)
                            }
                        </div>
                    }
                </CardMedia>
                <CardContent>
                    {editing === 'destination'
                        ? (
                            <TextField
                                variant="outlined"
                                autoFocus
                                name="destination"
                                value={typeof this?.state?.destination === 'string' ? this?.state?.destination : destination}
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
                        <Box fontWeight="fontWeightBold"
                            contentEditable={userRole === 'admin'}
                            suppressContentEditableWarning={true}
                            onBlur={onBlur.bind(null, 'dates')}
                        >
                            {entities.decode(`${from.toDateString()}&ndash;${to.toDateString()}`)}
                        </Box>
                    </Typography>
                    <Typography
                        className={classes.contentRow}
                        variant="body1"
                        gutterBottom component="div"
                        contentEditable={userRole === 'admin'}
                        suppressContentEditableWarning={true}
                        onBlur={onBlur.bind(null, 'description')}
                    >
                        {description}
                    </Typography>
                    <Typography className={classes.contentRow} variant="h6">
                        <Box fontWeight="fontWeightBold">
                            &euro;
                            <span
                                contentEditable={userRole === 'admin'}
                                suppressContentEditableWarning={true}
                                onBlur={onBlur.bind(null, 'price')}
                            >
                                {price}
                            </span>
                        </Box>
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
            display: 'flex',
            flexFlow: 'row-reverse nowrap',
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: 0,
            opacity: 0,
            backgroundColor: 'black',
        },
        '&:hover .overlay': {
            opacity: 0.5,
        },
        '&.editing .overlay': {
            opacity: 1,
        },
    },
    imageEditTextField: {
        backgroundColor: 'white',
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

