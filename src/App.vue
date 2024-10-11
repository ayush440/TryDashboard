<template>
  <div class="app-container">
    <Sidebar />
    <div class="main-content">
      <Header />
      <RouterView/>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import { RouterView } from 'vue-router';
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