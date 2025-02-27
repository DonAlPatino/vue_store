<script lang="ts">
  // import { ref } from 'vue' — Удаляем
  // import type { Theme } from './types/Theme.js' — Удаляем

  // Добавляем импорт базы и функции observableQuery
  import { sdb } from './db.ts'
  import observableQuery from './helpers/observableQuery.ts'
  import SettingsForm from './components/SettingsForm.vue'
</script>
<script setup lang="ts">
  // const theme = ref('light') — Заменяем на:
  const theme = observableQuery(async () => (await sdb.settings.get(1))?.theme)
</script>
<template>
  <div :class="theme" class="envelope">
    <SettingsForm />
  </div>
</template>
<style>
  .envelope {
    width: 100%;
    height: 100vh;
  }
  .light {
    background-color: var(--color-light);
    color: var(--color-dark);
  }
  .dark {
    background-color: var(--color-dark);
    color: var(--color-light);
  }
</style>