<template>
  <div class="not-found">
    <h1>404 - 页面未找到</h1>
    <p>你访问的页面不存在。</p>
    <a href="/">返回主页</a>
  </div>
</template>

<script setup>
// 这里可以添加额外的逻辑
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
}

h1 {
  font-size: 36px;
  color: #333;
}

p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

a {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
}

a:hover {
  background-color: #0056b3;
}
</style>
