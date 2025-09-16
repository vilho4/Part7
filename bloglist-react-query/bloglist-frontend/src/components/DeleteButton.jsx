import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotification } from './NotificationContext'

const DeleteButton = ({ blogToDelete, user }) => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const deleteMutation = useMutation({
    mutationFn: () =>
      blogService.remove(blogToDelete.id, user.token),
    onMutate: async () => {
      await queryClient.cancelQueries(['blogs'])
      const prevBlogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], (old) =>
        old.filter((b) => b.id !== blogToDelete.id)
      )
      return { prevBlogs }
    },
    onError: (err, vars, ctx) => {
      queryClient.setQueryData(['blogs'], ctx.prevBlogs)
      showNotification({
        message: 'Blog deletion failed',
        type: 'error'
      })
    },
    onSuccess: () => {
      showNotification({
        message: `Blog "${blogToDelete.title}" deleted`,
        type: 'success'
      })
    },
    onSettled: () =>
      queryClient.invalidateQueries(['blogs'])
  })

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${blogToDelete.title}"?`
      )
    ) {
      deleteMutation.mutate()
    }
  }

  return (
    <li>
      <button
        onClick={handleDelete}
        style={{ color: 'red' }}
      >
        Delete
      </button>
    </li>
  )
}

export default DeleteButton
