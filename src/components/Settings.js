import React, {Component} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {nanoid} from 'nanoid'
import {connect} from "react-redux";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {db, myFirebase} from '../firebase/firebase';
import "./components.module.css"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

import {
    AppBar,
    Button,
    CssBaseline,
    IconButton,
    LinearProgress,
    Snackbar,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';

import {withStyles} from "@material-ui/core/styles";
import MuiAlert from '@material-ui/lab/Alert';
import {FileCopyOutlined as FileCopyOutlinedIcon} from "@material-ui/icons";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontFamily: 'Pacifico, cursive',
        userSelect: "none",
        color: "white"
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        backgroundColor: "#212121",
        right: theme.spacing(2),
    },
    container: {
        margin: theme.spacing(10)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    appbar: {
        backgroundColor: "#212121"
    }
});

class Admin extends Component {
    constructor() {
        super()
        this.state = {
            user: null,
            loading: true,
            shortUrls: [],
            hits: [],
            formopen: false,
            hitsopen: false,
            lurl: "",
            curl: "",
            track: true,
            successToast: false,
            viewMode: "module",
            backdrop: false
        }
    }

    handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({successToast: false})
    };

    updateApiKeys = () => {
        this.setState({backdrop: true});
        const self = this;
        self.setState({loading: true});
        self.setState({shortUrls: []});

        let uid = myFirebase.auth().currentUser ? myFirebase.auth().currentUser.uid : '';

        let apiKeyRef = db.collection('apikeys').doc(uid);
        apiKeyRef.get()
            .then(doc => {
                if (doc.exists) {
                    let data = doc.data();
                    self.setState({loading: false});
                    this.setState({apikey: data.key});
                    this.setState({backdrop: false});
                } else {
                    let apiKey = nanoid(32);
                    apiKeyRef.set({key: apiKey, uid: uid})
                        .then(() => {
                            self.setState({loading: false});
                            this.setState({apikey: apiKey});
                            this.setState({backdrop: false});
                        }).catch(err => {
                        console.log('Error creating api keys', err);
                        self.setState({loading: false});
                    })

                }
            })
            .catch(err => {
                console.log('Error getting apikeys', err);
                self.setState({loading: false});
            })
    }

    componentDidMount() {
        const self = this;
        myFirebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                self.setState({user});
                self.updateApiKeys();
                var viewModeRef = db.collection('settings').doc("viewMode");
                viewModeRef.get()
                    .then(doc => {
                        if (!doc.exists) {
                            console.log('No viewMode set!');
                        } else {
                            var data = doc.data();
                            self.setState({viewMode: data.value})
                        }
                    })
                    .catch(err => {
                        console.log('Error getting viewMode', err);
                    });
            } else {
                self.setState({user: null});
            }
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <div className={classes.root}>
                    <AppBar position="fixed" className={classes.appbar}>
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                FireShort
                            </Typography>
                            <Button color="inherit" onClick={() => {
                                window.location.href = `${window.location.origin}/admin`
                            }}>Back to dashboard</Button>
                        </Toolbar>
                    </AppBar>
                </div>
                {this.state.loading &&
                (
                    <LinearProgress color="secondary"/>
                )
                }
                <main className={classes.container}>
                    <Typography>API Key <IconButton color="primary" className={classes.copyButton} onClick={() => {
                        this.setState({toastMsg: 'API Key copied'})
                        this.setState({successToast: true})
                        navigator.clipboard.writeText(this.state.apikey)
                    }}>
                        <FileCopyOutlinedIcon/>
                    </IconButton></Typography>

                    <TextField
                        disabled
                        value={this.state.apikey}
                        variant="filled"
                        fullWidth
                    />
                    <SwaggerUI url="/swagger.json"/>\

                    <Backdrop className={classes.backdrop} open={this.state.backdrop}>
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                    <Snackbar open={this.state.successToast} autoHideDuration={6000} onClose={this.handleToastClose}>
                        <Alert onClose={this.handleToastClose} severity="success">{this.state.toastMsg}</Alert>
                    </Snackbar>
                </main>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut
    };
}

export default withStyles(styles)(connect(mapStateToProps)(Admin));
