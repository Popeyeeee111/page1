<!--
-- @author Santa Antilles
-- @description
-- @date 2024/4/27-16:01:34
-->

<script setup>
import {useRoute} from "vue-router";
import {useProfessorStore} from "@/store";
import {ref} from "vue";
import IndexProfessorAvatar from "@/component/index-professor-avatar.vue";

const route = useRoute()
// 查询参数为成果名
const fruitQueryParams = route.query.professor
const professorStore = useProfessorStore();
const {setProfessorAndProfessorStore} = professorStore
setProfessorAndProfessorStore()

const satisfiedFruits = ref([])

professorStore.$subscribe((mutation, state)=>{
  function find(param){
    const tb_head = state.professor.header
    const tb_body = state.professor.body
    // 检索姓名、简介、职称
    const args = [tb_head.indexOf('name'), tb_head.indexOf('introduction'), tb_head.indexOf('positionRemark')]
    tb_body.forEach(element => {
      for (let i = 0; i < args.length; i++) {
        if(sqlLike(element[args[i]], `%${param}%`)){
          const obj = {}
          element.forEach((attr, index) => {
            obj[tb_head[index]] = attr
          })
          satisfiedFruits.value.push(obj)
          break
        }
      }
    })
  }
  find(fruitQueryParams)
}, {detached: false})


function sqlLike(input, pattern){
  // 将 SQL 中的 % 替换为 .*，将 _ 替换为 .
  pattern = pattern.replace(/%/g, '.*').replace(/_/g, '.');
  // 创建正则表达式对象，不区分大小写
  const regex = new RegExp('^' + pattern + '$', 'i');
  // 返回匹配结果
  return regex.test(input);
}
</script>

<template>
  <el-row>
    <el-col :span="8">
      <router-link to="/">
        <img src="/static/school.jpg" alt="图标" style="width: 200px; height: 50px">
      </router-link>
    </el-col>
  </el-row>
  <el-row style="overflow-y: scroll" class="fruit-item">
    <el-col :span="24">
      <div style="margin: 20px">
        <index-professor-avatar v-for="professor in satisfiedFruits" :introduction="professor.positionRemark" :id="professor.id"
                                :avatar="professor.avatar" :name="professor.name"/>
      </div>
    </el-col>
  </el-row>
  <el-row v-show="satisfiedFruits.length===0">
    <el-col :span="8">
      <h2>当前指定的搜素条件没有符合的记录！</h2>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">

</style>