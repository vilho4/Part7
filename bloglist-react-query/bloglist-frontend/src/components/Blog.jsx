import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: likes + 1 }
    const returnedBlog =
      await blogService.update(updatedBlog)
    setLikes(returnedBlog.likes)
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <ul>
        <li>
          <strong>Author:</strong> {blog.author}
        </li>
        <li>
          <strong>URL:</strong> {blog.url}
        </li>
        <li>
          <strong>Likes:</strong> {likes}{' '}
          <button onClick={handleLike}>Like</button>
        </li>
      </ul>
    </div>
  )
}

export default Blog
