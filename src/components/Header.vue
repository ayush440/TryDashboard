<template>
  <header class="header">
    <h1>Hello {{ userName }} 👋</h1>
    <div class="mode-toggle">
      <button :class="{ active: mode === 'Paper' }" @click="setMode('Paper')">Paper</button>
      <button :class="{ active: mode === 'Live' }" @click="setMode('Live')">Live</button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const userName = ref('Roshni')
const mode = ref('Paper')

const setMode = (newMode) => {
  mode.value = newMode
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
}

.mode-toggle {
  display: flex;
  background-color: #f3f4f6;
  border-radius: 20px;
  overflow: hidden;
}

.mode-toggle button {
  padding: 8px 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.mode-toggle button.active {
  background-color: #5D5FEF;
  color: white;
}
</style>