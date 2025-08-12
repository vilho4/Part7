// src/contexts/UserContext.jsx
import {
  createContext,
  useReducer,
  useContext,
  useEffect
} from 'react'
import blogService from '../services/blogs'

const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem(
        'loggedBloggappUser',
        JSON.stringify(action.payload)
      )
      blogService.setToken(action.payload.token)
      return action.payload
    case 'LOGOUT':
      localStorage.removeItem('loggedBloggappUser')
      blogService.setToken(null)
      return null
    default:
      return state
  }
}

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null)

  useEffect(() => {
    const storedUser = localStorage.getItem(
      'loggedBloggappUser'
    )
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      dispatch({ type: 'LOGIN', payload: parsedUser })
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
