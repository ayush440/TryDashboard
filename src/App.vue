<template>

  <div class="app-container flex h-screen">
    <Sidebar />
    <div class="main-content">
      <Header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #ebf5ff;
}
</style>