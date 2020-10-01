import React from 'react';
import { Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Card, CardContent, CardHeader } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    copyButton: {
        justifyContent: "flex-end",
    },
    accordion: {
        backgroundColor: "#F6F7F9"
    }
}));

export default function UrlsDialog(props) {
    const classes = useStyles();
    return (
        <Dialog open={props.state.hitsopen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Link Activity</DialogTitle>
            <DialogContent>
                {props.hitActivity.map((activity) => (
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{activity.data.timestamp}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box bgcolor="text.primary" color="background.paper" p={2} width={1}>
                                <div>
                                    <p><b>IPV4:</b>{activity.data.ipv4}</p>
                                    <p><b>User-Agent:</b>{activity.data.useragent}</p>
                                </div>
                            </Box>

                        </AccordionDetails>
                    </Accordion>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
              </Button>
            </DialogActions>
        </Dialog>
    );
}