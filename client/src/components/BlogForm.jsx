import { useField } from "../hooks/useField";
import { TextField, Button, Stack } from "@mui/material";
import { useNotificationActions, useBlogActions } from "../hooks/store";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const navigate = useNavigate();
  const title = useField("text", "title", "small", "outlined");
  const author = useField("text", "author", "small", "outlined");
  const url = useField("text", "url", "small", "outlined");

  const { setError } = useNotificationActions();
  const { addBlog } = useBlogActions();
  const handleFormInput = async (e) => {
    e.preventDefault();
    if (!title.value || !author.value || !url.value) {
      setError("title,author or url missing!");
      setTimeout(() => {
        setError();
      }, 3000);
      return;
    }
    await addBlog({ title: title.value, author: author.value, url: url.value });
    navigate("/");
  };
  return (
    <>
      <h3>Create a blog</h3>
      <form onSubmit={handleFormInput} style={{ width: "20em" }}>
        <Stack spacing={3}>
          <TextField {...title} />

          <TextField {...author} />

          <TextField {...url} />

          <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{ width: "7em" }}
          >
            create
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default BlogForm;
