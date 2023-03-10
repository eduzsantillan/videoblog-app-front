import React from "react";
import Header from "../header/Header";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const UploadVideoBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [result, setResult] = useState({
    status: "201",
    message: "",
  });
  const auth = useAuthUser();
  const navigate = useNavigate();
  const apiUploadVideoBlog =
    process.env.REACT_APP_CORE_HOST + process.env.REACT_APP_CREATE_VB_PATH;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      title: title,
      description: description,
      urlVideo: urlVideo,
      username: auth().email,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth().token,
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(apiUploadVideoBlog, requestOptions);
      if (response.status === 201) {
        navigate("/"); // navigate to dashboard
      } else {
        const errorData = await response.text();
        setResult({ ...result, status: response.status, message: errorData });
      }
    } catch (error) {
      console.error(error);
      setResult({ ...result, status: "500", message: error });
    } finally {
      setTitle("");
      setDescription("");
      setUrlVideo("");
    }
  };

  return (
    <div>
      <Header />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUrlVideo">
          <Form.Label>URL Video</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter youtube url"
            value={urlVideo}
            onChange={(e) => setUrlVideo(e.target.value)}
          />
        </Form.Group>

        {result.status !== "201" && (
          <div className="alert alert-danger">{result.message}</div>
        )}
        <Button variant="primary" type="submit">
          Post Video
        </Button>
      </Form>
    </div>
  );
};

export default UploadVideoBlog;
