import { Link } from "react-router-dom";
import { Card, Typography, Stack, Button, TextField } from "@mui/material";
import { useBlog, useUser } from "../hooks/store";
import { useMatch } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { useBlogActions } from "../hooks/store";
import { useNavigate } from "react-router-dom";
import CommentForm from "./CommentForm";

const Blog = () => {
  const user = useUser();
  const blogs = useBlog();
  const { handleLikeUpdate, removeBlog } = useBlogActions();
  const navigate = useNavigate();
  const match = useMatch("/blogs/:id");
  const id = match.params.id;
  const blog = blogs.find((el) => el.id === id);

  const handleLikes = async (blog) => {
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    await handleLikeUpdate(changedBlog);
  };

  const handleRemove = async (blog) => {
    const result = confirm(`Remove ${blog.title} by ${blog.author}`);
    if (!result) return;
    await removeBlog(blog.id);
    navigate("/");
  };

  if (!blog) {
    return <PageNotFound />;
  }
  return (
    <Card className="detail" style={{ marginTop: "1em", padding: "1em" }}>
      <Stack spacing={1}>
        <Typography variant="h5"> {blog.title} </Typography>
        <Typography variant="subtitle1"> by {blog.author}</Typography>
        <Link
          style={{ color: "#0080FE" }}
          to={blog.url}
          target="_blank"
          rel="noreferer"
        >
          {blog.url}
        </Link>
        <Typography>
          likes:{blog.likes}
          {user && (
            <Button
              variant="outlined"
              size="small"
              sx={{ margin: "1em" }}
              onClick={() => handleLikes(blog)}
            >
              like
            </Button>
          )}
          {user && user.id === blog.user.id && (
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => handleRemove(blog)}
            >
              remove
            </Button>
          )}
        </Typography>
        <Typography variant="subtitle1 ">
          Created by {blog.user.userName}
        </Typography>
        <div>
          <h3>Comments</h3>
          {user && <CommentForm blogId={blog.id} />}
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index} style={{ fontFamily: "sans-serif" }}>
                {comment}
              </li>
            ))}
          </ul>
        </div>
      </Stack>
    </Card>
  );
};
export default Blog;
