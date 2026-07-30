import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/store/slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

// derived FROM the real store above, not hand-written — stays correct
// automatically if more slices get added later. See NOTES.md section 86.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
