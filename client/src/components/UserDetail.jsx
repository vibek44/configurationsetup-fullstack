import { useMatch } from "react-router-dom";
import { useUsers } from "../hooks/users-store";

const UserDetail = () => {
  const match = useMatch("/users/:id");
  const users = useUsers();
  const user = match ? users.find((ele) => ele.id === match.params.id) : null;
  if (!user) return null;
  return (
    <>
      <h2>{user.name}</h2>
      <b>Added Blogs</b>
      <ul>
        {user.blogs.map((ele) => (
          <li key={ele.title}>{ele.title}</li>
        ))}
      </ul>
    </>
  );
};

export default UserDetail;
