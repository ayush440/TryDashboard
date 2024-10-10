<template>
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr class="bg-gray-50 text-left">
            <th class="py-3 px-4 font-semibold text-gray-600">STRATEGY NAME</th>
            <th class="py-3 px-4 font-semibold text-gray-600">STRATEGY NAME</th>
            <th class="py-3 px-4 font-semibold text-gray-600">STRATEGY NAME</th>
            <th class="py-3 px-4 font-semibold text-gray-600">STRATEGY NAME</th>
            <th class="py-3 px-4 font-semibold text-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(position, index) in positions" :key="index" class="border-b">
            <td class="py-3 px-4">{{ position.name }}</td>
            <td class="py-3 px-4">{{ position.value || position.buyPrice }}</td>
            <td class="py-3 px-4">{{ position.action }}</td>
            <td class="py-3 px-4">{{ position.time || position.sellPrice }}</td>
            <td class="py-3 px-4">
              <button v-if="position.action === 'Square off'" class="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
                Square off
              </button>
              <button v-else class="text-gray-400">
                <component :is="ChevronRight" class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ChevronRight } from 'lucide-vue-next'
  
  defineProps({
    positions: {
      type: Array,
      required: true
    }
  })
  </script>