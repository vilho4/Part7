import axios from 'axios'
const baseUrl = '/api/blogs'

export const getBlogs = () =>
  axios.get(baseUrl).then((res) => res.data)
