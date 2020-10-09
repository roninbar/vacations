import { Button, Dialog as MuiDialog, DialogActions, DialogContent, DialogTitle as MuiDialogTitle, IconButton, Typography, withStyles } from '@material-ui/core';
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

const Dialog = function ({ open, title, children, okButtonLabel, onOk, onCancel, classes }) {
    return (
        <MuiDialog open={open}>
            <DialogTitle onClose={onCancel}>
                {title}
            </DialogTitle>
            <DialogContent dividers className={classes.content}>
                {children}
            </DialogContent>
            <DialogActions>
                <Button variant="text" color="primary" autoFocus className={classes.okButton} onClick={onOk}>
                    {okButtonLabel}
                </Button>
            </DialogActions>
        </MuiDialog>
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

export default withStyles(styles)(Dialog);

