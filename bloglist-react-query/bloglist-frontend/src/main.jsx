import ReactDOM from 'react-dom/client'
import App from './App'
import { UserProvider } from './contexts/UserContext'
import { NotificationProvider } from './components/NotificationContext'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </NotificationProvider>
  </QueryClientProvider>
)
