import { Backdrop, Button, Grid, LinearProgress, Snackbar, Typography, withStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Vacation from 'components/vacation';
import { logOutAsync } from 'features/userSlice';
import { deleteAsync, loadAllAsync, setFollowing, changeAsync } from 'features/vacationsSlice';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import DeleteDialog from './delete-dialog';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idToDelete: 0,
        };
    }

    onChangeFollowing(vacationId, isFollowing) {
        const payload = { id: vacationId, isFollowing };
        const { setFollowing, changeAsync } = this.props;
        setFollowing(payload); // Give the user immediate feedback for the button press.
        changeAsync(payload); // Dispatch an async action that updates the database.
    }

    onChangeField(vacationId, name, value) {
        const { changeAsync } = this.props;
        changeAsync({ id: vacationId, [name]: value });
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
        let destinationToDelete = '', startToDelete = '', finishToDelete = '';
        if (idToDelete > 0) {
            (
                {
                    destination: destinationToDelete,
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
                        <Grid item key={id} xs={12} sm={6} md={4} xl={3}>
                            <Vacation
                                {...rest}
                                userRole={userRole}
                                onDelete={this.onDelete.bind(this, id)}
                                onChangeFollowing={this.onChangeFollowing.bind(this, id)}
                                onChangeField={this.onChangeField.bind(this, id)}
                            />
                        </Grid>
                    ))}
                </Grid>
                <DeleteDialog
                    classes={classes}
                    destination={destinationToDelete}
                    start={startToDelete}
                    finish={finishToDelete}
                    open={idToDelete > 0}
                    onOk={this.onOkDelete.bind(this)}
                    onCancel={this.onCancelDelete.bind(this)}
                />
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

const mapDispatchToProps = { logOutAsync, loadAllAsync, setFollowing, changeAsync, deleteAsync };

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(withRouter(withStyles(styles)(HomePage)));

