import { defineStore } from 'pinia'

export const usePositionsStore = defineStore('positions', {
  state: () => ({
    positions: [
      { name: 'Super Hero Strategy', value: '17', action: 'Buy', time: '02:32AM' },
      { name: 'Super Hero Strategy', value: '17', action: 'Buy', time: '02:32AM' },
      { name: 'Super Hero Strategy', value: '17', action: 'Buy', time: '02:32AM' },
      { name: 'Broker Angel-A423683', buyPrice: '₹543.56', sellPrice: '₹643.56', action: 'Square off' },
      { name: 'Super Hero Strategy', value: '17', action: 'Buy', time: '02:32AM' },
    ]
  }),
  actions: {
    async fetchPositions() {
      // In a real application, you would fetch data from an API here
      // For now, we'll just use the initial state
      // this.positions = await fetch('/api/positions').then(res => res.json())
    },
    addPosition(position) {
      this.positions.push(position)
    },
    updatePosition(index, updatedPosition) {
      this.positions[index] = { ...this.positions[index], ...updatedPosition }
    },
    deletePosition(index) {
      this.positions.splice(index, 1)
    }
  }
})