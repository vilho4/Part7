import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import {
  UserProvider,
  useUser
} from './contexts/UserContext'
import {
  useMutation,
  useQuery
} from '@tanstack/react-query'
import { createBlog, getBlogs } from './services/requests'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const { user, dispatch } = useUser()
  console.log(user)
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    retry: 3
  })

  console.log(JSON.parse(JSON.stringify(result)))
  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  if (!user) {
    return (
      <div>
        <Notification />
        <h2>Login</h2>
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <div>{user.name} logged in </div>
      <button onClick={() => dispatch({ type: 'LOGOUT' })}>
        Logout
      </button>
      <BlogForm />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
