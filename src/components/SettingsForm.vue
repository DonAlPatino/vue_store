<script lang="ts">
  import type { Theme } from '../types/Theme.js'

  // Добавляем импорт базы данных
  import { sdb } from '../db'
</script>
<script setup lang="ts">
  // Добавляем async
  const changeTheme = async (theme?: Theme) => {
    // Добавим запись темы в базу данных
    await sdb.settings.update(1, { theme })
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