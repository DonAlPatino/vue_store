<script lang="ts">
  import { useSettingsStore } from '../stores/settings' // — Добавляем
  import type { Theme } from '../types/Theme.js'
</script>
<script setup lang="ts">
  const settingsStore = useSettingsStore()

  const changeTheme = (theme?: Theme) => {
    settingsStore.theme = theme || 'light'
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