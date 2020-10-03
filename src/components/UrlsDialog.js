import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

function hasSpaces(s){
    var regexp = /\s/;  
    console.log(regexp.test(s))  
    return regexp.test(s);
}

export default function UrlsDialog(props) {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Dialog open={props.state.formopen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">FireShort URL</DialogTitle>
            <DialogContent>
                {props.state.lurl.length === 0 && props.state.curl.length === 0 &&
                    (
                        <DialogContentText>
                            Enter Long and Short URLs.
                        </DialogContentText>
                    )
                }
                {props.state.lurl.length === 0 && props.state.curl.length > 0 &&
                    (
                        <DialogContentText>
                            Enter Long URL.
                        </DialogContentText>
                    )
                }
                {props.state.lurl.length > 0 && props.state.curl.length === 0 &&
                    (
                        <DialogContentText>
                            Enter Short URL.
                        </DialogContentText>
                    )
                }
                {props.state.lurl.length > 0 && props.state.curl.length > 0 &&
                    (
                        <DialogContentText>
                            Looks good to go!
                        </DialogContentText>
                    )
                }
                <TextField
                    autoFocus
                    margin="dense"
                    id="longurl"
                    label="Long URL"
                    type="url"
                    fullWidth
                    value={props.state.lurl}
                    onChange={props.handleLurlChange}
                />
                <TextField
                    margin="dense"
                    id="customurl"
                    label="Custom URL"
                    type="text"
                    fullWidth
                    value={props.state.curl}
                    onChange={props.handleCurlChange}
                />
                <Grid component="label" container alignItems="center" spacing={1} style={{ marginTop: "15px", marginBottom: "15px" }}>
                    <Grid item><b>Track Link Activity:</b></Grid>
                    <Grid item>Off</Grid>
                    <Grid item>
                        <AntSwitch checked={props.state.track} onChange={props.handleTrackChange} name="checked" />
                    </Grid>
                    <Grid item>On</Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
              </Button>
                <Button onClick={() => {
                    if (isUrl(props.state.lurl) && !hasSpaces(props.state.curl)) {
                        props.handleSubmit()
                    } else {
                        handleClick()
                    }
                }} color="primary">
                    Shorten
              </Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" variant="filled">
                        {!isUrl(props.state.lurl) ? "Enter a valid URL to shorten" : "Enter a custom URL without spaces"}
                    </Alert>
                </Snackbar>                
            </DialogActions>
        </Dialog>
    );
}