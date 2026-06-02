import { useState, useEffect, useRef } from "react";
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
import {
  useNotificationActions,
  useBlogActions,
  useBlog,
  useUserActions,
  useUser,
} from "./hooks/store";
import blogService from "./services/blogs";

const App = () => {
  const user = useUser();
  //console.log(user);
  const { setUser } = useUserActions();
  const { handleLogin } = useUserActions();
  const blogs = useBlog();
  const { initialize, addBlog, handleLikeUpdate, removeBlog } =
    useBlogActions();
  const { setError, setSuccess } = useNotificationActions();

  const blogFormRef = useRef();
  const sortedBlogs = blogs
    ? blogs.toSorted((a, b) => b.likes - a.likes)
    : undefined;

  const navigate = useNavigate();
  const match = useMatch("/blogs/:id"); //match is object with property params
  const blog =
    sortedBlogs &&
    sortedBlogs.find((el) => (match ? el.id === match.params.id : null));
  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    const userJson = localStorage.getItem("userJson");
    if (userJson) {
      const user = JSON.parse(userJson);
      blogService.setToken(user.token);
      setUser(user);
      if (match) {
        navigate(`/blogs/${match.params.id}`);
      } else navigate("/");
    }
  }, []);

  const handleLoginForm = async ({ userName, password }) => {
    if (!userName || !password) {
      setError("username or password missing");
      setTimeout(() => {
        setError();
      }, 2000);
      return;
    }
    const user = await handleLogin({ userName, password });
    if (user) navigate("/");
  };

  const handleBlogForm = async ({ title, author, url }) => {
    if (!title || !author || !url) {
      setError("title,author or url missing!");
      setTimeout(() => {
        setError();
      }, 3000);
      return;
    }
    blogFormRef.current.toggleVisibility();
    await addBlog({ title, author, url });
    navigate("/");
  };

  const handleBlogUpdate = async (changedBlog) => {
    await handleLikeUpdate(changedBlog);
  };

  const handleRemove = async (removedBlog) => {
    const result = confirm(
      `Remove ${removedBlog.title} by ${removedBlog.author}`
    );
    if (!result) return;
    await removeBlog(removedBlog.id);
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken("not-allowed");
    localStorage.removeItem("userJson");
    navigate("/");
  };

  return (
    <Container disableGutters={false}>
      <MenuLink
        user={user}
        handleLogout={handleLogout}
        sortedBlogs={sortedBlogs}
      />
      <Notification />
      <Routes>
        <Route
          path="/create"
          element={
            <Togglable ref={blogFormRef} buttonLabel="create">
              <BlogForm handleBlogForm={handleBlogForm} />
            </Togglable>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            blog ? (
              <Blog
                user={user}
                blog={blog}
                handleBlogUpdate={handleBlogUpdate}
                handleRemove={handleRemove}
              />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/login"
          element={<LoginForm handleLoginForm={handleLoginForm} />}
        />
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Blogs sortedBlogs={sortedBlogs} />{" "}
            </ErrorBoundary>
          }
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Container>
  );
};

export default App;
