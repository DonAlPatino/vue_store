<script lang="ts">
  import { useSettingsStore } from './stores/settings'
  import SettingsForm from './components/SettingsForm.vue'
</script>
<script setup lang="ts">
  const settingsStore = useSettingsStore()
</script>
<template>
  <div :class="settingsStore.theme" class="envelope">
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