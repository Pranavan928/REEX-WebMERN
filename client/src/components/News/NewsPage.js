import React, { useContext, useEffect } from 'react';
import Sidenav from '../SideNav/Sidenav';
import News from './News';
import { Box, Container } from '@material-ui/core';
import Copyright from '../Footer/Footer';
import { NewsContext } from '../../context/NewsContext';
import { useStyles } from '../Styles';

export default function NewsPage() {
  const classes = useStyles();

  const { news, getAllNews } = useContext(NewsContext);

  useEffect(async () => {
    await getAllNews();
  }, []);

  return (
    <div className={classes.root}>
      <Sidenav />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <News news={news} />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
