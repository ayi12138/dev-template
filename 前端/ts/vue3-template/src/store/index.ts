import { defineStore } from 'pinia'

export interface AppState {
  theme: string
  language: string
  isCollapse: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    theme: 'light',
    language: 'zh-CN',
    isCollapse: false
  }),
  
  getters: {
    currentTheme: (state) => state.theme,
    currentLanguage: (state) => state.language
  },
  
  actions: {
    setTheme(theme: string) {
      this.theme = theme
    },
    setLanguage(language: string) {
      this.language = language
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
})

// 导出 store 类型
export type AppStore = ReturnType<typeof useAppStore> 