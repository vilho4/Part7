import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import blogService from '../services/blogs'

const LikeButton = ({ blog }) => {
  const queryClient = useQueryClient()

  const likeMutation = useMutation({
    mutationFn: blogService.update,
    onMutate: async (updatedBlog) => {
      await queryClient.cancelQueries(['blogs'])
      const prevBlogs = queryClient.getQueryData(['blogs'])

      queryClient.setQueryData(['blogs'], (old) =>
        old
          .map((b) =>
            b.id === updatedBlog.id ? updatedBlog : b
          )
          .sort((a, b) => b.likes - a.likes)
      )

      return { prevBlogs }
    },
    onError: (err, vars, ctx) => {
      queryClient.setQueryData(['blogs'], ctx.prevBlogs)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['blogs'])
    }
  })

  const handleLike = () => {
    likeMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  return <button onClick={handleLike}>Like</button>
}

export default LikeButton
