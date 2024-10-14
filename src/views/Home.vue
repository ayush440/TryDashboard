<template>
  <div class="home">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow p-6 mt-5">
        <h2 class="text-xl font-semibold mb-4">Today's profit</h2>
        <DonutChart :data="profitData" />
      </div>
      <div class="bg-white rounded-lg shadow p-6 mt-5">
        <h2 class="text-xl font-semibold mb-2">Today's Sales</h2>
        <p class="text-gray-500 mb-4">Sales Summary</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            class="border-2"
            title="Total profit"
            value="₹1k"
            change="+8% from yesterday"
            icon="TrendingUp"
          />
          <StatCard
            class="border-2"
            title="Strategy deployed"
            value="32"
            change="+4% from yesterday"
            icon="Zap"
          />
          <StatCard
            class="border-2"
            title="Total orders"
            value="53"
            change="+3% from yesterday"
            icon="ShoppingCart"
          />
        </div>
      </div>
    </div>
    <div class="mt-6 bg-white rounded-lg shadow">
      <PositionsTable :positions="positions" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DonutChart from '../components/DonutChart.vue'
import StatCard from '../../src/components/Statcard.vue'
import PositionsTable from '../components/PositionsTable.vue'

const profitData = ref([
  { name: 'Strategy name', value: 25, color: '#FF6384' },
  { name: 'Strategy name', value: 25, color: '#36A2EB' },
  { name: 'Strategy name', value: 30, color: '#FFCE56' },
  { name: 'Strategy name', value: 20, color: '#4BC0C0' },
])

const positions = ref([
  { name: 'Super Hero Strategy', value: '17', action: 'Buy', time: '02:32AM' },
  { name: 'Super Hero Strategy', value: '17', action: 'Buy', time: '02:32AM' },
  { name: 'Super Hero Strategy', value: '17', action: 'Buy', time: '02:32AM' },
  { name: 'Broker Angel-A423683', buyPrice: '₹543.56', sellPrice: '₹643.56', action: 'Square off' },
  { name: 'Super Hero Strategy', value: '17', action: 'Buy', time: '02:32AM' },
])
</script>