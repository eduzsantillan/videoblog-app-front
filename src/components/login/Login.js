import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import Copyright from "../copyright/Copyright";
import { auth, provider } from "../../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (!auth.currentUser.emailVerified) {
          setError("Please verify your email address, before you login");
          return;
        }
        // Signed in
        let token;
        auth.currentUser.getIdToken(true).then(function (idToken) {
          console.log("idToken: " + idToken);
          signIn({
            token: idToken,
            expiresIn: 60,
            tokenType: "Bearer",
            authState: {
              email: email,
              token: idToken,
            },
          });
        });

        navigate("/"); // navigate to dashboard
        // ...
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setError("Wrong password");
        } else if (error.code === "auth/user-not-found") {
          setError("User not found");
        } else {
          setError("Something went wrong");
        }
      });
  };

  const handleSignInGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        let token;
        auth.currentUser.getIdToken(true).then(function (idToken) {
          token = idToken;
          console.log("idToken: " + token);
          signIn({
            token: token,
            expiresIn: 60,
            tokenType: "Bearer",
            authState: {
              email: auth.currentUser.email,
              fromProvider: true,
              providerData: auth.currentUser,
              token: token,
            },
          });
          navigate("/");
        });
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button
                onClick={handleSignInGoogle}
                variant="contained"
                color="primary"
                startIcon={
                  <img
                    src="https://imgur.com/O9V5ups.png"
                    alt="Google"
                    height={25}
                  />
                }
              >
                Sign in with Google
              </Button>

              <Grid
                container
                spacing={3}
                style={{ marginTop: "10px" }}
                justifyContent="flex-end"
                alignItems="center"
              >
                <Grid item xs={4}>
                  <Link href="/forgotpass" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs={8}>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
