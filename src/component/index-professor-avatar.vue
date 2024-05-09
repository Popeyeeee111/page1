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
    <el-card style="border-radius: 20px">
      <el-avatar :src="props.avatar" style="width: 100px; height: 100px"/>
      <p style="font-weight: bold" class="professor-introduction">{{props.name}}</p>
      <p class="professor-introduction">{{props.introduction}}</p>
    </el-card>
  </router-link>
</template>

<style scoped lang="scss">
.professor-introduction{
  font-size: 1.2rem;
  font-family: mono-courier-new, alibaba-inclusive;
}
</style>