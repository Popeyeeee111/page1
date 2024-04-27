<!--
-- @author Santa Antilles
-- @description
-- @date 2024/4/27-00:20:24
-->

<script setup>
import {Document} from "@element-plus/icons-vue";
const props = defineProps({
  id: String,
  title: String,
  author: String,
  publisher: String,
  link: String
})

</script>

<template>
  <router-link :to="{name: 'fruit', query: {fruitId: props.id}}">
    <el-card shadow="hover" style="border-radius: 20px; margin: 5px">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center;">
          <el-icon size="110px"><Document /></el-icon>
          <div style="display: flex; flex-direction: column; align-items: flex-start; width: 1000px;">
            <el-link :underline="false" :href="props.link"
                     style="margin-top: -10px;margin-left: 37px; font-size: 16px; font-weight: bold;">
              {{props.title}}
            </el-link>
            <p style="margin-top: 10px;margin-left: 37px;">{{props.author}}</p>
            <p style="margin-bottom: 10px;margin-left: 37px; font-weight: lighter; color: darkgray;">{{props.publisher}}</p>
          </div>
        </div>
      </div>
    </el-card>
  </router-link>
</template>

<style scoped lang="scss">

</style>