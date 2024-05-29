<template>
    <div class="material-list-container">
      <h1 align="center">物资列表</h1>
      <el-table :data="materials" height="650" style="width: 100%" align="center" stripe>
        <el-table-column prop="name" label="物资名称" width="200" header-align="center" align="center" />
        <el-table-column prop="category_name" label="类别" width="200" header-align="center" align="center" />
        <el-table-column prop="warehouse_name" label="所属库房" width="200" header-align="center" align="center" />
        <el-table-column prop="code" label="编码" width="200" header-align="center" align="center" />
        <el-table-column prop="quantity" label="数量" width="200" header-align="center" align="center">
          <template #default="{row}">
            <el-input-number v-model="row.quantity" :min="1" :max="9999" :disabled="!row.editable" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" header-align="center" align="center">
          <template #default="{row}">
            <el-button v-if="!row.editable" type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button v-else type="text" @click="handleSave(row)">保存</el-button>
            <el-button type="text" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="goBack" class="back-button">返回</el-button>
    </div>
  </template>
  
  <script>
  import { useWarehouseStore } from '@/stores/column.js';
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const store = useWarehouseStore();
      const router = useRouter();
      const editingRow = ref(null);
  
      const materials = computed(() => store.materials.map(material => ({
        ...material,
        category_name: getCategoryName(material.category_id),
        warehouse_name: getWarehouseName(material.warehouse_id),
        editable: editingRow.value === material.id, // 添加 editable 字段来标记当前是否处于编辑状态
      })));
  
      const getCategoryName = (category_id) => {
        const category = store.categories.find(cat => cat.id === category_id);
        return category ? category.name : '未知';
      };
  
      const getWarehouseName = (warehouse_id) => {
        const warehouse = store.warehouses.find(wh => wh.id === warehouse_id);
        return warehouse ? warehouse.name : '未知';
      };
  
      const goBack = () => {
        router.push('/warehouse');
      };
  
      const handleEdit = (row) => {
        editingRow.value = row.id;
      };
  
      const handleSave = (row) => {
        //store.updateMaterialQuantity(row.id, row.quantity);
        editingRow.value = null; // 保存完后取消编辑状态
      };
  
      const handleDelete = (row) => {
        //store.deleteMaterial(row.id);
      };
  
      return {
        materials,
        goBack,
        handleEdit,
        handleSave,
        handleDelete,
      };
    },
    async created() {
      const store = useWarehouseStore();
      await store.fetchMaterials();
      await store.fetchCategories();
      await store.fetchWarehouses();
    },
  };
  </script>
  
  <style scoped>
  .material-list-container {
    padding: 20px;
  }
  
  .back-button {
    margin-top: 40px;
    border-radius: 8px;
  }
  
  h1 {
    margin-top: 0px;
    margin-bottom: 20px;
  }
  </style>
  