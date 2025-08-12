// src/components/LoginForm.jsx
import { useState } from 'react'
import { useUser } from '../contexts/UserContext'
import loginService from '../services/login'
import { useNotification } from './NotificationContext'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { dispatch: userDispatch } = useUser()
  const { dispatch: notificationDispatch } =
    useNotification()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      userDispatch({ type: 'LOGIN', payload: user })
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Wrong credentials', error)
      notificationDispatch({
        type: 'SHOW_NOTIFICATION',
        payload: 'Wrong credentials'
      })
      setTimeout(() => {
        notificationDispatch({ type: 'HIDE_NOTIFICATION' })
      }, 3000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={({ target }) =>
            setUsername(target.value)
          }
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) =>
            setPassword(target.value)
          }
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}
