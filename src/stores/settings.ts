import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('counter', () => {
  const theme = ref('light')

  return { theme }
})