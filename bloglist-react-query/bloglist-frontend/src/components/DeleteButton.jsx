import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import blogService from '../services/blogs'

const DeleteButton = ({ blogId, token }) => {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => blogService.remove(blogId, token),
    onMutate: async () => {
      await queryClient.cancelQueries(['blogs'])
      const prevBlogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], (old) =>
        old.filter((b) => b.id !== blogId)
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
        'Are you sure you want to delete this blog?'
      )
    ) {
      deleteMutation.mutate()
    }
  }

  return (
    <button onClick={handleDelete} style={{ color: 'red' }}>
      Delete
    </button>
  )
}

export default DeleteButton
