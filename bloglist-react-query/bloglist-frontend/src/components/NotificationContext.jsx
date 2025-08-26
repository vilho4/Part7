import React, {
  createContext,
  useReducer,
  useContext,
  useRef
} from 'react'

const NotificationContext = createContext()

const initialState = ''

const notificationReducer = (state, action) => {
  // console.log('notificationcontextin action', action)
  // console.log('notificationcontextin state', state)
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
  const timeoutRef = useRef(null)

  const showNotification = (payload, seconds = 5) => {
    // Clear previous timeout if a new notification is shown before it disappears
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    dispatch({ type: 'SHOW_NOTIFICATION', payload })

    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, seconds * 1000)
  }

  return (
    <NotificationContext.Provider
      value={{
        notification: state,
        dispatch,
        showNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  return useContext(NotificationContext)
}
