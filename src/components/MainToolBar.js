import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Card, Container, TextField } from '@material-ui/core';
import { ViewModule as ViewModuleIcon, ViewList as ViewListIcon, Loop } from '@material-ui/icons';

import { setTextFilter } from '../actions';

const useStyles = makeStyles((theme) => ({
    toolBarRoot: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(10),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function MainToolBar(props) {
    const classes = useStyles();
    
    const filter = useSelector((state) => state.filter)
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        dispatch(setTextFilter(value));
    }

    return (
        <Container maxWidth="md">
            <Card className={classes.toolBarRoot} style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}>
                <TextField variant="outlined" color="default" value={filter.text} placeholder="Search links" onChange={(e) => changeHandler(e.target.value)} style={{ boxShadow: "unset !important", justifyContent: "flex-start", display: "flex" }} />
                <ButtonGroup variant="outlined" color="default" style={{ boxShadow: "unset !important", justifyContent: "flex-end", display: "flex" }}>
                    <Button onClick={props.refresh}>
                        <Loop />
                    </Button>
                    <Button onClick={() => props.updateViewMode("module")} disabled={props.state.viewMode === "module"}>
                        <ViewModuleIcon />
                    </Button>
                    <Button onClick={() => props.updateViewMode("list")} disabled={props.state.viewMode === "list"}>
                        <ViewListIcon />
                    </Button>
                </ButtonGroup>
            </Card>
        </Container>
    );
}
