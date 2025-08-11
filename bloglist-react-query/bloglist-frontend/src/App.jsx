import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { useQuery } from '@tanstack/react-query'
import { getBlogs } from './services/requests'

const App = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  })

  console.log(JSON.parse(JSON.stringify(result)))
  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
