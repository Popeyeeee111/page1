<script setup>
import {useRoute} from "vue-router";
import {useProfessorStore} from "@/store";
import {ref} from "vue";
import FruitDescriptionSeparator from "@/component/fruit-description-separator.vue";

const _window = window
const route = useRoute()
const fruitId = route.query.fruitId
const professorStore = useProfessorStore();
const {setProfessorAndProfessorStore} = professorStore
setProfessorAndProfessorStore()
const fruitBasicInfo = ref({
  id: fruitId,
  fruitName: null,
  fruitOutLink: null,
  authorNames: null,
  address: null,
  DOI: null,
  journal: null,
  abstract: null,
  keywords: null,
  fileLink: null
})
professorStore.$subscribe((mutation, state)=>{

  // 根据URL中的fruitId参数从共享状态里取数据
  function getFruitByFruitId(id){
    const professorFruit = state.professorFruit
    const idIndex = professorFruit.header.indexOf('id')
    const obj = {}
    professorFruit.body.forEach((element) => {
      if (element[idIndex]==id){
        element.forEach((attr, index)=>{
          obj[state.professorFruit.header[index]] = attr
        })
      }
    })
    return obj;
  }

  const searched = getFruitByFruitId(fruitId);
  Object.keys(searched).length===0?console.log("非法论文输入！"):fruitBasicInfo.value=searched
  console.log(fruitBasicInfo.value)
}, {detached: false})


</script>

<template>
  <el-row>
    <el-col :span="8">
      <router-link to="/">
        <img src="/static/school.jpg" alt="图标" style="width: 200px; height: 50px">
      </router-link>
    </el-col>
    <el-col :span="8"/>
  </el-row>
  <div class="about">
    <div class="about-border">
      <div class="line-info title">
        <div class="text-normal-align">{{fruitBasicInfo.fruitName}}</div>
      </div>
      <div class="line-info authors">
        <div class="text-normal-align">{{fruitBasicInfo.authorNames}}</div>
      </div>
      <div class="line-info journal-info">
        <div class="text-normal-align">{{fruitBasicInfo.journal}}</div>
      </div>
      <div class="doi">
        <el-link style="font-size: 1rem; margin: 5px 0" :href="fruitBasicInfo.fruitOutLink">DOI: {{fruitBasicInfo.DOI}}</el-link>
      </div>

      <el-tabs>
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <span>基本信息</span>
            </span>
          </template>
          <div class="tabs-content">
            <fruit-description-separator menu-name="摘要">
              <p style="overflow-wrap: break-word">{{fruitBasicInfo.abstract}}</p>
            </fruit-description-separator>

            <fruit-description-separator menu-name="关键词">
              <p>{{fruitBasicInfo.keywords}}</p>
            </fruit-description-separator>

            <fruit-description-separator menu-name="单位">
              <p>{{fruitBasicInfo.address}}</p>
            </fruit-description-separator>

            <fruit-description-separator menu-name="全文预览">
              <div style="margin-top: 1rem;">
                <el-button @click="_window.open(fruitBasicInfo.fileLink, 'newTab')">查看文章</el-button>
              </div>
            </fruit-description-separator>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <div class="bottom-view"/>
</template>


<style scoped lang="scss">
.about{
  width: 100%;
  display: flex;
  justify-content: center;

  .about-border{
    width: 90%;
    display: flex;
    flex-direction: column;

    .title{
      height: 80px;
      font-size: 1.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    .authors{
      font-weight: bold;
    }

    .line-info{
      margin: 5px 0;
    }

    .journal-info{
      color: #606266;
      font-style: italic;
    }

    .doi{
      text-align: justify;
      color: #606266;
      margin-bottom: 25px;
    }

  }
}

.tabs-content:last-child{
  margin-bottom: 30px;
}

:deep(.el-tabs__nav-wrap){
  background-color: #ecdfda;
}
:deep(.el-tabs__item){
  margin: 0 10px;
  height: 60px;
}
:deep(.el-tabs__active-bar){
  background-color: rgb(133, 115, 109);
}
.custom-tabs-label{
  color: rgb(133, 115, 109);
}

:deep(.el-tabs__content){
  background-color: rgb(244, 239, 237);
}
:deep(.el-tabs__header){
  margin: 0;
}
.tabs-content{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>


