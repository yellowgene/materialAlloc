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
          <el-input-number v-model="row.quantity" :min="1" :max="100000" :disabled="!row.editable" />
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
import { useListStore } from '@/stores/column.js';
import { useCategoryStore } from '@/stores/category.js';
import { useWarehouseStore } from '@/stores/warehouse.js';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.js';

export default {
  setup() {
    const listStore = useListStore();
    const categoryStore = useCategoryStore();
    const warehouseStore = useWarehouseStore();
    const router = useRouter();
    const editingRow = ref(null);

    const materials = computed(() => listStore.materials.map(material => ({
      ...material,
      category_name: getCategoryName(material.category_id),
      warehouse_name: getWarehouseName(material.warehouse_id),
      editable: editingRow.value === material.id,
    })));

    const getCategoryName = (category_id) => {
      const category = categoryStore.categories.find(cat => cat.id === category_id);
      return category ? category.name : '未知';
    };

    const getWarehouseName = (warehouse_id) => {
      const warehouse = warehouseStore.warehouses.find(wh => wh.id === warehouse_id);
      return warehouse ? warehouse.name : '未知';
    };

    const goBack = () => {
      router.push('/warehouse');
    };

    const handleEdit = (row) => {
      if(useUserStore().getCurrentUser.role!=='boss'){
        window.alert("您不是领导，不能进行操作！")
      }else {
        editingRow.value = row.id;
      }
    };

    const handleSave = (row) => {
      listStore.updateMaterialQuantity(row.id, row.quantity);
      editingRow.value = null;
    };

    const handleDelete = (row) => {
      listStore.deleteMaterial(row.id);
    };

    return {
      materials,
      goBack,
      handleEdit,
      handleSave,
      handleDelete,
    };
  },
};
</script>

<style scoped>
.material-list-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.back-button {
  margin-top: 55px;
  border-radius: 8px;
}

h1 {
  margin-top: 0px;
  margin-bottom: 20px;
}
</style>