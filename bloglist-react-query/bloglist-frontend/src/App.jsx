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
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useNotification } from './components/NotificationContext'
import UserInfo from './components/UserInfo'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import UserDetailsPage from './pages/UserDetailsPage'

const App = () => {
  const { user, dispatch } = useUser()
  const { showNotification } = useNotification()
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 3
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = [...result.data].sort(
    (a, b) => b.likes - a.likes
  )

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <Notification />
      <div>
        <h2>blogs</h2>
        <div>{user.name} logged in</div>
        <button
          onClick={() => {
            dispatch({ type: 'LOGOUT' })
            showNotification({
              message: `${user.username} logged out successfully`,
              type: 'success'
            })
          }}
        >
          Logout
        </button>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <UserInfo />
              <BlogForm />
              {blogs.map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                />
              ))}
            </>
          }
        />
        <Route
          path="/users/:id"
          element={<UserDetailsPage />}
        />
      </Routes>
    </Router>
  )
  // return (
  //   <div>
  //     <Notification />
  //     <h2>blogs</h2>
  //     <div>{user.name} logged in </div>
  //     <button
  //       onClick={() => {
  //         dispatch({ type: 'LOGOUT' })
  //         showNotification({
  //           message: `${user.username} logged out succesfully`,
  //           type: 'success'
  //         })
  //       }}
  //     >
  //       Logout
  //     </button>
  //     <UserInfo />
  //     <BlogForm />
  //     {blogs.map((blog) => (
  //       <Blog key={blog.id} blog={blog} user={user} />
  //     ))}
  //   </div>
  // )
}

export default App
