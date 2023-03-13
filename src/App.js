import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Layout from "./components/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import { RequireAuth } from "react-auth-kit";
import UploadVideoBlog from "./components/videoblog/UploadVideoBlog";
import Register from "./components/register/Register";
import VideoBlogPlayer from "./components/videoblog/VideoBlogPlayer";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={"/"} element={<Dashboard />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"/signup"} element={<Register />}></Route>
          <Route path={"/forgotpass"} element={<ForgotPassword />}></Route>
          <Route
            path={"/upload"}
            element={
              <RequireAuth loginPath={"/login"}>
                <UploadVideoBlog />
              </RequireAuth>
            }
          />
          <Route path="/play/:videoLink" element={<VideoBlogPlayer />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
