import { Alert } from "@mui/material"

const Notification = ({ message }) => {
  if(message.error){
    return( <Alert severity="error" >{message.error}</Alert> )
  }
  if(message.success){
    return( <Alert severity="success" >{message.success}</Alert> )
  }
  return <Alert severity="info" >{null}</Alert>
}


export default Notification