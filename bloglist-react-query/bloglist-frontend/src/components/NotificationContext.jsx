import React, {
  createContext,
  useReducer,
  useContext
} from 'react'

const NotificationContext = createContext()

const initialState = ''

const notificationReducer = (state, action) => {
  console.log('mihin notifikaatio jää', action)
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.payload
    case 'HIDE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    notificationReducer,
    initialState
  )

  return (
    <NotificationContext.Provider
      value={{ notification: state, dispatch }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  return useContext(NotificationContext)
}
