<template>
  <div>
    <h1 align="center">仓储物资管理</h1>
    <div>
      <h2 align="center">添加新物资</h2>
      <el-form @submit.prevent="addNewMaterial" class="material-form" :model="newMaterial">
        <el-form-item label="物资名称">
          <el-input v-model="newMaterial.name" placeholder="物资名称" required class="small-input" size="large" />
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="newMaterial.category_id" placeholder="请选择类别" required class="small-input" size="large">
            <el-option v-for="category in categories" :key="category" :label="category" :value="category" />
          </el-select>
        </el-form-item>
        <el-form-item label="库房">
          <el-select v-model="newMaterial.warehouse_id" placeholder="请选择所属库房" required class="small-input" size="large">
            <el-option v-for="warehouse in availablePoints" :key="warehouse" :label="warehouse" :value="warehouse" />
          </el-select>
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="newMaterial.code" placeholder="编码" required class="small-input" size="large" />
        </el-form-item>
        <el-form-item label="数量">
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
  import { useWarehouseStore } from '@/stores/column.js';
  import { usePointStore } from '@/stores/points.js';
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';

  export default {
    setup() {
      const router = useRouter();
      const warehouseStore = useWarehouseStore();
      const pointStore = usePointStore();

      const viewMaterialList = () => {
        router.push('/list');
      };

      const addNewMaterial = async () => {
        await warehouseStore.addMaterial(newMaterial.value);
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

      const categories = ref(['生活日用品', '工具', '食物', '家电']);
      const availablePoints = computed(() => pointStore.availablePoint); // 获取 availablePoint

      return {
        viewMaterialList,
        addNewMaterial,
        newMaterial,
        categories,
        availablePoints,
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