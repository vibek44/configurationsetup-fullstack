import { TextField, Button, Grid } from "@mui/material";
import { useState } from "react";
import { useNotificationActions, useUserActions } from "../hooks/store";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setError } = useNotificationActions();
  const { handleLogin } = useUserActions();

  const handleLoginFormInput = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      setError("username or password missing");
      setTimeout(() => {
        setError();
      }, 2000);
      return;
    }
    const user = await handleLogin({ userName, password });
    if (user) navigate("/");
    setUserName("");
    setPassword("");
  };

  return (
    <div>
      <h3>Log in to application</h3>
      <form onSubmit={handleLoginFormInput}>
        <Grid>
          <Grid>
            <TextField
              size="small"
              variant="standard"
              label="username"
              type="text"
              value={userName}
              onChange={({ target }) => setUserName(target.value.trim())}
            />
          </Grid>
          <Grid>
            <TextField
              size="small"
              variant="standard"
              label="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value.trim())}
            />
          </Grid>
          <Grid>
            <Button type="submit" variant="contained" sx={{ mt: 3 }}>
              login
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default LoginForm;
