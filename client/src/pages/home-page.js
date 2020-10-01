import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, Snackbar, Typography, withStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Vacation from 'components/vacation';
import { logOutAsync } from 'features/userSlice';
import { deleteAsync, loadAllAsync, setFollowing, setFollowingAsync } from 'features/vacationsSlice';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idToDelete: 0,
        };
    }

    onChangeFollowing(vacationId, isFollowing) {
        const payload = { id: vacationId, isFollowing };
        const { setFollowing, setFollowingAsync } = this.props;
        setFollowing(payload); // Give the user immediate feedback for the button press.
        setFollowingAsync(payload); // Dispatch an async action that updates the database.
    }

    onDelete(vacationId) {
        this.setState({ idToDelete: vacationId });
    }

    onCancelDelete() {
        this.setState({ idToDelete: 0 });
    }

    onOkDelete() {
        const { deleteAsync } = this.props;
        const { idToDelete } = this.state;
        this.setState({ idToDelete: 0 });
        deleteAsync(idToDelete);
    }

    render() {
        const { classes, username, userRole, logOutAsync, vacations, loading, error } = this.props;
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
                <Backdrop open={loading} className={classes.loadingBackdrop}>
                    <LinearProgress className={classes.progress} />
                </Backdrop>
                <Backdrop open={vacations.length === 0} className={classes.emptyBackdrop}>
                    <Typography variant="h3" component="h3">There are no vacations in the system.</Typography>
                    {userRole === 'admin' ?
                        <Button variant="outlined">Click here to add some.</Button> :
                        <Typography variant="h5">Please try again later.</Typography>
                    }
                </Backdrop>
                <Snackbar open={error}>
                    <Alert variant="filled" severity="error" elevation={6}>{error.message}</Alert>
                </Snackbar>
            </div>
        );
    }

    async componentDidMount() {
        const { loadAllAsync } = this.props;
        loadAllAsync();
    }

}

const styles = theme => ({
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
    loadingBackdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    progress: {
        width: '90%',
    },
    emptyBackdrop: {
        flexDirection: 'column',
    },
});

const mapStateToProps = ({
    user: {
        name: username,
        role: userRole,
    },
    vacations: {
        error,
        loading,
        vacations,
    },
}) => ({
    username,
    userRole,
    error,
    loading,
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

const mapDispatchToProps = { logOutAsync, loadAllAsync, setFollowing, setFollowingAsync, deleteAsync };

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(withRouter(withStyles(styles)(HomePage)));

