import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import store from "./app/store";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookMarks from "./pages/BookMarks";
import Explore from "./pages/Explore";
import EditPost from "./pages/EditPost";
import UserProfile from "./pages/UserProfile";
import GlobalTokenChecker from "./components/GlobalTokenChecker";
import { checkAuth } from "./utils/checkAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));

checkAuth(store.dispatch);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/bookmarks",
    element: <BookMarks />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/post/edit/:id",
    element: <EditPost />,
  },
  {
    path: "/profile/:id",
    element: <UserProfile />,
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <GlobalTokenChecker />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
