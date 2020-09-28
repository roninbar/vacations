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
        let descToDelete = '';
        if (idToDelete > 0) {
            ({ desc: descToDelete } = vacations.find(v => v.id === idToDelete));
        }
        return (
            <div className={classes.root}>
                <Typography className={classes.logout}>
                    {username} (<Link to="/login" onClick={logOutAsync}>log out</Link>)
                </Typography>
                <Grid container spacing={4}>
                    {vacations.map(({ id, from, to, ...rest }) => (
                        <Grid item key={id} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Vacation
                                from={new Date(from)}
                                to={new Date(to)}
                                {...rest}
                                userRole={userRole}
                                onDelete={this.onDelete.bind(this, id)}
                                onChangeFollowing={this.onChangeFollowing.bind(this, id)}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Dialog open={idToDelete > 0}>
                    <DialogTitle>Delete {descToDelete}?</DialogTitle>
                    <DialogContent>This space for rent.</DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.onCancelDelete.bind(this)} color="primary">Cancel</Button>
                        <Button onClick={this.onOkDelete.bind(this)} color="primary">OK</Button>
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
};

const mapStateToProps = ({ user: { name: username, role: userRole }, vacations: { vacations } }) => ({ username, userRole, vacations });

const mapDispatchToProps = { logOutAsync, loadVacationsAsync, setFollowingAsync, deleteOne };

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(withRouter(withStyles(styles)(HomePage)));

