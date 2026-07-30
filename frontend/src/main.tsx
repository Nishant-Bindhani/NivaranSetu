import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { store } from '@/store/store'
import { queryClient } from '@/shared/lib/queryClient'
import './i18n/config'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Provider makes the Redux store reachable by any component via
        useSelector/useDispatch, without passing it down as props.
        QueryClientProvider does the same for TanStack Query's server-state
        caching (used by useLogin/useRegister's mutation hooks). */}
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
