import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  Paper,
  makeStyles,
  Link,
} from "@material-ui/core";
import { Button, IconButton, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import QRCode from "qrcode.react";
import {
  AiFillTwitterCircle as TwitterIcon,
  AiFillFacebook as FacebookIcon,
  AiOutlineQrcode as QrcodeIcon,
  AiOutlineFileJpg as JPGIcon,
  AiTwotoneMail as MailIcon,
  AiOutlineCopy as CopyIcon,
} from "react-icons/ai";
import Logo from "../logo.png";

function ShareDialog(props) {
  const {
    url,
    surl,
    open,
    snackOpen,
    handleJPG,
    handleCopy,
    handleMail,
    handleClose,
    handleQRCode,
    handleTwitter,
    handleFacebook,
    handleSnackClose,
  } = props;

  const classes = style();

  return (
    <Box>
      <Dialog maxWidth='xs' onClose={handleClose} open={open}>
        <Box display='flex' alignItems='center' justifyContent='space-around'>
          <Box flex={1}>
            <IconButton onClick={handleCopy}>
              <CopyIcon />
            </IconButton>
          </Box>
          <DialogTitle style={{ padding: 0, flex: 1 }}>{surl}</DialogTitle>
          <Box flex={1} />
        </Box>
        <DialogContent>
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='center'
            flexDirection='row'>
            <ShareButton
              label='QR Code'
              click={handleQRCode}
              icon={<QrcodeIcon />}
            />
            <ShareButton label='Image' click={handleJPG} icon={<JPGIcon />} />
            <ShareButton
              label='Tweet'
              click={handleTwitter}
              icon={<TwitterIcon />}
            />
            <ShareButton
              label='Mail'
              click={handleMail}
              icon={<MailIcon />}
              // href={`mailto:${surl}`}
            />
            <ShareButton
              label='Facebook'
              click={handleFacebook}
              icon={<FacebookIcon />}
            />
          </Box>
          <Box display='flex' justifyContent='center'>
            {url && (
              <Paper className={classes.QrContainer} elevation={4}>
                <QRCode
                  id='QR'
                  imageSettings={{ src: Logo, height: 30, width: 30 }}
                  value={url}
                  level='H'
                />
                <Typography variant='subtitle1'>scan</Typography>
              </Paper>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackOpen}
        autoHideDuration={1000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Alert onClose={handleSnackClose} severity='success'>
          Link copied
        </Alert>
      </Snackbar>
    </Box>
  );
}

function ShareButton({ click, color, label, icon, href }) {
  return (
    <Box margin={1} display='flex' alignContent='center' flexDirection='column'>
      <IconButton onClick={click} color={color}>
        {icon}
      </IconButton>
      <Typography align='center'>{label}</Typography>
    </Box>
  );
}

export function ShareAsJPG({ handleClose, open }) {
  return (
    <Dialog maxWidth='xs' onClose={handleClose} open={open}>
      <DialogTitle>Share as JPG</DialogTitle>
      <DialogContent>
        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='center'
          flexDirection='row'>
          <ShareButton icon={<TwitterIcon />} />
          <ShareButton icon={<MailIcon />} />
          <ShareButton icon={<FacebookIcon />} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const style = makeStyles(() => ({
  QrContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    width: 150,
    height: 170,
    borderRadius: 8,
  },
}));

export default ShareDialog;
