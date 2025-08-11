import React from 'react'
import { useNotification } from './NotificationContext'

const Notification = () => {
  const { notification } = useNotification()

  if (!notification) {
    return null
  }

  return (
    <div style={{ border: 'solid 1px', padding: 10, marginBottom: 10 }}>
      {notification}
    </div>
  )
}

export default Notification
