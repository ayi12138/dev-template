<template>
  <el-container class="layout-container">
    <el-scrollbar style="background-color: #304156;">
      <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
        <div class="logo">
          <img src="@/assets/logo.svg" alt="logo" />
          <span v-show="!isCollapse">后台管理系统</span>
        </div>
        <el-menu 
        default-active="2" 
        class="el-menu-vertical-demo" 
        :collapse="isCollapse"
        style="border-right: none;"
        >
          <el-menu-item index="1">
            <el-icon><Histogram /></el-icon>
            <template #title>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><HomeFilled /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
              <template #title>item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="3">
            <el-icon><Menu /></el-icon>
            <template #title>
              <span>Navigator Two</span>
            </template>
          </el-menu-item>
          
          <el-menu-item index="4">
            <el-icon><Tools /></el-icon>
            <template #title>
              <span>Navigator Four</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
    </el-scrollbar>
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <el-button @click="toggleCollapse">
            <el-icon>
              <Fold v-if="!isCollapse" />
              <Expand v-else />
            </el-icon>
          </el-button>
          <el-input v-model="searchKeyword" placeholder="搜索..." prefix-icon="Search" class="search-input" />
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="32" />
              <span class="username">Admin</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <el-breadcrumb class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>当前页面</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { HomeFilled, Fold, Expand, Tools, Histogram, Menu } from '@element-plus/icons-vue'
import { useAppStore } from '@/store'

const route = useRoute()
const store = useAppStore()
const searchKeyword = ref('')

const isCollapse = computed(() => store.isCollapse)
const toggleCollapse = () => store.toggleCollapse()
</script>

<style scoped>
/* 设置整个布局容器的高度为视口高度 */
.layout-container {
  height: 100vh;
}

/* 设置侧边栏的过渡效果、背景颜色、溢出隐藏和禁止换行 */
.aside {
  transition: all 0.8s; /* 平滑过渡效果 */
  background-color: #304156; /* 背景颜色 */
  overflow: hidden; /* 隐藏溢出内容 */
  white-space: nowrap; /* 禁止文本换行 */
}

/* 防止 el-sub-menu 的背景色继承 */
:deep(.el-menu .el-menu-item.is-active) {
  background-color: #4093e6; /* 激活菜单项的背景颜色 */
  color: #304156; /* 激活菜单项的文字颜色 */
}

/* 防止折叠状态下 el-sub-menu 的标题背景色继承 */
:deep(.el-menu--collapse .el-sub-menu.is-active .el-sub-menu__title) {
  color: #304156; /* 折叠状态下激活子菜单标题的文字颜色 */
  background-color: #4093e6; /* 折叠状态下激活子菜单标题的背景颜色 */
}

/* 设置菜单项悬停时的背景颜色 */
.el-menu-item:hover {
  background-color: #4093e6; /* 悬停时的背景颜色 */
}

/* 设置菜单、子菜单和菜单项的默认背景颜色和文字颜色 */
.el-menu,
.el-sub-menu,
.el-menu-item {
  background-color: #304156; /* 背景颜色 */
  color: white; /* 文字颜色 */
}

/* 设置下拉菜单标题的文字颜色 */
:deep(.el-sub-menu__title) {
  color: #ffffff; /* 文字颜色 */
}

/* 设置下拉菜单标题悬停时的背景颜色 */
:deep(.el-sub-menu__title:hover) {
  background-color: #4093e6; /* 悬停时的背景颜色 */
}

/* 设置 logo 的样式 */
.logo {
  height: 60px; /* 高度 */
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中对齐 */
  padding: 0 20px; /* 内边距 */
  color: white; /* 文字颜色 */
}

/* 设置 logo 图片的样式 */
.logo img {
  width: 32px; /* 宽度 */
  height: 32px; /* 高度 */
  margin-right: 12px; /* 右边距 */
}

/* 设置头部的样式 */
.header {
  background-color: white; /* 背景颜色 */
  border-bottom: 1px solid #dcdfe6; /* 底部边框 */
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: space-between; /* 左右两端对齐 */
  padding: 0 20px; /* 内边距 */
}

/* 设置头部左侧的样式 */
.header-left {
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 20px; /* 子元素之间的间距 */
}

/* 设置搜索输入框的宽度 */
.search-input {
  width: 200px; /* 宽度 */
}

/* 设置用户信息的样式 */
.user-info {
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 8px; /* 子元素之间的间距 */
  cursor: pointer; /* 鼠标悬停时显示为指针 */
}

/* 设置面包屑导航的底部外边距 */
.breadcrumb {
  margin-bottom: 20px; /* 底部外边距 */
}
</style>