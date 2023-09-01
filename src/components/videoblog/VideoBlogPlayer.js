import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import Header from "../header/Header";

const VideoBlog = () => {
  let params = useParams();
  let key = params.videoLink;

  return (
    <div>
      <Header />
      <div style={{ height: "90vh" }}>
        {key !== null ? (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${key}`}
            playing={true}
            controls={true}
            width="100%"
            height="100%"
          />
        ) : (
          <h1>Video not available</h1>
        )}
      </div>
    </div>
  );
};

export default VideoBlog;
