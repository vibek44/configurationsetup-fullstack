import { useState, useEffect,useRef } from 'react'
import ErrorBoundary from './components/ErrorBoundary'

import MenuLink from './components/MenuLink'
import Notification from './components/Notification'
import PageNotFound from './components/PageNotFound'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import loginService from '../src/services/login'
import blogService from './services/blogs'
import {  Route,Routes, useMatch, useNavigate } from 'react-router-dom'
import BlogForm from './components/BlogForm'
import { Container } from '@mui/material'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser]=useState(null)
  const [message, setMessage]=useState({ success:null, error:null })
  const blogFormRef=useRef()
  const sortedBlogs=blogs  ? blogs.toSorted((a,b) => b.likes-a.likes): undefined
  
  const navigate=useNavigate()
  const match=useMatch('/blogs/:id')  //match is object with property params
  const blog=sortedBlogs && sortedBlogs.find(el=>match? el.id===match.params.id:null)
  useEffect( () => {
    async function fetchBlog(){
      try {
        const blogs=await blogService.getAll()
        setBlogs( blogs )
      } catch (error) {
        setBlogs(undefined)
        setMessage({ ...message, error:error.response.data.error })
        setTimeout(() => {
          setMessage({ ...message,error:null })
        }, 2000)
      }
    }
    fetchBlog()
  }, [])

  useEffect(() => {
    const userJson=localStorage.getItem('userJson')
    if(userJson){
      const user=JSON.parse(userJson)
      blogService.setToken(user.token)
      setUser(user)
      if(match){
        navigate(`/blogs/${match.params.id}`)
      }
      else navigate('/')
    }
  },[])

  const handleLogin=async ({ userName,password }) => {
    if(!userName || !password){
      setMessage({ ...message,error:'username or password missing' })
      setTimeout(() => {
        setMessage({ ...message,error:null })
      },2000)
      return
    }
    try {
      const user=await loginService.login({ userName,password })
      blogService.setToken(user.token)
      localStorage.setItem('userJson',JSON.stringify(user))
      setUser(user)
      navigate('/')
    } catch (error) {
      setMessage({ ...message, error:error?.response?.data?.error })
      setTimeout(() => {
        setMessage({ ...message,error:null })
      }, 2000)
    }
  }

  const handleBlogForm = async ({ title,author,url }) => {
    if(!title ||!author ||!url){
      setMessage({ ...message,error:'title,author or url missing!' })
      setTimeout(() => {
        setMessage({ ...message,error:null })
      }, 3000)
      return
    }
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog=await blogService.create({ title,author,url })
      setBlogs(blogs.concat(savedBlog))
      setMessage({ ...message,success:`a new blog ${savedBlog.title}! by ${savedBlog.author} added` })
      setTimeout(() => {
        setMessage({ ...message,success:null })
      },2000)
      navigate('/')
    } catch (error) {
      setMessage({ ...message,error:error?.response?.data?.error })
      setTimeout(() => {
        setMessage({ ...message,error:null })
      }, 3000)
    }
  }

  const handleBlogUpdate = async(changedBlog) => {
    try {
      const updatedBlog=await blogService.update(changedBlog)
      setBlogs(blogs.map(blog => blog.id!==updatedBlog.id ? blog : updatedBlog))
      
    } catch (error) {
      setMessage({ ...message,error:error?.response?.data?.error })
      setTimeout(() => {
        setMessage({ ...message,error:null })
      }, 3000)
    }

  }
  const handleRemove = async(removeBlog) => {
    const result=confirm(`Remove ${removeBlog.title} by ${removeBlog.author}`)
    if(!result) return
    try {
      await blogService.remove(removeBlog.id)
      setBlogs(blogs.filter(blog => blog.id!==removeBlog.id))
      navigate('/')
    } catch (error) {
      setMessage({ ...message,error:error?.response?.data?.error })
      setTimeout(() => {
        setMessage({ ...message,error:null })
      }, 3000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken('not-allowed')
    localStorage.removeItem('userJson')
    navigate('/')
  }

  return (
    <Container disableGutters={false}>
      <MenuLink user={user} handleLogout={handleLogout} sortedBlogs={sortedBlogs }/>
      <Notification message={message} />
     
      <Routes> 
        <Route path='/create' 
          element={ 
          <Togglable ref={blogFormRef} buttonLabel='create' >
            <BlogForm handleBlogForm={handleBlogForm}/>
          </Togglable>}
        />
   
        <Route path='/blogs/:id'  element={ blog ? <Blog  user={user} blog={blog} 
          handleBlogUpdate={handleBlogUpdate} handleRemove={handleRemove}/> :<PageNotFound/>}  />
        
        <Route path='/login' element={<LoginForm handleLogin={handleLogin}/>} />
        <Route path='/*' element= {<PageNotFound />}/>
        <Route  path='/' element={  <ErrorBoundary><Blogs sortedBlogs={sortedBlogs} /> </ErrorBoundary> } />
        
      </Routes>
     
    </Container>
  )
}

export default App