import { Link } from 'react-router-dom'

const Blogs = ( { sortedBlogs } ) => {

  if( typeof sortedBlogs ==='undefined')throw new Error('Try again and make a bug report') 
   
  return(
    <div>
      <h3>Blogs</h3>
      <ul className='briefly'>
        {  sortedBlogs.map(blog => <li key={blog.id }> <Link to={`/blogs/${blog.id}`}>{blog.title} By {blog.author}</Link> </li> )
        }
      </ul>
    </div>
  )
}

export default Blogs
