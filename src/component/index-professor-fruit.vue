<!--
-- @author Santa Antilles
-- @description 首页学者论文条目单项
-- @date 2024/4/26-13:23:13
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
    <el-card class="index-professor-fruit" shadow="hover" >
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center;">
<!--          <el-icon size="110px"><Document /></el-icon>-->
          <div style="display: flex; flex-direction: column; align-items: flex-start; width: inherit;">
            <el-link :underline="false"  :href="props.link" class="fruit-title">{{props.title}}</el-link>
            <span class="fruit-tag">{{props.author}}</span>
            <span style="color: darkgray" class="fruit-tag">{{props.publisher}}</span>
          </div>
        </div>
      </div>
    </el-card>
  </router-link>
</template>

<style scoped lang="scss">
.fruit-title{
  margin-top: .5rem;
  margin-bottom: .5rem;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: mono-courier-new, alibaba-inclusive;
}

.fruit-tag{
  display: block;
  margin-top: .5rem;
  margin-bottom: .5rem;
  font-size: 1.2rem;
  font-family: mono-courier-new, alibaba-inclusive;
}


.index-professor-fruit{
  border-radius: 20px;
  margin: 10px 0;
}
.index-professor-fruit:first-child{
  margin-top: 20px;
}
.index-professor-fruit:last-child{
  margin-bottom: 20px;
}
</style>