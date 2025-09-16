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
// import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useNotification } from './components/NotificationContext'
import Navigation from './pages/Navigation'
import BlogFormToggle from './components/BlogFormToggle'
import BlogsPage from './pages/BlogsPage'
import UsersPage from './pages/UsersPage'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import UserDetailsPage from './pages/UserDetailsPage'
import OneBlogDetailsPage from './pages/OneBlogDetailsPage'

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
      {user && (
        <Navigation
          user={user}
          onLogout={() => {
            dispatch({ type: 'LOGOUT' })
            showNotification({
              message: `${user.username} logged out successfully`,
              type: 'success'
            })
          }}
        />
      )}
      <h2>blog app</h2>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BlogFormToggle />
              <h3>Latest blogs</h3>
              <ul>
                {blogs.slice(0, 5).map((blog) => (
                  <li key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title}
                    </Link>{' '}
                    — {blog.author}
                  </li>
                ))}
              </ul>
              {blogs.length > 5 && (
                <p>
                  <Link to="/blogs">
                    Click blogs to view all
                  </Link>
                </p>
              )}
            </>
          }
        />
        <Route
          path="/blogs"
          element={<BlogsPage blogs={blogs} />}
        />
        <Route
          path="/blogs/:id"
          element={<OneBlogDetailsPage user={user} />}
        />
        <Route path="/users" element={<UsersPage />} />
        <Route
          path="/users/:id"
          element={<UserDetailsPage />}
        />
      </Routes>
    </Router>
  )
}

export default App
