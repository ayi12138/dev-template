<template>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li v-for="(route, index) in breadcrumbs" :key="index" class="breadcrumb-item">
          <router-link :to="route.path">{{ route.name }}</router-link>
        </li>
      </ol>
    </nav>
  </template>
   
  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  const route = useRoute();
  const breadcrumbs = computed(() => {
    return route.matched.map(route => ({
      name: route.name,
      path: route.path,
    }));
  });
  </script>

<style scoped>
.breadcrumb {
  list-style: none;
  padding: 0;
}
.breadcrumb-item {
  display: inline; /* 或者使用 flexbox 等布局 */
}
.breadcrumb-item + .breadcrumb-item::before {
  content: " > "; /* 使用箭头或其他分隔符 */
}
</style>

