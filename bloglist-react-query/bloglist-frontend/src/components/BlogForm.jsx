import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { useContext } from 'react'
import { useNotification } from './NotificationContext'

import { createBlog } from '../services/requests'

const BlogForm = () => {
  const { dispatch } = useNotification()
  const qc = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const blogTitle = event.target.title.value
    if (blogTitle.length < 3) {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: 'title too short or empty'
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' })
      }, 3000)
      return
    }
    event.target.title.value = ''
    newBlogMutation.mutate({ blogTitle })
    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: `${blogTitle} created`
    })
  }

  console.log('testi')
  return (
    <div>
      <h3>mitä</h3>
    </div>
  )
}

export default BlogForm
