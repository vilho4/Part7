import axios from 'axios'
const baseUrl = '/api/comments'

const getAllForOneBlog = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}`)
  return response.data
}

const addComment = async (blogId, comment) => {
  const response = await axios.post(baseUrl, {
    text: comment.text,
    blogId
  })
  return response.data
}

export default { getAllForOneBlog, addComment }
