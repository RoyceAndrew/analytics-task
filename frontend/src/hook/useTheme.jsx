import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useTheme = create()(
  persist(
    (set, _get) => ({
      theme: 'light',
      language: 'en',
      changeLanguage: () => set(state => ({ language: state.language === 'en' ? 'id' : 'en' })),
      changeTheme: () => set(state => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'theme', 
      storage: createJSONStorage(() => localStorage),
    },
  ),
)