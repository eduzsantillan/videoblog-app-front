import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import PasswordIcon from "@mui/icons-material/Password";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../copyright/Copyright";

const theme = createTheme();
const ForgotPassword = () => {
  const [result, setResult] = useState({
    status: "",
    message: "",
  });
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setResult({ ...result, status: "OK", message: "Success!" });
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setResult({
            ...result,
            status: "ERR",
            message: "Email not found, please try another",
          });
        } else {
          setResult({ ...result, status: "ERR", message: error.message });
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PasswordIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {result.status === "OK" && (
              <Alert severity="success">
                {" "}
                <strong>Success!</strong> Please check your email in order to
                reset your password. Then you should{" "}
                <a href="/login" className="alert-link">
                  Login
                </a>{" "}
              </Alert>
            )}
            {result.status === "ERR" && (
              <Alert severity="error">{result.message}</Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Password Reset Email
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Go Login
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
