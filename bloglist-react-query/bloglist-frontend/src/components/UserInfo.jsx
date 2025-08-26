import userService from '../services/users'

import {
  useMutation,
  useQuery
} from '@tanstack/react-query'

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

  if (isLoading) return <div>Loading data...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} — blogs created:{' '}
            {user.blogs.length}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default UserInfo
