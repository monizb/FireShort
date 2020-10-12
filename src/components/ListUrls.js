<<<<<<< HEAD
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
=======
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
<<<<<<< HEAD
} from "@material-ui/core";
import {
  FileCopyOutlined as FileCopyOutlinedIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  DeleteForever as DeleteForeverIcon,
  ShareOutlined,
} from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";
import { OpenInBrowser } from "@material-ui/icons";
=======
  IconButton,
} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";
import {
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
  FileCopyOutlined as FileCopyOutlinedIcon,
  Visibility as VisibilityIcon,
} from "@material-ui/icons";
import { OpenInBrowser } from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import React from "react";
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  label: {
    textTransform: "initial",
  },
}));

export default function ListUrls(props) {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
<<<<<<< HEAD
    <Container className={classes.cardGrid} maxWidth='md'>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell
                  key='curl'
                  align='left'
                  style={{ minWidth: "100px" }}>
                  Short URL
                </TableCell>
                <TableCell
                  key='lurl'
                  align='left'
                  style={{ minWidth: "100px" }}>
                  Long URL
                </TableCell>
                <TableCell
                  key='action'
                  align='right'
                  style={{ minWidth: "100px" }}>
                  Action
=======
    <Container className={classes.cardGrid} maxWidth="lg">
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  key="curl"
                  align="left"
                  style={{
                    minWidth: "100px",
                  }}
                >
                  Short URL
                </TableCell>
                <TableCell
                  key="action"
                  align="center"
                  style={{
                    minWidth: "100px",
                  }}
                >
                  Action
                </TableCell>
                <TableCell
                  key="lurl"
                  align="left"
                  style={{ minWidth: "100px" }}
                >
                  Long URL
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.shortUrls
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((card) => {
                  return (
<<<<<<< HEAD
                    <TableRow hover role='checkbox' tabIndex={-1} key={card.id}>
                      <TableCell
                        key='curl'
                        align='left'
                        style={{ minWidth: "100px" }}>
                        <Button
                          startIcon={<FileCopyOutlinedIcon />}
                          onClick={() => {
                            navigator.clipboard.writeText(
                              window.location.origin + "/" + card.data.curl
                            );
                          }}
                          classes={{
                            label: classes.label,
                          }}>
                          {card.data.curl}
                        </Button>
                        <Tooltip title={card.data.hits + " Hits"}>
                          <Badge
                            badgeContent={card.data.hits}
                            color='secondary'
                            max={Infinity}
                            showZero>
                            <OpenInBrowser />
                          </Badge>
                        </Tooltip>
                      </TableCell>
                      <TableCell
                        key='lurl'
                        align='left'
                        style={{ minWidth: "100px" }}>
                        <Box
                          bgcolor='text.primary'
                          color='background.paper'
=======
                    <TableRow hover role="checkbox" tabIndex={-1} key={card.id}>
                      <TableCell
                        key="curl"
                        align="left"
                        style={{ minWidth: "100px" }}
                      >
                        <Tooltip title="Copy to clipboard">
                          <Button
                            startIcon={<FileCopyOutlinedIcon />}
                            onClick={() => {
                              navigator.clipboard.writeText(
                                window.location.origin + "/" + card.data.curl
                              );
                            }}
                            classes={{ label: classes.label }}
                          >
                            {card.data.curl}
                          </Button>
                        </Tooltip>
                        <Tooltip title={card.data.hits + " Hits"}>
                            <IconButton onClick={() => { props.openHits(card.data.curl) }} style={{ cursor: "pointer" }}>
                                <Badge
                                 badgeContent={card.data.hits}
                                 color="secondary"
                                 max={Infinity}
                                 showZero
                                >
                                    <OpenInBrowser />
                                </Badge>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell
                        key="action"
                        align="right"
                        style={{ minWidth: "100px" }}
                      >
                        <ButtonGroup variant="outlined" color="default">
                          <Tooltip title="Preview link">
                            <Button
                              size="small"
                              color="primary"
                              href={card.data.lurl}
                              target="_blank"
                            >
                              <VisibilityIcon />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Edit link">
                            <Button
                              size="small"
                              onClick={() =>
                                props.handleEditShortUrl(card.data.curl)
                              }
                            >
                              <EditIcon />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Delete link">
                            <Button
                              size="small"
                              color="secondary"
                              onClick={() =>
                                props.handleDeleteShortUrl(card.data.curl)
                              }
                            >
                              <DeleteForeverIcon />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Toggle link protection">
                            <Button
                              size="small"
                              color="default"
                              onClick={() => props.toggleSecurity(card.data.curl)}
                            >
                              {card.data.locked ? <LockIcon /> : <LockOpenIcon />}
                            </Button>
                          </Tooltip>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell
                        key="lurl"
                        align="left"
                        style={{ minWidth: "100px" }}
                      >
                        <Box
                          bgcolor="text.primary"
                          color="background.paper"
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
                          p={2}
                          style={{
                            overflowX: "auto",
                            overflowY: "hidden",
                            whiteSpace: "nowrap",
<<<<<<< HEAD
                          }}>
                          {card.data.lurl}
                        </Box>
                      </TableCell>
                      <TableCell
                        key='action'
                        align='right'
                        style={{ minWidth: "100px" }}>
                        <ButtonGroup variant='outlined' color='default'>
                          <Button
                            size='small'
                            color='primary'
                            href={window.location.origin + "/" + card.data.curl}
                            target='_blank'>
                            <VisibilityIcon />
                          </Button>
                          <Button
                            size='small'
                            onClick={() =>
                              props.handleEditShortUrl(card.data.curl)
                            }>
                            <EditIcon />
                          </Button>
                          <Button
                            onClick={() =>
                              props.handleShareOpen(card.data.curl)
                            }>
                            <ShareOutlined />
                          </Button>
                          <Button
                            size='small'
                            color='secondary'
                            onClick={() =>
                              props.handleDeleteShortUrl(card.data.curl)
                            }>
                            <DeleteForeverIcon />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
=======
                          }}
                        >
                          {card.data.lurl}
                        </Box>
                      </TableCell>

>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
<<<<<<< HEAD
          component='div'
=======
          component="div"
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
          count={props.shortUrls.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
