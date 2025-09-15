import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () =>
  axios.get(baseUrl).then((res) => {
    // console.log(res.data)
    return res.data
  })

export default { getAll }
