import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import {
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
  FileCopyOutlined as FileCopyOutlinedIcon,
  Visibility as VisibilityIcon,
  Assessment as AnalyticsIcon, OpenInBrowser,
  ShareOutlined
} from '@material-ui/icons';
import { useHistory } from 'react-router';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

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
  const history = useHistory();

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
    <Container className={classes.cardGrid} maxWidth='lg'>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell
                  key='curl'
                  align='left'
                  style={{
                    minWidth: "100px",
                  }}>
                  Short URL
                </TableCell>
                <TableCell
                  key='action'
                  align='center'
                  style={{
                    minWidth: "100px",
                  }}>
                  Action
                </TableCell>
                <TableCell
                  key='lurl'
                  align='left'
                  style={{ minWidth: "100px" }}>
                  Long URL
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.shortUrls
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((card) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={card.id}>
                      <TableCell
                        key='curl'
                        align='left'
                        style={{ minWidth: "100px" }}>
                        <Tooltip title='Copy to clipboard'>
                          <Button
                            startIcon={<FileCopyOutlinedIcon />}
                            onClick={() => {
                              navigator.clipboard.writeText(
                                window.location.origin + "/" + card.data.curl
                              );
                            }}
                            classes={{ label: classes.label }}>
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
                        key='action'
                        align='right'
                        style={{ minWidth: "100px" }}>
                        <ButtonGroup variant='outlined' color='default'>
                          <Tooltip title='Preview link'>
                            <Button
                              size='small'
                              color='primary'
                              href={card.data.lurl}
                              target='_blank'>
                              <VisibilityIcon />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Analytics">
                            <Button
                              size='small'
                              disabled={!card.data.track}
                              onClick={() => history.push(`/analytics/${card.data.curl}`)}
                            >
                              <AnalyticsIcon />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Edit link">
                            <Button
                              size='small'
                              onClick={() =>
                                props.handleEditShortUrl(card.data.curl)
                              }>
                              <EditIcon />
                            </Button>
                          </Tooltip>
                          <Tooltip title='Delete link'>
                            <Button
                              size='small'
                              color='secondary'
                              onClick={() =>
                                props.handleDeleteShortUrl(card.data.curl)
                              }>
                              <DeleteForeverIcon />
                            </Button>
                          </Tooltip>
                          <Tooltip title='Share'>
                            <Button
                              onClick={() =>
                                props.handleShareOpen(card.data.curl)
                              }>
                              <ShareOutlined />
                            </Button>
                          </Tooltip>
                          <Tooltip title='Toggle link protection'>
                            <Button
                              size='small'
                              color='default'
                              onClick={() =>
                                props.toggleSecurity(card.data.curl)
                              }>
                              {card.data.locked ? (
                                <LockIcon />
                              ) : (
                                <LockOpenIcon />
                              )}
                            </Button>
                          </Tooltip>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell
                        key='lurl'
                        align='left'
                        style={{ minWidth: "100px" }}>
                        <Box
                          bgcolor='text.primary'
                          color='background.paper'
                          p={2}
                          style={{
                            overflowX: "auto",
                            overflowY: "hidden",
                            whiteSpace: "nowrap",
                          }}>
                          {card.data.lurl}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
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
