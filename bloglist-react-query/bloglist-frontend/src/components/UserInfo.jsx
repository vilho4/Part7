import userService from '../services/users'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const UserInfo = () => {
  const {
    data: users,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 3
  })

  if (isLoading) return <div>Loading users...</div>
  if (isError) return <div>Error loading users</div>

  return (
    <div>
      <h1>Users</h1>
      <div className="blog-card">
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>
                {user.username}
              </Link>{' '}
              — blogs created: {user.blogs.length}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UserInfo
