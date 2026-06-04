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
import Users from "./components/Users";
import UserDetail from "./components/UserDetail";
import { useBlogActions, useUserActions } from "./hooks/store";
import { useUsersActions } from "./hooks/users-store";
import blogService from "./services/blogs";
import { getUser } from "./services/persistentUser";
const App = () => {
  const { setUserStore } = useUserActions();
  const { initializeUsers } = useUsersActions();

  const { initialize } = useBlogActions();

  const navigate = useNavigate();

  const match = useMatch("/blogs/:id");
  const match2 = useMatch("/users/:id");
  const match3 = useMatch("/users");

  useEffect(() => {
    initialize();
    initializeUsers();
  }, []);

  useEffect(() => {
    const userLocal = getUser();
    if (userLocal) {
      blogService.setToken(userLocal.token);
      setUserStore(userLocal);
      if (match) {
        navigate(`/blogs/${match.params.id}`);
      } else if (match2) {
        navigate(`/users/${match2.params.id}`);
      } else if (match3) {
        navigate("/users");
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
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/users" element={<Users />} />
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
