<template>
  <div>
    <h1 align="center">仓储物资管理</h1>
    <div>
      <h2 align="center">添加新物资</h2>
      <el-form @submit.prevent="addNewMaterial" class="material-form" :model="newMaterial">
        <el-form-item label="物资 :">
          <el-input v-model="newMaterial.name" placeholder="物资名称" required class="small-input" size="large" />
        </el-form-item>
        <el-form-item label="类别 :">
          <el-select v-model="newMaterial.category_id" placeholder="请选择类别" required class="small-input" size="large">
            <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="库房 :">
          <el-select v-model="newMaterial.warehouse_id" placeholder="请选择所属库房" required class="small-input" size="large">
            <el-option v-for="warehouse in warehouses" :key="warehouse.id" :label="warehouse.name" :value="warehouse.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="编码 :">
          <el-input v-model="newMaterial.code" placeholder="编码" required class="small-input" size="large" />
        </el-form-item>
        <el-form-item label="数量 :">
          <el-input-number v-model="newMaterial.quantity" :min="1" :max="100000" placeholder="数量" required class="small-input" size="large" />
        </el-form-item>
        <el-form-item class="button-group">
          <el-button type="primary" native-type="submit" class="submit-button">添加</el-button>
          <el-button type="primary" @click="viewMaterialList" class="view-button">查看物资列表</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { useListStore } from '@/stores/column.js';
  import { useCategoryStore } from '@/stores/category.js';
  import { useWarehouseStore } from '@/stores/warehouse.js';
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';

  export default {
    setup() {
      const router = useRouter();
      const listStore = useListStore();
      const categoryStore = useCategoryStore();
      const warehouseStore = useWarehouseStore();

      const viewMaterialList = () => {
        router.push('/list');
      };

      const addNewMaterial = async () => {
        await listStore.addMaterial(newMaterial.value);
        newMaterial.value = {
          name: '',
          category_id: '',
          warehouse_id: '',
          code: '',
          quantity: 1,
        };
      };

      const newMaterial = ref({
        name: '',
        category_id: '',
        warehouse_id: '',
        code: '',
        quantity: 1,
      });

      const categories = computed(() => categoryStore.categories); // 获取 categories
      const warehouses = computed(() => warehouseStore.warehouses); // 获取 availablePoint

      return {
        viewMaterialList,
        addNewMaterial,
        newMaterial,
        categories,
        warehouses,
      };
    },
  };
</script>

<style scoped>
  .material-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 500px;
    margin: 0 auto;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
  }

  .submit-button, .view-button {
    margin: 0 auto;
    width: 30%;
    padding: 18px 20px;
    border-radius: 8px;
  }
</style>