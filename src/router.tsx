import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./routes/Root";
import SignupPage from "./routes/signup/SignupPage";
import LoginPage from "./routes/login/LoginPage";
import ProfilePage from "./routes/profile/ProfilePage";
import Layout from "./components/Layout";
import Feed from "./components/Feed";
import RightBar from "./components/RightBar";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/profile"
        element={
          <Layout>
            {" "}
            <ProfilePage />
          </Layout>
        }
      />
      <Route
        path="/feed"
        element={
          <Layout>
            <RightBar /> <Feed />
          </Layout>
        }
      />
    </>
  )
);
