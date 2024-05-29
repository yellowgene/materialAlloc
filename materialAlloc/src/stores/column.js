import { defineStore } from 'pinia';
import axios from 'axios';

export const useListStore = defineStore('List', {
  state: () => ({
    materials: [
      { id: 1, name: '纸箱', category_id: 1, warehouse_id: 1, code: '0001', quantity: 50 },
      { id: 2, name: '矿泉水', category_id: 2, warehouse_id: 2, code: '0002', quantity: 600 },
    ],
    categories: [
      { id: 1, name: '生活日用品' },
      { id: 2, name: '食物' },
    ],
    warehouses: [
      { id: 1, name: '哈尔滨' },
      { id: 2, name: '天津' },
    ],
    transactions: [],
  }),
  actions: {
    async fetchTransactions() {
      const response = await axios.get('/api/transactions');
      this.transactions = response.data;
    },
    async addMaterial(material) {
      material.id = this.materials.length + 1; // 简单模拟 ID 生成
      this.materials.push(material);
    },
    async updateMaterial(id, material) {
      const index = this.materials.findIndex(m => m.id === id);
      if (index !== -1) {
        this.materials[index] = { ...this.materials[index], ...material };
      }
    },
    async deleteMaterial(id) {
      this.materials = this.materials.filter(m => m.id !== id);
    },
    async addTransaction(transaction) {
      const response = await axios.post('/api/transactions', transaction);
      this.transactions.push(response.data);
    },
    async updateMaterialQuantity(id, quantity) {
      const material = this.materials.find(m => m.id === id);
      if (material) {
        material.quantity = quantity;
      }
    },
  },
  getters: {
    
  },
});