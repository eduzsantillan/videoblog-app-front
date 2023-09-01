import React from "react";
import Header from "../header/Header";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const theme = createTheme({
  palette: {
    primary: {
      main: "#78909c",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

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

  const handleSubmit = async (e) => {
    console.log("Upload");
    e.preventDefault();
    try {
      const collectionRef = collection(db, "video-blog");
      const payload = {
        title: title,
        description: description,
        urlVideo: urlVideo,
        username: auth().email,
      };
      await addDoc(collectionRef, payload);
      navigate("/");
    } catch (error) {
      setResult({ ...result, status: "500", message: error });
      console.log(error);
    } finally {
      setTitle("");
      setDescription("");
      setUrlVideo("");
    }
  };

  return (
    <div>
      <Header />
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Description"
                  label="Description"
                  type="text"
                  id="description"
                  autoComplete="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="URL Video"
                  label="Url Video"
                  type="text"
                  id="description"
                  autoComplete="Enter youtube url"
                  value={urlVideo}
                  onChange={(e) => setUrlVideo(e.target.value)}
                />

                {result.status !== "201" && (
                  <Alert severity="error">{result.message}</Alert>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Post Video
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://images.pexels.com/photos/3945314/pexels-photo-3945314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default UploadVideoBlog;
