<script setup>
import { RouterView } from 'vue-router'
import Header from './shared/ui/widgets/Header.vue'
</script>

<template>
  <div class="main">
    <Header></Header>
    <RouterView />
  </div>
</template>

<style scoped>
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
