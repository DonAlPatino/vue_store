<script lang="ts">
  // Заменяем
  // import { useSettingsStore } from '../stores/settings' // — Добавляем
  // На
  // Для реактивной работы с LocalStorage нам потребуется функция useStorage из пакета @vueuse/core
  import { useStorage } from '@vueuse/core' // — Добавляем
  import type { Theme } from '../types/Theme.js'
</script>
<script setup lang="ts">
  // Заменяем
  // const settingsStore = useSettingsStore()
  // На
  const state = useStorage('settings-storage', { theme: 'light'}) // Добавляем State в LocalStorage

  const changeTheme = (theme?: Theme) => {
    // Заменяем
    // settingsStore.theme = theme
    // На
    state.value.theme = theme || 'light'
  }
</script>

<template>
  <div class="settings-envelope">
    <div class="switch-envelope">
      <div>Тема:</div>
      <div class="theme-button" @click="changeTheme('dark')">тёмная</div>
      <div class="theme-button" @click="changeTheme('light')">светлая</div>
    </div>
  </div>
</template>
<style scoped>
  .settings-envelope {
    padding-top: 30px;
    padding-left: 20px;
    display: flex;
    gap: 20px;
    font-weight: bold;
  }
  .switch-envelope {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .theme-button {
    cursor: pointer;
    padding: 4px;
    font-weight: bold;
    border: 2px solid #808080;
    border-radius: 6px;
  }
</style>