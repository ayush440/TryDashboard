<template>
    <div class="broker-page p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Brokers</h1>
        <button @click="openAddBrokerModal" class="bg-[#5847f7] text-white px-4 py-2 rounded-lg hover:bg-[#4c3ed3] transition-colors duration-300">
          Add New Broker
        </button>
      </div>
      <p class="mb-4">{{ brokers.length }} Brokers Connected</p>
      
      <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="py-3 px-4 text-left">Broker</th>
              <th class="py-3 px-4 text-left">Broker UserId</th>
              <th class="py-3 px-4 text-left">Token Date</th>
              <th class="py-3 px-4 text-left">Active</th>
              <th class="py-3 px-4 text-left">Connect</th>
              <th class="py-3 px-4 text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="broker in brokers" :key="broker.id" class="border-b">
              <td class="py-3 px-4">
                <div class="flex items-center">
                  <img :src="getBrokerIcon(broker.name)" class="w-6 h-6 mr-2" :alt="broker.name" />
                  {{ broker.name }}
                </div>
              </td>
              <td class="py-3 px-4">{{ broker.userId }}</td>
              <td class="py-3 px-4">{{ broker.tokenDate }}</td>
              <td class="py-3 px-4">
                <label class="switch">
                  <input type="checkbox" v-model="broker.active" @change="toggleActive(broker)">
                  <span class="slider round"></span>
                </label>
              </td>
              <td class="py-3 px-4">
                <button @click="connectBroker(broker)" class="text-[#5847f7] hover:underline">Connect</button>
              </td>
              <td class="py-3 px-4">
                <button @click="editBroker(broker)" class="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                <button @click="openOrdersPositionsModal(broker)" class="text-green-600 hover:text-green-800 mr-2">Orders/Positions</button>
                <button @click="deleteBroker(broker.id)" class="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Add/Edit Broker Modal -->
      <Modal v-if="showBrokerModal" @close="closeBrokerModal">
        <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit' : 'Add' }} Broker Info</h2>
        <form @submit.prevent="submitBrokerForm">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Select Broker*</label>
              <select v-model="brokerForm.name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="">Select a broker</option>
                <option value="Angel">Angel</option>
                <option value="Zerodha">Zerodha</option>
                <!-- Add more broker options as needed -->
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Broker User Id*</label>
              <input v-model="brokerForm.userId" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Broker Pin*</label>
              <input v-model="brokerForm.pin" type="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Broker Qr Key*</label>
              <input v-model="brokerForm.qrKey" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Broker Api*</label>
              <input v-model="brokerForm.api" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Broker Api Secret*</label>
              <input v-model="brokerForm.apiSecret" type="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Broker Password*</label>
              <input v-model="brokerForm.password" type="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
            </div>
            <div class="flex items-center">
              <label class="block text-sm font-medium text-gray-700 mr-2">Account Active</label>
              <label class="switch">
                <input type="checkbox" v-model="brokerForm.active">
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button type="submit" class="bg-[#5847f7] text-white px-4 py-2 rounded-lg hover:bg-[#4c3ed3] transition-colors duration-300">Submit</button>
            <button @click="closeBrokerModal" type="button" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-300">Close</button>
          </div>
        </form>
      </Modal>
  
      <!-- Orders/Positions Modal -->
      <Modal v-if="showOrdersPositionsModal" @close="closeOrdersPositionsModal">
        <h2 class="text-xl font-bold mb-4">{{ selectedBroker.name }} ({{ activeTab }})</h2>
        <div class="flex mb-4">
          <button @click="activeTab = 'Orders'" :class="{ 'bg-[#5847f7] text-white': activeTab === 'Orders', 'bg-gray-200': activeTab !== 'Orders' }" class="px-4 py-2 rounded-l-lg">Orders</button>
          <button @click="activeTab = 'Positions'" :class="{ 'bg-[#5847f7] text-white': activeTab === 'Positions', 'bg-gray-200': activeTab !== 'Positions' }" class="px-4 py-2 rounded-r-lg">Positions</button>
        </div>
        <div v-if="activeTab === 'Orders'" class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="py-2 px-4 text-left">TIME</th>
                <th class="py-2 px-4 text-left">TICKER</th>
                <th class="py-2 px-4 text-left">SIDE</th>
                <th class="py-2 px-4 text-left">ORDER TYPE</th>
                <th class="py-2 px-4 text-left">PRICE</th>
                <th class="py-2 px-4 text-left">AVG PRICE</th>
                <th class="py-2 px-4 text-left">QTY</th>
                <th class="py-2 px-4 text-left">STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="orders.length === 0">
                <td colspan="8" class="py-4 text-center">No orders</td>
              </tr>
              <tr v-for="order in orders" :key="order.id" class="border-b">
                <td class="py-2 px-4">{{ order.time }}</td>
                <td class="py-2 px-4">{{ order.ticker }}</td>
                <td class="py-2 px-4">{{ order.side }}</td>
                <td class="py-2 px-4">{{ order.orderType }}</td>
                <td class="py-2 px-4">{{ order.price }}</td>
                <td class="py-2 px-4">{{ order.avgPrice }}</td>
                <td class="py-2 px-4">{{ order.qty }}</td>
                <td class="py-2 px-4">{{ order.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else-if="activeTab === 'Positions'" class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="py-2 px-4 text-left">SYMBOL</th>
                <th class="py-2 px-4 text-left">QTY</th>
                <th class="py-2 px-4 text-left">AVG. PRICE</th>
                <th class="py-2 px-4 text-left">LTP</th>
                <th class="py-2 px-4 text-left">P&L</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="positions.length === 0">
                <td colspan="5" class="py-4 text-center">No positions</td>
              </tr>
              <tr v-for="position in positions" :key="position.id" class="border-b">
                <td class="py-2 px-4">{{ position.symbol }}</td>
                <td class="py-2 px-4">{{ position.qty }}</td>
                <td class="py-2 px-4">{{ position.avgPrice }}</td>
                <td class="py-2 px-4">{{ position.ltp }}</td>
                <td class="py-2 px-4">{{ position.pnl }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed } from 'vue'
  import Modal from './Modal.vue'
  import { useBrokerStore } from '../stores/broker'
  
  const brokerStore = useBrokerStore()
  const brokers = computed(() => brokerStore.getBrokers)
  
  const showBrokerModal = ref(false)
  const isEditing = ref(false)
  const brokerForm = reactive({
    name: '',
    userId: '',
    pin: '',
    qrKey: '',
    api: '',
    apiSecret: '',
    password: '',
    active: false
  })
  
  const showOrdersPositionsModal = ref(false)
  const selectedBroker = ref({})
  const activeTab = ref('Orders')
  const orders = computed(() => brokerStore.getOrders(selectedBroker.value.id))
  const positions = computed(() => brokerStore.getPositions(selectedBroker.value.id))
  
  const openAddBrokerModal = () => {
    isEditing.value = false
    Object.assign(brokerForm, {
      name: '',
      userId: '',
      pin: '',
      qrKey: '',
      api: '',
      apiSecret: '',
      password: '',
      active: false
    })
    showBrokerModal.value = true
  }
  
  const openEditBrokerModal = (broker) => {
    isEditing.value = true
    Object.assign(brokerForm, broker)
    showBrokerModal.value = true
  }
  
  const closeBrokerModal = () => {
    showBrokerModal.value = false
  }
  
  const submitBrokerForm = () => {
    if (isEditing.value) {
      brokerStore.updateBroker(brokerForm.id, brokerForm)
    } else {
      brokerStore.addBroker(brokerForm)
    }
    closeBrokerModal()
  }
  
  const toggleActive = (broker) => {
    brokerStore.toggleBrokerActive(broker.id)
  }
  
  const connectBroker = (broker) => {
    // Implement broker connection logic
    console.log('Connecting to broker:', broker.name)
  }
  
  const editBroker = (broker) => {
    openEditBrokerModal(broker)
  }
  
  const deleteBroker = (brokerId) => {
    if (confirm('Are you sure you want to delete this broker?')) {
      brokerStore.deleteBroker(brokerId)
    }
  }
  
  const openOrdersPositionsModal = (broker) => {
    selectedBroker.value = broker
    showOrdersPositionsModal.value = true
    // Fetch orders and positions data for the selected broker
    // For now, we'll use dummy data
  
  }
  
  const closeOrdersPositionsModal = () => {
    showOrdersPositionsModal.value = false
  }
  
  const getBrokerIcon = (brokerName) => {
    // You can implement a function to return the appropriate icon URL based on the broker name
    return `/images/brokers/${brokerName.toLowerCase()}.svg`
  }
  </script>
  
  <style scoped>
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
  }
  
  input:checked + .slider {
    background-color: #5847f7;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
  
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
  </style>