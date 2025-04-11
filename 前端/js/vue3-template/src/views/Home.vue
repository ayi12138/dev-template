<template>
  <div>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <br>
    <!--icon使用要注意引入House, Search,Calendar-->
    <el-icon><House /></el-icon>
    <span>Using attributes</span>
    <el-input
        v-model="input1"
        style="width: 240px"
        placeholder="Pick a date"
        :suffix-icon="Calendar"
        :prefix-icon="Search"
    />

    <el-button type="primary" icon="Search">Success</el-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { House, Calendar, Search } from "@element-plus/icons-vue";
const input1 = ref("");
</script>
