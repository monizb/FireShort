import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Card, CardContent, Container, CssBaseline, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Chart } from "react-google-charts";
import moment from 'moment';
import firebase from "firebase/app";
import UAParser from 'ua-parser-js';

import { db } from '../firebase/firebase';
import Header from './Header';
import './components.module.css';
import { useParams } from 'react-router';

const useStyles = makeStyles({
  container: {
    marginTop: 80,
  },
  title: {
    fontSize: 14,
  },
  chart: {
    marginTop: 16,
  }
});

const chartOptions = {
  animation: {
    duration: 1000,
    easing: 'out',
    startup: true,
  },
  legend: { position: 'bottom', alignment: 'start' },
};

const AnalyticsChart = memo(({ data, chartType, title, height = '400px' }) => {
  const options = useMemo(() => ({
    ...chartOptions,
    title,
  }), [title]);
  return (
    <CardContent>
      <Chart
        width="100%"
        height={height}
        chartType={chartType}
        loader={<div>Loading Chart</div>}
        data={data}
        options={options}
      />
    </CardContent>
  )
});

const Analytics = () => {
  const { id } = useParams();

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [allClicks, setAllClicks] = useState([]);

  const getUrlAnalytics = useCallback(async () => {
    setLoading(true);
    var user = firebase.auth().currentUser;
    const clicks = await db
      .collection('shorturls')
      .doc(id)
      .collection('tracking')
      .where("author", "==", user.uid)
      .get()
      .then(snapshot => snapshot.docs.map(doc => doc.data()));

    setAllClicks(clicks);
    setLoading(false);
  }, [id]);

  const todayClicks = useMemo(() => {
    const today = moment().format('YYYY-MM-DD');;
    return allClicks.filter(click => {
      const clickDate = moment(click.timestamp).format('YYYY-MM-DD');
      return clickDate === today;
    }).length;
  }, [allClicks]);

  const groupByBrowser = useMemo(() => {
    var parser = new UAParser();
    return allClicks.reduce((acc, curr) => {
      parser.setUA(curr.useragent);
      const { browser } = parser.getResult();
      const currentBrowserInArray = acc.find(item => item[0] === browser.name);

      if (currentBrowserInArray) {
        currentBrowserInArray[1] += 1;
      } else {
        acc.push([browser.name, 1]);
      }

      return acc;
    }, [['Browser', 'Clicks']]);
  }, [allClicks]);

  const groupBySO = useMemo(() => {
    var parser = new UAParser();
    return allClicks.reduce((acc, curr) => {
      parser.setUA(curr.useragent);
      const { os } = parser.getResult();
      const currentSOInArray = acc.find(item => item[0] === os.name);

      if (currentSOInArray) {
        currentSOInArray[1] += 1;
      } else {
        acc.push([os.name, 1]);
      }

      return acc;
    }, [['Operational system', 'Clicks']]);
  }, [allClicks]);

  const clicksByDate = useMemo(() => {
    return allClicks
      .sort((a, b) => {
        return new Date(a.timestamp) - new Date(b.timestamp);
      })
      .reduce((acc, curr) => {
        const dateKey = moment(curr.timestamp).startOf('day').toDate();
        const groupedClickByDate = acc.find(group => group[0] - dateKey === 0);

        if (groupedClickByDate) {
          groupedClickByDate[1] += 1;
        } else {
          acc.push([
            dateKey,
            1,
          ]);
        }

        return acc;
      }, [[{ type: 'date', label: 'Date' }, 'Clicks']]);
  }, [allClicks]);

  useEffect(() => {
    getUrlAnalytics();
  }, [getUrlAnalytics]);

  return (
    <Fragment>
      <Header />
      {loading ? <LinearProgress color='secondary' /> : null}
      <CssBaseline />
      <Container maxWidth="md" >
        <Grid container className={classes.container} spacing={2}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Total clicks
                </Typography>
                <Typography variant="h5" component="h2">
                  {allClicks.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Clicks today
                </Typography>
                <Typography variant="h5" component="h2">
                  {todayClicks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid >
        <Card className={classes.chart}>
          <CardContent>
            <AnalyticsChart
              title="Total Clicks"
              chartType="AreaChart"
              data={clicksByDate}
            />
          </CardContent>
        </Card>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card className={classes.chart}>
              <CardContent>
                <AnalyticsChart
                  title="Browsers"
                  chartType="Bar"
                  data={groupByBrowser}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className={classes.chart}>
              <CardContent>
                <AnalyticsChart
                  title="Operating System"
                  chartType="Bar"
                  data={groupBySO}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  )
}

export default Analytics;
