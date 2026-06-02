import { TextField ,Button,Grid} from '@mui/material'
import { useState } from 'react'

const LoginForm=( { handleLogin }) => {
  const [userName, setUserName]=useState('')
  const [password, setPassword]=useState('')

  const handleLoginFormInput  = (e) => {
    e.preventDefault()
    handleLogin({ userName,password })
    setUserName('')
    setPassword('')
  }

  return(
    <div>
       <h3>Log in to application</h3>
      <form onSubmit={handleLoginFormInput} >
        <Grid  >
          <Grid >
          <TextField
            size='small'
            variant='standard'
            label="username"
            type='text'
            value={userName}
            onChange={({ target }) => setUserName(target.value.trim())}
          />
          </Grid>
          <Grid>
          <TextField 
            size='small'
            variant='standard'
            label='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value.trim())}
          />
          </Grid>
          <Grid>
            <Button type="submit" variant='contained' sx={{mt:3}} >login</Button>
          </Grid>         
        </Grid>
      </form>
    </div>
  )
}



export default LoginForm