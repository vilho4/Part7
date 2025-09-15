import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

const Blog = ({ blog, user }) => {
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
          <strong>Likes:</strong> {blog.likes}{' '}
          <LikeButton blog={blog} />
        </li>
        {user.id === blog.user.id && (
          <DeleteButton blogToDelete={blog} user={user} />
        )}
      </ul>
    </div>
  )
}

export default Blog
