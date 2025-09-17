import { useState } from 'react'
import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import commentService from '../services/comments'

const BlogComments = ({ blog }) => {
  const queryClient = useQueryClient()
  const [newComment, setNewComment] = useState('')

  // Hae kommentit
  const {
    data: comments,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['comments', blog.id],
    queryFn: () => commentService.getAllForOneBlog(blog.id)
  })

  // Mutation uuden kommentin lisäämiseen
  const addCommentMutation = useMutation({
    mutationFn: (comment) =>
      commentService.addComment(blog.id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', blog.id])
      setNewComment('')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim() === '') return
    addCommentMutation.mutate({ text: newComment })
  }

  if (isLoading) return <div>Loading comments...</div>
  if (isError) return <div>Error loading comments</div>

  return (
    <div>
      <h3>Comments</h3>

      {comments.length > 0 ? (
        <ul>
          {comments.map((c) => (
            <li key={c.id}>{c.text}</li>
          ))}
        </ul>
      ) : (
        <p>No comments have been added</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button
          type="submit"
          disabled={addCommentMutation.isLoading}
        >
          {addCommentMutation.isLoading
            ? 'Adding...'
            : 'Add Comment'}
        </button>
      </form>
    </div>
  )
}

export default BlogComments
