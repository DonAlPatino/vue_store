<script lang="ts">
  // Заменяем
  // import { useSettingsStore } from './stores/settings'
  // на
  import { useStorage } from '@vueuse/core'
  import SettingsForm from './components/SettingsForm.vue'
</script>
<script setup lang="ts">
  // Заменяем
  // const settingsStore = useSettingsStore()
  // на
  const state = useStorage('settings-storage', { theme: 'light' })
</script>
<template>
  <!-- Заменяем -->
  <!-- <div :class="settingsStore.theme" class="envelope"> -->
  <!-- На -->
  <div :class="state.theme" class="envelope">
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