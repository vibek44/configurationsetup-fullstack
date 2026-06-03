export const setUser = (user) => {
  localStorage.setItem("LoggedBlogUser", JSON.stringify(user));
  return;
};

export const getUser = () => {
  const userJson = localStorage.getItem("LoggedBlogUser");
  const user = JSON.parse(userJson);
  return user;
};

export const removeUser = () => {
  localStorage.removeItem("LoggedBlogUser");
  return;
};
