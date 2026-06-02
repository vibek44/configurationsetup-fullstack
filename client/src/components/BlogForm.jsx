import {  useState } from 'react'
import { TextField, Button, Stack } from '@mui/material'


const BlogForm = ({ handleBlogForm }) => {
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')
  const handleFormInput = (e) => {
    e.preventDefault()
    handleBlogForm({ title,author,url })
  }
  return(
    <>
       <h3>Create a blog</h3>
      <form  onSubmit={handleFormInput}style={{ width:'20em' }}>
      <Stack   spacing={3} >
          
          <TextField
            size='small'
            variant='outlined'
            label='title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value.trim())}
          />
        
          <TextField 
            size='small'
            variant='outlined'
            label='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value.trim())}
          />
         
            <TextField 
              size='small'
              variant='outlined'
              label='url'
              type='text'
              value={url}
              onChange={({ target }) => setUrl(target.value.trim())}
            />
          
            <Button type="submit" variant='contained' size='small' sx={{width:'7em'}} >create</Button>
                   
        </Stack>
      </form >
    </>
    
  )
}

export default BlogForm