<!--
-- @author Santa Antilles
-- @description
-- @date 2024/4/27-16:01:55
-->

<script setup>
import {useRoute} from "vue-router";
import {useProfessorStore} from "@/store";
import {computed, ref} from "vue";
import IndexProfessorFruit from "@/component/index-professor-fruit.vue";

const route = useRoute()
// 查询参数为成果名
const fruitQueryParams = route.query.fruitQ
const professorStore = useProfessorStore();
const {setProfessorAndProfessorStore} = professorStore
setProfessorAndProfessorStore()

const satisfiedFruits = ref([])

professorStore.$subscribe((mutation, state)=>{
  function find(param){
    const tb_head = state.professorFruit.header
    const tb_body = state.professorFruit.body

    // 不指定查询参数时
    if(!param){
      tb_body.forEach(element => {
        const obj = {}
        element.forEach((attr, index) => {
          obj[tb_head[index]] = attr
        })
        satisfiedFruits.value.push(obj)
      })
      return
    }


    // 检索摘要、文章标题、作者
    const args = [tb_head.indexOf('abstract'), tb_head.indexOf('fruitName'), tb_head.indexOf('authorNames')]
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

const pageNum = ref(1)
const pageSize = 10;


const fruitOnDisplay = computed(()=>{
  let temp = []
  const low = (pageNum.value-1)*pageSize;
  const high = (pageNum.value)*pageSize - 1;
  for (let i = low; i < satisfiedFruits.value.length; i++) {
    if(i>high) break
    temp.push(satisfiedFruits.value[i])
  }
  return temp
})

</script>

<template>
  <el-row>
    <el-col :span="8">
      <router-link to="/">
        <img src="/static/school.jpg" alt="图标" style="width: 200px; height: 50px">
      </router-link>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8" v-if="satisfiedFruits.length===0">
      <h2>当前指定的搜素条件没有符合的记录！</h2>
    </el-col>
    <el-col v-if="satisfiedFruits.length!==0&&fruitQueryParams" :span="8">
      <h2>当前指定的搜索条件下有{{satisfiedFruits.length}}条成果</h2>
    </el-col>
    <el-col v-if="satisfiedFruits.length!==0&&!fruitQueryParams" :span="8">
      <h2>当前共有{{satisfiedFruits.length}}条成果</h2>
    </el-col>
  </el-row>
  <el-row class="fruit-item">
    <el-col :span="3"/>
    <el-col :span="18">
      <div style="margin: 2px">
        <index-professor-fruit v-for="fruit in fruitOnDisplay" :title="fruit.fruitName" :author="fruit.authorNames"
                               :link="fruit.fruitOutLink" :publisher="fruit.fruitBaseIn" :key="fruit.id" :id="fruit.id"/>
      </div>
    </el-col>
    <el-col :span="3"/>
  </el-row>
  <el-row>
    <el-col :span="21" style="display: flex; justify-content: flex-end">
      <el-pagination :page-size="pageSize" hide-on-single-page v-model:current-page="pageNum"
                     :pager-count="6" layout="prev, pager, next" :total="satisfiedFruits.length" />
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">

</style>