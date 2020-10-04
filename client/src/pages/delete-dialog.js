import { Button, Dialog, DialogActions, DialogContent, DialogTitle as MuiDialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

const titleStyles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(titleStyles)(
    function ({ children, classes, onClose, ...other }) {
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose && (
                    <IconButton className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                )}
            </MuiDialogTitle>
        );
    }
);

const DeleteDialog = function ({ classes, destination, start, finish, open, onOk, onCancel }) {
    return (
        <Dialog open={open}>
            <DialogTitle onClose={onCancel}>
                Delete this vacation?
            </DialogTitle>
            <DialogContent dividers className={classes.content}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" align="center" colSpan={2}>{destination}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">Start:</TableCell>
                                <TableCell align="right">{start}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Finish:</TableCell>
                                <TableCell align="right">{finish}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button variant="text" color="primary" autoFocus className={classes.okButton} onClick={onOk}>
                    Yes, delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    content: {
        backgroundColor: '#f5f5f5',
    },
    okButton: {
        color: '#cb2431',
        backgroundColor: '#fff',
        transitionProperty: 'all',
        '&:hover': {
            color: '#fff',
            backgroundColor: '#cb2431',
        },
    },
});

export default withStyles(styles)(DeleteDialog);

