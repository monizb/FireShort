import { AppBar, Button, Toolbar, Typography, withStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        fontFamily: 'Pacifico, cursive',
        userSelect: 'none',
        color: 'white',
    },
    appbar: {
        backgroundColor: '#212121',
    },
});


function Header({ classes }) {

    const dispatch = useDispatch();

    const handleLogout = useCallback(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <AppBar position='fixed' className={classes.appbar}>
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                        FireShort
                    </Typography>
                    <Button color='inherit' onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(Header);