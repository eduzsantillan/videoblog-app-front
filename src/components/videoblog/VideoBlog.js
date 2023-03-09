import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useIsAuthenticated } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";

const VideoBlog = () => {
  const [videos, setVideos] = useState();
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await fetch("http://44.212.22.79:9091/api/videoblog/");
      if (response.status === 200) {
        const data = await response.json();
        setVideos(data);
        console.log(data);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  function getVideoId(url) {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
      return videoId.substring(0, ampersandPosition);
    }
    return videoId;
  }

  function getThumbnailFromVideoId(videoId) {
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  }

  function canDeleteVideo(video) {
    return isAuthenticated() && video.username === auth().email;
  }

  return (
    <div>
      <Row>
        <Col>
          <h1>Last updated Videos </h1>
        </Col>
      </Row>
      <br></br>
      <Row xs={1} md={4} className="g-4">
        {videos?.map((video) => {
          return (
            <Col key={video.description}>
              <Card>
                <Card.Img
                  variant="top"
                  src={getThumbnailFromVideoId(getVideoId(video.urlVideo))}
                />
                <Card.Body>
                  <Card.Title>{video.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    By {video.username}
                  </Card.Subtitle>
                  <Card.Text>{video.description}</Card.Text>
                  {canDeleteVideo(video) && (
                    <Card.Link href="#">Delete</Card.Link>
                  )}
                  <Card.Link href={`/play/${getVideoId(video.urlVideo)}`}>
                    Play
                  </Card.Link>
                  <Card.Link href="#">Comment</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default VideoBlog;
