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

/*
 * A lazy-loaded chunk (e.g. MapShowcase) can 404 if this visitor's browser
 * is holding an OLD index.html while a newer deploy has already replaced
 * the hashed asset files — the old chunk filename no longer exists. Vite
 * fires this exact event when that happens. One automatic reload fetches
 * the current index.html/chunks and fixes it; the sessionStorage guard
 * stops a genuinely broken deploy from reload-looping forever.
 */
window.addEventListener('vite:preloadError', () => {
  const key = 'nivaransetu-reloaded-after-chunk-error'
  if (!sessionStorage.getItem(key)) {
    sessionStorage.setItem(key, '1')
    window.location.reload()
  }
})

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
