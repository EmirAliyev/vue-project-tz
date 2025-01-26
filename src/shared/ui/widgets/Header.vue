<script setup>
const token = localStorage.getItem('token')

const navLinks = [
  { name: 'templates', label: 'Templates' },
  ...(token ? [] : [{ name: 'auth', label: 'Auth' }]),
]
</script>

<template>
  <header class="header">
    <nav class="nav">
      <router-link
        v-for="link in navLinks"
        :key="link.name"
        :to="{ name: link.name }"
        class="nav__link"
        :class="{ active: $route.name === link.name }"
      >
        {{ link.label }}
      </router-link>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 10px 20px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #ddd;

  .nav {
    display: flex;
    gap: 20px;

    .nav__link {
      text-decoration: none;
      font-size: 16px;
      font-weight: 500;
      transition: color 0.2s ease-in-out;

      &:hover {
        color: #6a0dad;
      }

      &.active {
        color: #6a0dad;
        font-weight: 600;
        padding-bottom: 2px;
        border-bottom: 2px solid #6a0dad;
      }
    }
  }
}
</style>
