import { useEffect } from "react";
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import ErrorBoundary from "./components/ErrorBoundary";
import MenuLink from "./components/MenuLink";
import Notification from "./components/Notification";
import PageNotFound from "./components/PageNotFound";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import { useBlogActions, useUserActions } from "./hooks/store";
import blogService from "./services/blogs";
import { getUser } from "./services/persistentUser";
const App = () => {
  const { setUserStore } = useUserActions();

  const { initialize } = useBlogActions();

  const navigate = useNavigate();

  const match = useMatch("/blogs/:id");

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    const userLocal = getUser();
    if (userLocal) {
      blogService.setToken(userLocal.token);
      setUserStore(userLocal);
      if (match) {
        navigate(`/blogs/${match.params.id}`);
      } else navigate("/");
    }
  }, []);

  return (
    <Container disableGutters={false}>
      <MenuLink />
      <Notification />
      <Routes>
        <Route
          path="/create"
          element={
            <Togglable buttonLabel="create">
              <BlogForm />
            </Togglable>
          }
        />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Blogs />
            </ErrorBoundary>
          }
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Container>
  );
};

export default App;
