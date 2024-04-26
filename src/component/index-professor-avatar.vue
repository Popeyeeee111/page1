<!--
-- @author Santa Antilles
-- @description 首页学者展示框
-- @date 2024/4/26-10:28:19
-->

<script setup>
const props = defineProps({
  id: Number,
  name: String,
  introduction: String,
  // 头像不需要加基地址
  avatar: String
})
</script>

<template>
  <router-link :to="{path:'/personal',query: {id: props.id}}">
    <el-card>
      <el-avatar
          :src="props.avatar" style="width: 100px; height: 100px"
      />
      <p style="font-weight: bold">{{props.name}}</p>
      <p>{{props.introduction}}</p>
    </el-card>
  </router-link>
</template>

<style scoped lang="scss">

</style>