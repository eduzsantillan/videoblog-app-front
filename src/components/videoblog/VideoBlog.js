import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useIsAuthenticated } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const VideoBlog = () => {
  const [videos, setVideos] = useState();
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const apiFetchVideoBlog =
    process.env.REACT_APP_CORE_HOST + process.env.REACT_APP_FETCH_VB_PATH;

  useEffect(() => {
    getVideos();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    getVideos();
  };

  const getVideos = async () => {
    try {
      const response = await fetch(apiFetchVideoBlog);
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
    let videoId = "";
    if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("shorts/")[1];
      videoId = videoId.substring(0, videoId.indexOf("?"));
      console.log(videoId);
    } else {
      videoId = url.split("v=")[1];
    }

    if (videoId === null || videoId === undefined) {
      return null;
    }
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

  async function handleDelete(idVideo) {
    console.log(idVideo.toString());

    const apiDeleteVideoBlog =
      process.env.REACT_APP_CORE_HOST +
      process.env.REACT_APP_FETCH_VB_PATH +
      "/" +
      idVideo;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth().token,
      },
    };

    try {
      const response = await fetch(apiDeleteVideoBlog, requestOptions);
      if (response.status === 200) {
        setResponse("Video deleted");
      } else {
        setResponse(response.data);
      }
      handleOpen();
    } catch (error) {
      setResponse(error);
    }
  }

  return (
    <Box sx={{ marginLeft: 10, marginRight: 10, marginBottom: 5 }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        {videos?.map((video) => {
          return (
            <Grid item key={video.title}>
              <Card sx={{ maxWidth: 345, marginTop: 10 }}>
                <img
                  src={getThumbnailFromVideoId(getVideoId(video.urlVideo))}
                  style={{ width: "100%", height: "auto" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {video.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      height: 60,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {video.description}
                    <br></br>
                  </Typography>
                  <Box sx={{ width: "100%", maxWidth: 500, mt: 2 }}>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      style={{ textAlign: "left" }}
                    >
                      Uploaded by {video.username}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions>
                  <Button
                    href={`/play/${getVideoId(video.urlVideo)}`}
                    size="small"
                  >
                    Play
                  </Button>
                  <Button size="small">Comment</Button>
                  {canDeleteVideo(video) && (
                    <Button onClick={() => handleDelete(video.id)} size="small">
                      Delete
                    </Button>
                  )}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box sx={{ ...style, width: 400 }}>
                      <h2 id="parent-modal-title">Alert</h2>
                      <p id="parent-modal-description">{response}</p>
                      <Button onClick={handleClose}>Close</Button>
                    </Box>
                  </Modal>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
export default VideoBlog;
