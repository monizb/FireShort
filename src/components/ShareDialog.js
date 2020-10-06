import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
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

function ShareDialog({
  handleClose,
  open,
  handleCopy,
  handleJPG,
  handleQRCode,
  handleMail,
  handleFacebook,
  handleTwitter,
  url,
}) {
  const classes = style();

  return (
    <Dialog maxWidth='xs' onClose={handleClose} open={open}>
      <DialogTitle>Share</DialogTitle>
      <DialogContent>
        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='center'
          flexDirection='row'>
          <ShareButton click={handleCopy} icon={<CopyIcon />} />
          <ShareButton click={handleQRCode} icon={<QrcodeIcon />} />
          <ShareButton click={handleJPG} icon={<JPGIcon />} />
          <ShareButton click={handleTwitter} icon={<TwitterIcon />} />
          <ShareButton click={handleMail} icon={<MailIcon />} />
          <ShareButton click={handleFacebook} icon={<FacebookIcon />} />
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
  );
}

function ShareButton({ icon, label, click, color }) {
  return (
    <Box padding={1}>
      <IconButton onClick={click} color={color}>
        {icon}
      </IconButton>
    </Box>
  );
}

export function ShareAsJPG({ url, imgurl, handleClose, open }) {
  const onTwitterShare = () => {
    console.log(imgurl);
  };

  return (
    <Dialog maxWidth='xs' onClose={handleClose} open={open}>
      <DialogTitle>Share as JPG</DialogTitle>
      <DialogContent>
        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='center'
          flexDirection='row'>
          <ShareButton click={onTwitterShare} icon={<TwitterIcon />} />
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
