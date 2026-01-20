import { create } from 'zustand'

const useUIStore = create((set) => ({
  searchExpanded: false,
  mobileMenuOpen: false,
  profileDropdownOpen: false,
  
  toggleSearch: () => set((state) => ({ searchExpanded: !state.searchExpanded })),
  closeSearch: () => set({ searchExpanded: false }),
  
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  
  toggleProfileDropdown: () => set((state) => ({ profileDropdownOpen: !state.profileDropdownOpen })),
  closeProfileDropdown: () => set({ profileDropdownOpen: false })
}))

export default useUIStore
