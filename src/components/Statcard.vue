<template>
  <div class="bg-white rounded-lg p-6 -pr-4 shadow-sm ">
    <div class="flex items-start flex-col">
      <div class="bg-indigo-100 rounded-full p-3 mr-4">
        <component :is="iconComponent" class="w-6 h-6 text-indigo-600" />
      </div>
      <div>
        <h3 class="text-3xl font-bold text-gray-900 mt-6">{{ value }}</h3>
        <p class="text-sm text-gray-500 mt-1 w-full">{{ title }}</p>
        <span :class="{ 'text-green-500': isPositive, 'text-red-500': !isPositive }" class="text-sm font-medium ">
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