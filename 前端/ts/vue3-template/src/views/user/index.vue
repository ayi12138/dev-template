<template>
    <div class="user-container">
        <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户名称" prop="name">
        <el-input
          placeholder="请输入用户名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
    
    </el-form>

    <!-- 业务按钮 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"

        >
        导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="false" :data="data.tableData" height="calc(100vh - 300px)" @selection-change="handleSelectionChange" :header-cell-style="{color: '#333'}">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户id" align="center" prop="id" />
      <el-table-column label="用户名称" align="center" prop="name" />
      <el-table-column label="用户电话" align="center" prop="phone">
      </el-table-column>
      <el-table-column label="用户邮箱" align="center" prop="email" />
      <el-table-column label="用户角色" align="center" prop="role" />
      
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate()" v-hasPermi="['course:course:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete()" v-hasPermi="['course:course:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-sizes="[100, 200, 300, 400]"

      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      
      />

    </div>
</template>
  
<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { onMounted } from 'vue'
const userList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const single = ref(true);
const multiple = ref(true);
const data = reactive({
  tableData: [
    {
      id: 1,
      name: '张三',
      phone: '12345678901',
      email: 'zhangsan@163.com',
      role: '管理员'
    },
    {
      id: 2,
      name: '李四',
      phone: '12345678902',
      email: 'lisi@163.com',
      role: '用户'

    },
    {
      id: 3,
      name: '王五',
      phone: '12345678903',
      email: 'wangwu@163.com',
      role: '管理员'
    },
    {
      id: 2,
      name: '李四',
      phone: '12345678902',
      email: 'lisi@163.com',
      role: '用户'

    },
    {
      id: 2,
      name: '李四',
      phone: '12345678902',
      email: 'lisi@163.com',
      role: '用户'

    },
    {
      id: 2,
      name: '李四',
      phone: '12345678902',
      email: 'lisi@163.com',
      role: '用户'

    },
    {
      id: 2,
      name: '李四',
      phone: '12345678902',
      email: 'lisi@163.com',
      role: '用户'

    },
    {
      id: 2,
      name: '李四',
      phone: '12345678902',
      email: 'lisi@163.com',
      role: '用户'

    },
    {
      id: 2,
      name: '李四',
      phone: '12345678902',
      email: 'lisi@163.com',
      role: '用户'

    },
    {
      id: 2,
      name: '李四',
      phone: '12345678902',
      email: 'lisi@163.com',
      role: '用户'

    },
    {
      id: 2,
      name: '李四',
      phone: '12345678902',
      email: 'lisi@163.com',
      role: '用户'

    },
    {
      id: 2,
      name: '李四',
      phone: '12345678902',
      email: 'lisi@163.com',
      role: '用户'

    },
    {
      id: 2,
      name: '李四',
      phone: '12345678902',
      email: 'lisi@163.com',
      role: '用户'

    },
  ],
form: {},
queryParams: {
  pageNum: 1,
  pageSize: 10
  
},
rules: {
  
}
});
const { queryParams, form, rules } = toRefs(data);
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
}
// 多选框选中数据
function handleSelectionChange() {
  
}
/** 修改按钮操作 */
function handleUpdate() {
  
}
/** 删除按钮操作 */
function handleDelete() {
  
}
</script>
  
<style scoped>
  .el-table--fit {
    margin: 25px 0;
  }
  .el-pagination {
    justify-content: flex-end;
  }
</style>