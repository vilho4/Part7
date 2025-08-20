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
import { useNotification } from './components/NotificationContext'

const App = () => {
  const { user, dispatch } = useUser()
  const { showNotification } = useNotification()

  console.log(user, 'miltä user näyttää')
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
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <div>{user.name} logged in </div>
      <button
        onClick={() => {
          dispatch({ type: 'LOGOUT' })
          showNotification({
            message: `${user.username} logged out succesfully`,
            type: 'success'
          })
        }}
      >
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
