import { Link } from 'react-router-dom'
import { Card, Typography,Stack,Button } from '@mui/material' 


const Blog = ({ user, blog ,handleBlogUpdate,handleRemove }) => {
  const handleLikes = (blog) => {
    const changedBlog={ ...blog,likes:blog.likes+1 }
    handleBlogUpdate(changedBlog)
  }

  if (!blog)return null
  return(
    <Card  className='detail' style={{ marginTop:'1em',padding:'1em' }}>
      <Stack spacing={1} >
        <Typography variant='h5' > {blog.title} </Typography>
        <Typography variant='subtitle1' > by {blog.author}</Typography>
        <Link style={{color:'#0080FE'}} to={blog.url} target="_blank" rel='noreferer'  >{blog.url}</Link>
        <Typography >
          likes:{blog.likes} {user && <Button  variant='outlined' size='small' sx={{margin:'1em'}} onClick={() => handleLikes(blog)}>like</Button>}
          {( user && (user.id===blog.user.id))  && <Button variant='outlined' size='small' color='error'  onClick={() => handleRemove(blog)}>remove</Button>}
         </Typography>
        <Typography variant='subtitle1 '> Created by {blog.user.userName} </Typography>
      </Stack>
    </Card>

  )

}
export default Blog

