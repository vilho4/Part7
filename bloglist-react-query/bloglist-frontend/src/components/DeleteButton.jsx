import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import blogService from '../services/blogs'

const DeleteButton = ({ blogToDelete, user }) => {
  // console.log('mitäs deletelle välitetään', blogToDelete)
  // console.log(user, 'useri')
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () =>
      blogService.remove(blogToDelete.id, user.token),
    onMutate: async () => {
      await queryClient.cancelQueries(['blogs'])
      const prevBlogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], (old) =>
        old.filter((b) => b.id !== blogToDelete)
      )
      return { prevBlogs }
    },
    onError: (err, vars, ctx) => {
      queryClient.setQueryData(['blogs'], ctx.prevBlogs)
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
