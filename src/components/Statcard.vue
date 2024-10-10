<template>
    <div class="bg-gray-50 rounded-lg p-4">
      <div class="flex items-center">
        <div class="bg-indigo-100 rounded-full p-3 mr-4">
          <component :is="iconComponent" class="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h3 class="text-2xl font-semibold">{{ value }}</h3>
          <p class="text-gray-500">{{ title }}</p>
          <span :class="{ 'text-green-500': isPositive, 'text-red-500': !isPositive }">
            {{ change }}
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import * as LucideIcons from 'lucide-vue-next'
  
  const props = defineProps({
    title: String,
    value: String,
    change: String,
    icon: String
  })
  
  const isPositive = computed(() => props.change.includes('+'))
  const iconComponent = computed(() => LucideIcons[props.icon])
  </script>