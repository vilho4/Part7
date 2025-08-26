import axios from 'axios'
// const baseUrl = '/api/blogs'

const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await axios.post(
    baseUrl,
    newObject,
    config
  )
  return response.data
}

const update = (updatedBlog) => {
  return axios
    .put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
    .then((response) => {
      return response.data
    })
}

const remove = (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return axios
    .delete(`${baseUrl}/${id}`, config)
    .then((res) => res.data)
}

export default { getAll, create, setToken, update, remove }
