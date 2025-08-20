import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  // console.log('login lähettää terveiset', credentials)
  const response = await axios.post(baseUrl, credentials)
  console.log(response.data, 'logintesti')
  return response.data
}

export default { login }
