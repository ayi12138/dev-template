import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'light',
    language: 'zh-CN',
    isCollapse: false
  }),
  
  getters: {
    currentTheme: (state) => state.theme,
    currentLanguage: (state) => state.language
  },
  
  actions: {
    setTheme(theme) {
      this.theme = theme
    },
    setLanguage(language) {
      this.language = language
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
})

// 导出 store 类型
export default useAppStore