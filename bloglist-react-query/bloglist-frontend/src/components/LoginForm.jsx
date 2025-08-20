// src/components/LoginForm.jsx
import { useState } from 'react'
import { useUser } from '../contexts/UserContext'
import loginService from '../services/login'
import { useNotification } from './NotificationContext'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { dispatch: userDispatch } = useUser()
  const { showNotification } = useNotification()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      userDispatch({ type: 'LOGIN', payload: user })
      showNotification({
        message: `${username} logged in succesfully`,
        type: 'success'
      })
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Wrong credentials', error)
      showNotification({
        message: 'wrong credentials!',
        type: 'error'
      })
    }
  }

  return (
    <div className="login-form-container">
      <h3>Login</h3>
      <form onSubmit={handleLogin} className="login-form">
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={({ target }) =>
              setUsername(target.value)
            }
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={({ target }) =>
              setPassword(target.value)
            }
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
