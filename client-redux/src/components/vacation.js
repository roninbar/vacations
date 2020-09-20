import { Badge, Card, CardActions, CardContent, CardMedia, Typography, withStyles } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import { Html5Entities } from 'html-entities';
import React from 'react';
import { connect } from 'react-redux';
import { setFollowingAsync } from '../actions/vacations';

const entities = new Html5Entities();

function Vacation({ classes, desc, from, to, picture, price, followers = 0, isFollowing = false, setFollowing }) {
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
                    <ToggleButton value="check" selected={isFollowing} onChange={() => setFollowing(!isFollowing)} >
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

const mapDispatchToProps = (dispatch, { id }) => ({
    setFollowing: (isFollowing) => dispatch(setFollowingAsync(id, isFollowing)),
});

const hydrate = ({ from, to, ...rest }) => ({ from: new Date(from), to: new Date(to), ...rest });

const mapStateToProps = ({ vacations: { vacations } }, { id }) => {
    return hydrate(vacations.find(({ id: vid }) => vid === id));
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(withStyles(styles)(Vacation));