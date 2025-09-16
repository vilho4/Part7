import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const UserDetailsPage = () => {
  const { id } = useParams()
  const {
    data: users,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  const user = users.find((u) => u.id === id)
  if (!user) return <div>User not found</div>

  return (
    <div className="blog-card">
      <h2>{user.username}</h2>
      {user.blogs.length > 0 ? (
        <>
          <h3>Blogs created:</h3>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Has not created any blogs yet</p>
      )}
    </div>
  )
}

export default UserDetailsPage
