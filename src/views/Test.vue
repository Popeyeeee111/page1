<!--
-- @author Santa Antilles
-- @description 资源获取测试
-- @date 2024/4/26-01:15:49
-->

<script setup>
import {useProfessorStore} from "@/store";
import {ref} from "vue";
// 教授信息数据共享组件
const professorStore = useProfessorStore();
const {setProfessorAndProfessorStore} = professorStore
// 教授成果数据共享组件

// 初始化两个excel表
setProfessorAndProfessorStore();


let testMan = ref()
let testAttachedFruit = ref()

// 消息订阅，动态获取
professorStore.$subscribe(
    (mutation, state) => {

      // 根据学者id取学者
      function getProfessorById(id){
        const idIndex = state.professor.header.indexOf('id')
        let ret = []
        state.professor.body.forEach((element) => {
          if (element[idIndex]==id){
            ret = element.map(attr=>attr)
          }
        })
        return ret
      }

      // 根据学者id取学者成果
      function getProfessorFruitById(id){
        const authorIdIndex = state.professorFruit.header.indexOf('authors')
        let ret = []
        state.professorFruit.body.forEach((element) => {
          let authorIdString = element[authorIdIndex].toString()
          authorIdString = authorIdString.replace('，','')
          authorIdString = authorIdString.replace(' ','')
          const authList = authorIdString.split(',')
          if(authList.includes(id.toString())){
            ret.push(element)
          }
        })
        return ret
      }

      //
       // * mutation主要包含三个属性值：
       // *   events：当前state改变的具体数据，包括改变前的值和改变后的值等等数据
       // *   storeId：是当前store的id
       // *   type：用于记录这次数据变化是通过什么途径，主要有三个分别是
       // *         “direct” ：通过 action 变化的
       //           ”patch object“ ：通过 $patch 传递对象的方式改变的
       //           “patch function” ：通过 $patch 传递函数的方式改变的
       // *
       //*
      // 在此处监听store中值的变化，当变化为某个值的时候，做一些业务操作
      testMan.value = getProfessorById(1)
      testAttachedFruit.value = getProfessorFruitById(1)
    },
    { detached: false }
    // detached:布尔值，默认是 false，正常情况下，当订阅所在的组件被卸载时，订阅将被停止删除，
    // 如果设置detached值为 true 时，即使所在组件被卸载，订阅依然在生效
    // 参考文档：https://pinia.web3doc.top/core-concepts/state.html#%E8%AE%A2%E9%98%85%E7%8A%B6%E6%80%81
)



</script>

<template>
  {{testMan}}
  {{testAttachedFruit}}
</template>

<style scoped lang="scss">

</style>