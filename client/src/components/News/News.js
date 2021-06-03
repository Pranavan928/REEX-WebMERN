import React, { useState } from 'react';
import { Paper, Grid } from '@material-ui/core';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';
import axios from 'axios';
import { SuccessMessage, FailedMessage } from '../layouts/Alert';
import Gif from '../../assests/gif.gif'

function ReadMore(props) {
  const { singleNewsId, children, maxCharacterCount } = props;
  const text = children;
  const [isTruncated, setIsTruncated] = useState(true);
  const resultString = isTruncated ? text.slice(0, maxCharacterCount) : text;
  const [deleteStatus, setDeleteStatus] = useState();

  function toggleIsTruncated() {
    setIsTruncated(!isTruncated);
  }
  var currentUser = JSON.parse(localStorage.getItem('user'));

  const onDeleteNews = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    let deleteUrl = 'http://localhost:3000/news/' + singleNewsId;
    axios
      .delete(deleteUrl, config)
      .then((res) => {
        setDeleteStatus(true);
      })
      .catch((err) => {
        setDeleteStatus(false);
        console.log(err);
      });
  };

  return (
    <>
      <p className="has-text-left">
        {deleteStatus === true ? (
          <SuccessMessage message="This news deleted successfully." />
        ) : null}
        {deleteStatus === false ? (
          <FailedMessage message="Error in deleting this news." />
        ) : null}
        {resultString}
        {isTruncated ? '....' : null}
      </p>

      <Row>
        <Col xs={12} sm={10}>
          {text.slice(' ').length > 100 ? (
            <Button
              color="primary"
              onClick={toggleIsTruncated}
              className="tag is-info is-small"
            >
              {isTruncated ? 'Read More' : 'Read Less'}
            </Button>
          ) : null}
        </Col>
        <Col xs={12} sm={2}>
          {currentUser.role === 'admin' ? (
            <Button color="danger" href="#pablo" onClick={onDeleteNews}>
              Delete
            </Button>
          ) : null}
        </Col>
      </Row>
    </>
  );
}

function News(props) {
  const { news } = props;

  const NewsData = [];

  const getDate = (realDate) => {
    const datee = new Date(realDate);
    const year = datee.getUTCFullYear();
    const month = datee.getUTCMonth();
    const date = datee.getUTCDate();
    const correctDate = date + '-' + (month + 1) + '-' + year;
    return correctDate;
  };

  if (news) {
    news.map((data) => {
      const dataa = {
        id: data._id,
        title: data.title,
        news: data.news,
        startDisplayOn: new Date(data.startDisplayOn),
        endDisplayOn: new Date(data.endDisplayOn),
        viewers: data.viewers,
        visibleStartOn: getDate(data.startDisplayOn),
        visibleEndOn: getDate(data.endDisplayOn),
        createdOn: getDate(data.createdAt),
      };
      NewsData.push(dataa);
    });
  }
  var currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Row>
        <h3 style={{textAlign:"center", padding:20}}>News</h3>
        <Col xs={12} sm={1}></Col>
        {!news ?
          <Grid container style={{textAlign:"center"}}>
            <Grid xs={12} sm={4}></Grid>
            <Grid xs={12} sm={4} justify="center">
              <img src={Gif} alt="" style={{ alignItems: "center", paddingTop: 50, paddingBottom: 100 }} />
            </Grid>
            <Grid xs={12} sm={4}></Grid>
          </Grid> :
          <Col xs={12} sm={10}>
            {NewsData.reverse().map((singleNews) => (
              <>
                {(singleNews.startDisplayOn <= new Date() &&
                  singleNews.endDisplayOn >= new Date()) ? (
                  <>
                    <Card style={{ borderColor: "#ef4730", borderStyle: "solid", borderWidth: "2px" }}>
                      <Paper elevation={4}>
                        <CardBody>
                          <CardTitle
                            style={{ textAlign: 'center' }}
                            className=" mb-3"
                            tag="h4"
                          >
                            {singleNews.title}
                          </CardTitle>
                          {currentUser.role === 'admin' ? (
                            <Row>
                              <hr style={{ width: "98%" }} />
                              <Col xs={12} sm={3}>
                                <span style={{ fontWeight: "bold" }}>
                                  Start Display On : </span> {singleNews.visibleStartOn}

                              </Col>
                              <Col xs={12} sm={3}>
                                <span style={{ fontWeight: "bold" }}>
                                  End Display On :</span> {singleNews.visibleEndOn}

                              </Col>
                              <Col xs={12} sm={3}>
                                <span style={{ fontWeight: "bold" }}>Viewers : </span> {singleNews.viewers[0]} {singleNews.viewers[1]}
                              </Col>
                              <Col xs={12} sm={3}>
                                <span style={{ fontWeight: "bold" }}>Created On : </span> {singleNews.createdOn}
                              </Col>
                            </Row>
                          ) : null}
                          <hr />
                          <ReadMore
                            singleNewsId={singleNews.id}
                            children={singleNews.news}
                            maxCharacterCount={150}
                          >
                            {singleNews.news}
                          </ReadMore>
                        </CardBody>
                      </Paper>
                    </Card>
                  </>
                ) :
                  <Card style={{ borderColor: "#1278B8", borderStyle: "solid", borderWidth: "2px" }}>
                    <Paper elevation={4}>
                      <CardBody>
                        <CardTitle
                          style={{ textAlign: 'center' }}
                          className=" mb-3"
                          tag="h4"
                        >
                          {singleNews.title}
                        </CardTitle>
                        {currentUser.role === 'admin' ? (
                          <Row>
                            <hr style={{ width: "98%" }} />
                            <Col xs={12} sm={3}>
                              <span style={{ fontWeight: "bold" }}>
                                Start Display On : </span> {singleNews.visibleStartOn}

                            </Col>
                            <Col xs={12} sm={3}>
                              <span style={{ fontWeight: "bold" }}>
                                End Display On :</span> {singleNews.visibleEndOn}

                            </Col>
                            <Col xs={12} sm={3}>
                              <span style={{ fontWeight: "bold" }}>Viewers : </span> {singleNews.viewers[0]} {singleNews.viewers[1]}
                            </Col>
                            <Col xs={12} sm={3}>
                              <span style={{ fontWeight: "bold" }}>Created On : </span> {singleNews.createdOn}
                            </Col>
                          </Row>
                        ) : null}
                        <hr />
                        <ReadMore
                          singleNewsId={singleNews.id}
                          children={singleNews.news}
                          maxCharacterCount={150}
                        >
                          {singleNews.news}
                        </ReadMore>
                      </CardBody>
                    </Paper>
                  </Card>
                }

                <br />
              </>
            ))}
          </Col>
        }
        <Col xs={12} sm={1}></Col>
      </Row>
    </>
  );
}

export default News;
