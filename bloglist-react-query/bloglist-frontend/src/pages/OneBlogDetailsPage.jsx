import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import { Link } from 'react-router-dom'

const OneBlogDetailsPage = ({ user }) => {
  const { id } = useParams()
  // console.log('oneblogiuser', user)

  const {
    data: blogs,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  const blog = blogs.find((b) => b.id === id)
  if (!blog)
    return (
      <div className="blog-card">
        <h2>Blog not found or was deleted</h2>
        <Link to="/">Back to home</Link>
      </div>
    )

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading blog data</div>

  return (
    <div className="blog-card">
      <h2>{blog.title}</h2>
      <ul>
        <li>
          <strong>Author:</strong> {blog.author}
        </li>
        <li>
          <strong>URL:</strong>{' '}
          <a
            href={
              blog.url.startsWith('http://') ||
              blog.url.startsWith('https://')
                ? blog.url
                : `https://${blog.url}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {blog.url}
          </a>
        </li>

        <li>
          <strong>Likes:</strong> {blog.likes}{' '}
          <LikeButton blog={blog} />
        </li>
        {user.id === blog.user.id && (
          <DeleteButton blogToDelete={blog} user={user} />
        )}
        <li>
          <strong>Added by:</strong>{' '}
          {blog.user?.name || 'Adder not known'}
        </li>
      </ul>
    </div>
  )
}

export default OneBlogDetailsPage
