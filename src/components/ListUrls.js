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
  Tooltip
} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import {makeStyles} from '@material-ui/core/styles';
import {
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
  FileCopyOutlined as FileCopyOutlinedIcon,
  Visibility as VisibilityIcon
} from '@material-ui/icons';
import {OpenInBrowser} from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
                               cardGrid : {
                                 paddingTop : theme.spacing(8),
                                 paddingBottom : theme.spacing(8),
                               },
                               root : {
                                 width : '100%',
                               },
                               container : {
                                 maxHeight : 440,
                               },
                               label : {
                                 textTransform : 'initial',
                               },
                             }));

export default function ListUrls(props) {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => { setPage(newPage); };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell key="curl" align="left" style={{
    minWidth: "100px" }}>
                                    Short URL
                                </TableCell>
                                <TableCell key="action" align="center" style={{ minWidth: "100px" }}>
                                    Action
                                </TableCell>
                                <TableCell key="lurl" align="left" style={{
    minWidth: "100px" }}>
                                    Long URL
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.shortUrls.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((card) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={card.id}>
                                        <TableCell key="curl" align="left" style={{ minWidth: "100px" }}>
                                            <Button
                                                startIcon={
                                                    <FileCopyOutlinedIcon />
}
                                                onClick={() => {
  navigator.clipboard.writeText(window.location.origin + "/" + card.data.curl) }}
                                                classes={{
  label: classes.label
                                                }}
                                            >{card.data.curl}</Button>
                                            <Tooltip title={card.data.hits + " Hits"}>
                                                <Badge badgeContent={card.data.hits} color="secondary" max={Infinity} showZero>
                                                    <OpenInBrowser />
                                                </Badge>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell key="action" align="left" style={{ minWidth: "100px" }}>
                                            <ButtonGroup variant="outlined" color="default">
                                                <Button size="small" color="primary" href={window.location.origin + "/" + card.data.curl} target="_blank">
                                                    <VisibilityIcon />
                                                </Button>
                                                <Button size="small" onClick={() => props.handleEditShortUrl(card.data.curl)}>
                                                    <EditIcon />
                                                </Button>
                                                <Button size="small" color="secondary" onClick={() => props.handleDeleteShortUrl(card.data.curl)}>
                                                    <DeleteForeverIcon />
                                                </Button>
                                            </ButtonGroup>

                                        </TableCell>
                                        <TableCell key="lurl" align="right" style={{ minWidth: "100px" }}>
                                            <Box bgcolor="text.primary" color="background.paper" p={2} style={{ overflowX: 'auto', overflowY: 'hidden', whiteSpace: "nowrap" }}>
                                                {card.data.lurl}
                                            </Box>
                                        </TableCell>
                                        
                                    </TableRow>
                                );
                                                })
                                                }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
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