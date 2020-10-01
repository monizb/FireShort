import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  CardActions,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { FileCopyOutlined as FileCopyOutlinedIcon } from '@material-ui/icons';
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';
import { OpenInBrowser } from '@material-ui/icons';

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
    justifyContent: 'flex-end',
  },
  chip: {
    color: 'white',
  },
}));

export default function CardUrls(props) {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {props.shortUrls.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardHeader
                action={
                  <IconButton
                    color="primary"
                    className={classes.copyButton}
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.origin + '/' + card.data.curl);
                    }}
                  >
                    <FileCopyOutlinedIcon />
                  </IconButton>
                }
                title={
                  <Tooltip
                    title={card.data.track === true ? 'Link Tracking ON' : 'Link Tracking OFF'}
                  >
                    <Badge color={card.data.track === true ? 'primary' : 'error'} variant="dot">
                      <Typography>{card.data.curl}</Typography>
                    </Badge>
                  </Tooltip>
                }
                titleTypographyProps={{
                  variant: 'subtitle1',
                }}
              ></CardHeader>
              <CardContent className={classes.cardContent}>
                <Box
                  bgcolor="text.primary"
                  color="background.paper"
                  p={2}
                  style={{ overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap' }}
                >
                  {card.data.lurl}
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" href={card.data.lurl} target="_blank">
                  Open
                </Button>
                <Button size="small" onClick={() => props.handleEditShortUrl(card.data.curl)}>
                  Edit
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => props.handleDeleteShortUrl(card.data.curl)}
                >
                  Delete
                </Button>
                <Tooltip title={card.data.hits + ' Hits'}>
                  <div
                    onClick={() => {
                      props.openHits(card.data.curl);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <Badge badgeContent={card.data.hits} color="secondary" max={Infinity} showZero>
                      <OpenInBrowser />
                    </Badge>
                  </div>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
