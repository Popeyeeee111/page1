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
*{
  text-align: justify;
}
.fruit-title{
  margin-top: .5rem;
  margin-bottom: .5rem;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: mono-courier-new, alibaba-inclusive;
}

.fruit-tag{
  display: block;
  margin-top: .5rem;
  margin-bottom: .5rem;
  font-size: 1rem;
  font-family: mono-courier-new, alibaba-inclusive;
}
</style>