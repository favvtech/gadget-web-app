import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../config/firebase'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: true,
      
      setUser: (user) => set({ user, loading: false }),
      
      signIn: async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          set({ user: userCredential.user, loading: false })
          return { success: true }
        } catch (error) {
          set({ loading: false })
          return { success: false, error: error.message }
        }
      },
      
      signUp: async (email, password) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          set({ user: userCredential.user, loading: false })
          return { success: true }
        } catch (error) {
          set({ loading: false })
          return { success: false, error: error.message }
        }
      },
      
      logout: async () => {
        try {
          await signOut(auth)
          set({ user: null })
          return { success: true }
        } catch (error) {
          return { success: false, error: error.message }
        }
      },
      
      initAuth: () => {
        onAuthStateChanged(auth, (user) => {
          set({ user, loading: false })
        })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
)

export default useAuthStore
