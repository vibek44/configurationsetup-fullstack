import { NavLink } from "react-router-dom";
import { Stack } from "@mui/material";
import { useBlog, useUserActions } from "../hooks/store";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/store";

const MenuLink = ({ sortedBlogs }) => {
  const navigate = useNavigate();
  const user = useUser();
  const blogs = useBlog();
  const { handleLogout } = useUserActions();

  const logoutHandle = () => {
    handleLogout();
    navigate("/");
  };

  const styleLink = ({ isActive }) => ({
    textDecoration: isActive ? "" : "none",
    color: isActive ? "orange" : "white",
    marginLeft: "1em",
  });

  const styleStack = {
    alignItems: "center",
    backgroundColor: "#0080FE",
    height: "4em",
    margin: "1em auto",
    justifyContent: "space-between",
  };

  return (
    <Stack direction="row" style={styleStack}>
      <Stack>
        <NavLink
          style={{
            textDecoration: "none",
            marginLeft: "1em",
            color: "white",
            fontSize: "1.5em",
          }}
          to="/"
        >
          BlogApp
        </NavLink>
      </Stack>
      {typeof blogs !== "undefined" && (
        <Stack direction="row" spacing={1} sx={{ marginRight: "1em" }}>
          <NavLink style={styleLink} to="/">
            BLOGS
          </NavLink>

          {user && (
            <NavLink style={styleLink} to="/create" caseSensitive>
              NEW BLOG
            </NavLink>
          )}
          {user ? (
            <button style={{ height: "1.5em" }} onClick={logoutHandle}>
              LOGOUT
            </button>
          ) : (
            <NavLink style={styleLink} to="/login" caseSensitive>
              LOGIN
            </NavLink>
          )}
        </Stack>
      )}
    </Stack>
  );
};
export default MenuLink;
