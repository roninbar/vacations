import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logOutAsync } from 'features/userSlice';
import { loadVacationsAsync, setFollowingAsync, deleteOne } from 'features/vacationsSlice';
import Vacation from 'components/vacation';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idToDelete: 0,
        };
    }

    onChangeFollowing(vacationId, isFollowing) {
        this.props.setFollowingAsync(vacationId, isFollowing);
    }

    onDelete(vacationId) {
        this.setState({ idToDelete: vacationId });
    }

    onCancelDelete() {
        this.setState({ idToDelete: 0 });
    }

    onOkDelete() {
        const { idToDelete } = this.state;
        this.setState({ idToDelete: 0 });
        this.props.deleteOne({ id: idToDelete });
    }

    render() {
        const { classes, username, userRole, logOutAsync, vacations } = this.props;
        const { idToDelete } = this.state;
        let descToDelete = '', startToDelete = '', finishToDelete = '';
        if (idToDelete > 0) {
            (
                {
                    desc: descToDelete,
                    from: startToDelete,
                    to: finishToDelete,
                }
                = vacations.find(v => v.id === idToDelete)
            );
            startToDelete = startToDelete.toDateString();
            finishToDelete = finishToDelete.toDateString();
        }
        return (
            <div className={classes.root}>
                <Typography className={classes.logout}>
                    {username} (<Link to="/login" onClick={logOutAsync}>log out</Link>)
                </Typography>
                <Grid container spacing={4}>
                    {vacations.map(({ id, ...rest }) => (
                        <Grid item key={id} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Vacation
                                {...rest}
                                userRole={userRole}
                                onDelete={this.onDelete.bind(this, id)}
                                onChangeFollowing={this.onChangeFollowing.bind(this, id)}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Dialog open={idToDelete > 0} className={classes.deleteDialog}>
                    <DialogTitle>Delete {descToDelete}?</DialogTitle>
                    <DialogContent>
                        {startToDelete}&ndash;{finishToDelete}
                    </DialogContent>
                    <DialogActions>
                        {/* <Button variant="outlined" onClick={this.onCancelDelete.bind(this)} color="primary" autoFocus>Cancel</Button> */}
                        <Button variant="outlined" color="secondary" fullWidth onClick={this.onOkDelete.bind(this)} >Yes, delete {descToDelete}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    async componentDidMount() {
        this.props.loadVacationsAsync();
    }

}

const styles = {
    root: {
        padding: '2rem',
        backgroundColor: '#f5f5f5',
    },
    logout: {
        float: 'right',
    },
    deleteDialog: {
        '& .MuiDialogTitle-root': {
            textAlign: 'center',
        },
        '& .MuiDialogActions-root': {
            '& button': {
                color: '#cb2431',
                backgroundColor: '#fff',
                transitionProperty: 'all',
            },
            '& button:hover': {
                color: '#fff',
                backgroundColor: '#cb2431',
                transitionProperty: 'all',
            },
        },
    },
};

const mapStateToProps = ({
    user: {
        name: username,
        role: userRole,
    },
    vacations: {
        vacations,
    },
}) => ({
    username,
    userRole,
    vacations: vacations.map(({
        from,
        to,
        ...rest
    }) => ({
        from: new Date(from),
        to: new Date(to),
        ...rest,
    })),
});

const mapDispatchToProps = { logOutAsync, loadVacationsAsync, setFollowingAsync, deleteOne };

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(withRouter(withStyles(styles)(HomePage)));

