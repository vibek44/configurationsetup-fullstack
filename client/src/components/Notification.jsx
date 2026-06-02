import { Alert } from "@mui/material";
import { useNotification } from "../hooks/store";

const Notification = () => {
  const notification = useNotification();
  if (notification.error) {
    return <Alert severity="error">{notification.error}</Alert>;
  }
  if (notification.success) {
    return <Alert severity="success">{notification.success}</Alert>;
  }
  return <Alert severity="info">{null}</Alert>;
};

export default Notification;
