import MomentUtils from '@date-io/moment';
import { Backdrop, Button, Container, Fab, Grid, LinearProgress, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Vacation from 'components/vacation';
import { logOutAsync } from 'features/userSlice';
import { addVacation, changeAsync, deleteAsync, loadAllAsync, setFollowing } from 'features/vacationsSlice';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Dialog from '../components/dialog';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            add: false,
            idToDelete: 0,
            newVacation: {},
        };
    }

    onChangeFollowing(vacationId, isFollowing) {
        const payload = { id: vacationId, isFollowing };
        const { setFollowing, changeAsync } = this.props;
        setFollowing(payload); // Give the user immediate feedback for the button press.
        changeAsync(payload); // Dispatch an async action that updates the database.
    }

    onChangeFields(vacationId, fields) {
        const { changeAsync } = this.props;
        changeAsync({ id: vacationId, ...fields });
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
        const { classes, userRole, vacations, loading, error, addVacation } = this.props;
        const { add, newVacation, idToDelete } = this.state;
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
            <Container maxWidth="xl" className={classes.root}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    {/* <Typography className={classes.logout}>
                        {username} (<Link to="/login" onClick={logOutAsync}>log out</Link>)
                    </Typography> */}
                    <Grid container spacing={4}>
                        {vacations.map(({ id, ...rest }) => (
                            <Grid item key={id} xs={12} sm={6} md={4} xl={3}>
                                <Vacation
                                    id={id}
                                    {...rest}
                                    userRole={userRole}
                                    onDelete={this.onDelete.bind(this, id)}
                                    onChangeFields={this.onChangeFields.bind(this, id)}
                                    onChangeFollowing={this.onChangeFollowing.bind(this, id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    {userRole === 'admin' && (
                        <Fab color="primary" onClick={() => this.setState({ add: true })} className={classes.fab}>
                            <AddIcon />
                        </Fab>)
                    }
                    <Dialog
                        open={add}
                        title="New Vacation"
                        okButtonLabel="Create"
                        onOk={() => {
                            addVacation(newVacation);
                            return this.setState({ add: false });
                        }}
                        onCancel={() => this.setState({ add: false })}
                    >
                        <Vacation
                            {...newVacation}
                            onChangeFields={fields => {
                                return this.setState({
                                    newVacation: {
                                        ...newVacation,
                                        ...fields,
                                    },
                                });
                            }}
                        />
                    </Dialog>
                    <Dialog
                        open={idToDelete > 0}
                        title="Delete this vacation?"
                        okButtonLabel="Yes, delete"
                        onOk={this.onOkDelete.bind(this)}
                        onCancel={this.onCancelDelete.bind(this)}
                    >
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell component="th" align="center" colSpan={2}>{destinationToDelete}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Start:</TableCell>
                                        <TableCell align="right">{startToDelete}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Finish:</TableCell>
                                        <TableCell align="right">{finishToDelete}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
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
                    <Snackbar open={typeof error?.message === 'string'}>
                        <Alert variant="filled" severity="error" elevation={6}>{error?.message}</Alert>
                    </Snackbar>
                </MuiPickersUtilsProvider>
            </Container>
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
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
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

const mapDispatchToProps = { addVacation, setFollowing, loadAllAsync, changeAsync, deleteAsync, logOutAsync };

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(withRouter(withStyles(styles)(HomePage)));

