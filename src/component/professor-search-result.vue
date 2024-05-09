<!--
-- @author Santa Antilles
-- @description 学者搜索界面单个组件
-- @date 2024/5/9-19:49:43
-->

<script setup>
const props = defineProps({
  id: Number,
  name: String,
  introduction: String,
  // 头像不需要加基地址
  avatar: String,
  detail: String
})
</script>

<template>
  <div class="border-wrapper">
    <router-link :to="{path:'/personal', query: {id: props.id}}">
      <el-card style="border-radius: 20px">
        <div class="avatar-content">
          <div class="avatar">
            <el-avatar :src="props.avatar" style="width: 100px; height: 100px"/>
          </div>
          <div class="introduction">
            <span style="font-weight: bold" class="professor-introduction text-normal-align">{{props.name}}</span>
            <span class="professor-introduction text-normal-align">{{props.introduction}}</span>
            <span class="professor-introduction text-normal-align">{{props.detail}}</span>
          </div>
        </div>
      </el-card>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.avatar-content{
  display: flex;
  font-family: mono-courier-new, alibaba-inclusive;
  .avatar{
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .introduction{
    display: flex;
    flex-direction: column;

    span{
      display: block;
      margin-top: .25rem;
      margin-bottom: .25rem;
    }
  }
}
.border-wrapper{
  margin-top: 10px;
  margin-bottom: 10px;
}
.professor-introduction{
  font-size: 1.2rem;
  font-family: mono-courier-new, alibaba-inclusive;
}
</style>