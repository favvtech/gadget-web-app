import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useWishlistStore = create(
  persist(
    (set) => ({
      items: [],
      
      addToWishlist: (product) => {
        set((state) => {
          if (state.items.find(item => item.id === product.id)) {
            return state // Already in wishlist
          }
          return {
            items: [...state.items, product]
          }
        })
      },
      
      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }))
      },
      
      isInWishlist: (productId) => {
        const state = useWishlistStore.getState()
        return state.items.some(item => item.id === productId)
      },
      
      clearWishlist: () => {
        set({ items: [] })
      }
    }),
    {
      name: 'wishlist-storage'
    }
  )
)

export default useWishlistStore
