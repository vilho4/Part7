import React from 'react'
import { useNotification } from './NotificationContext'

const Notification = () => {
  const { notification } = useNotification()
  // console.log(notification, 'viesti')

  if (!notification) {
    return null
  }

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  )
}

export default Notification
