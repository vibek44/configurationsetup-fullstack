import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useBlogActions } from "../hooks/store";
const CommentForm = ({ blogId }) => {
  const { addComment } = useBlogActions();
  const [comment, setComment] = useState("");

  const handleCommentInput = (e) => {
    e.preventDefault();
    const trimmedComment = comment.trim();
    if (trimmedComment) {
      addComment({ comment: trimmedComment }, blogId);
      setComment("");
    }
  };
  return (
    <form onSubmit={handleCommentInput}>
      <TextField
        label="add a comment"
        color="secondary"
        sx={{ width: "15em" }}
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <Button type="submit" variant="contained" sx={{ margin: "0.5em" }}>
        submit
      </Button>
    </form>
  );
};

export default CommentForm;
