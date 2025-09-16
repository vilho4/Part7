import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { useUser } from '../contexts/UserContext'
import { useNotification } from './NotificationContext'
import blogService from '../services/blogs'

const BlogForm = ({ onCancel }) => {
  const { user } = useUser()
  const { showNotification } = useNotification()
  const qc = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: (newBlog) =>
      blogService.create(newBlog, user.token),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (err) => console.error(err)
  })

  const onCreate = (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    if (newBlog.title.length < 3) {
      showNotification({
        message: `${newBlog.title} title too short or empty`,
        type: 'error'
      })
      return
    }

    event.target.title.value = ''

    newBlogMutation.mutate(newBlog, {
      onError: (err) => console.error(err),
      onSuccess: () => {
        showNotification({
          message: `${newBlog.title} blog created successfully`,
          type: 'success'
        })
        if (onCancel) onCancel() // sulje lomake onnistuneen luomisen jälkeen
      }
    })
  }

  return (
    <div className="blog-form-container">
      <h3>Create new blog</h3>
      <form onSubmit={onCreate} className="blog-form">
        <input name="title" placeholder="Title" />
        <input name="author" placeholder="Author" />
        <input name="url" placeholder="URL" />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
