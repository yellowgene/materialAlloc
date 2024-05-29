import { defineStore } from 'pinia';
import axios from 'axios';

export const useWarehouseStore = defineStore('warehouse', {
  state: () => ({
    materials: [],
    categories: [],
    warehouses: [],
    transactions: [],
  }),
  actions: {
    async fetchMaterials() {
      this.materials = [
        { id: 1, name: '纸箱', category_id: 1, warehouse_id: 1, code: '0001', quantity: 50 },
        { id: 2, name: '矿泉水', category_id: 2, warehouse_id: 2, code: '0002', quantity: 600 },
      ];
    },
    async fetchCategories() {
      this.categories = [
        { id: 1, name: '生活日用品' },
        { id: 2, name: '食物' },
      ];
    },
    async fetchWarehouses() {
      this.warehouses = [
        { id: 1, name: '哈尔滨' },
        { id: 2, name: '天津' },
      ];
    },
    async fetchTransactions() {
      const response = await axios.get('/api/transactions');
      this.transactions = response.data;
    },
    async addMaterial(material) {
      material.id = this.materials.length + 1; // 简单模拟 ID 生成
      this.materials.push(material);
    },
    async updateMaterial(id, material) {
      const response = await axios.put(`/api/list/${id}`, material);
      const index = this.materials.findIndex(m => m.id === id);
      this.materials[index] = response.data;
    },
    async deleteMaterial(id) {
      await axios.delete(`/api/list/${id}`);
      this.materials = this.materials.filter(m => m.id !== id);
    },
    async addTransaction(transaction) {
      const response = await axios.post('/api/transactions', transaction);
      this.transactions.push(response.data);
    },
    // 更新物资数量
    async updateMaterialQuantity(id, quantity) {
      const material = this.materials.find(m => m.id === id);
      if (material) {
        material.quantity = quantity;
      }
    },
    // 删除物资
    async deleteMaterial(id) {
      this.materials = this.materials.filter(m => m.id !== id);
    },
  },
  getters: {
    getMaterialsByCategory: (state) => (categoryId) => {
      return state.materials.filter(material => material.category_id === categoryId);
    },
    getMaterialsByWarehouse: (state) => (warehouseId) => {
      return state.materials.filter(material => material.warehouse_id === warehouseId);
    },
  },
});