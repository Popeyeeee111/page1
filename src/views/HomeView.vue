<template>
  <div style="margin-bottom: 2rem;">
    <el-row>
      <el-col :span="8">
        <router-link to="/">
          <img src="/static/school.jpg" alt="图标" style="width: 200px; height: 50px">
        </router-link>
      </el-col>
      <el-col :span="8"/>
      <el-col :span="8">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1" @click.native="$router.push('/')">首页</el-menu-item>
          <el-menu-item index="2" @click.native="$router.push('/professor')">学者</el-menu-item>
          <el-menu-item index="3" @click.native="$router.push('/fruitQ')">成果</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-container class="background-image-container">
      <div
          style="margin: 10px; backdrop-filter: blur(2px); width: 60%; height: 80px; display: flex; justify-content:center">
        <div style="display: flex; justify-content: center; align-items: center;">
          <el-row>
            <el-select v-model="value" placeholder="请选择" size="large" style="width: 120px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            <el-input v-model="input1" style="width: 480px" placeholder="查找内容"/>
            <el-button type="primary" style="height: 40px" @click="handleQuery">
              <el-icon style="margin: 5px">
                <search/>
              </el-icon>
            </el-button>
          </el-row>
        </div>
      </div>
    </el-container>
<!--    <el-row style="margin-top: 20px">-->
<!--      <el-col :span="12">-->
<!--        <el-statistic title="成果" :value="progress"/>-->
<!--      </el-col>-->
<!--      <el-col :span="12">-->
<!--        <el-statistic title="研究" :value="analyze"/>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <el-row>
      <el-container
          style="background-color: #d74764; width: 100%; height: auto; margin-right: 30px; margin-left: 30px; margin-top: 20px; border-radius: 15px">
        <el-header style="display: flex; justify-content: space-between;">
          <p style="margin-right: auto; margin-left: 10px; font-weight: bold; color: white; font-size: 1.5rem">主要学者</p>
          <router-link to="/professor">
            <p style="margin-left: auto; margin-right: 10px; cursor: pointer; font-weight: bold; color: white; font-size: 1.5rem" >MORE</p>
          </router-link>
        </el-header>
        <el-row :gutter="20" style="margin: 15px; display: flex; justify-content: space-around">
          <!--          只允许有4个，或者做成滚动-->
          <el-col :span="displayProfessorsLength" v-for="professor in toDisplayProfessor">
            <index-professor-avatar :introduction="professor.positionRemark" :id="professor.id"
                                    :avatar="professor.avatar" :name="professor.name"/>
          </el-col>
        </el-row>
      </el-container>
      <el-container style="background-color: #2a86be; width: 100%; height: 900px; margin-right: 30px; margin-left: 30px; margin-top: 15px; border-radius: 15px">
        <el-header style="display: flex; justify-content: space-between;">
          <p style="margin-right: auto; margin-left: 10px; font-weight: bold; color: white; font-size: 1.5rem">最新成果</p>
          <router-link to="/fruitQ">
            <p style="margin-left: auto; margin-right: 10px; cursor: pointer; font-weight: bold; color: white; font-size: 1.5rem" >MORE</p>
          </router-link>
        </el-header>
        <el-row style="overflow-y: scroll" class="fruit-item">
          <el-col :span="24">
            <div style="margin: 20px">
              <index-professor-fruit v-for="fruit in toDisplayFruit" :title="fruit.fruitName" :author="fruit.authorNames"
                                     :link="fruit.fruitOutLink" :publisher="fruit.fruitBaseIn" :key="fruit.id" :id="fruit.id"/>
            </div>
          </el-col>
        </el-row>
      </el-container>

      <el-container style="background-color: rgba(0,0,0,.5); width: 100%; margin-right: 30px; margin-left: 30px; margin-top: 20px; height: 2px"/>

      <el-container style="background-color: white; width: 100%; margin-right: 30px; margin-left: 30px; margin-top: 15px; border-radius: 15px">
        <el-header>
          <el-row>
            <el-col :span="4" class="text-normal-align">
              <p style="margin-right: auto; font-weight: bold; color: black; font-size: 1.5rem; margin-left: 10px;">友情链接</p>
            </el-col>
          </el-row>
        </el-header>
        <el-row>
          <el-col :span="4" class="text-normal-align">
            <el-link href="https://kf.shutcm.edu.cn/">
              <el-image src="/static/link-hospital.png" class="link-image"/>
            </el-link>
          </el-col>
          <el-col :span="4" class="text-normal-align">
            <el-link href="https://journals.lww.com/bnam/pages/currenttoc.aspx">
              <el-image src="/static/link-journalism.png" class="link-image"/>
            </el-link>
          </el-col>
        </el-row>
      </el-container>
    </el-row>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useTransition} from '@vueuse/core'
import IndexProfessorAvatar from "@/component/index-professor-avatar.vue";
import router from '@/router'
/**
 * 进入首页，把两张表全部初始化好
 *
 */
import {useProfessorStore} from "@/store";
import IndexProfessorFruit from "@/component/index-professor-fruit.vue";
import {ElMessage} from "element-plus";
const professorStore = useProfessorStore();
const {setProfessorAndProfessorStore} = professorStore
// 需要展示的学者信息
const toDisplayProfessor = ref([])
const displayProfessorsLength = computed(()=>{
  return Math.floor(24 / toDisplayProfessor.value.length)
})
const toDisplayFruit = ref([])


// 初始化pinia的状态
setProfessorAndProfessorStore();

professorStore.$subscribe(
    (mutation, state) => {

      // 获取需要首页展示的学者
      function getProfessorById() {
        const indexViewFlagIndex = state.professor.header.indexOf('indexViewFlag')
        let ret = []
        state.professor.body.forEach((element) => {
          if (element[indexViewFlagIndex]) {
            const obj = {}
            element.forEach((attr, index) => {
              obj[state.professor.header[index]] = attr
            })
            ret.push(obj)
          }
        })
        return ret
      }

      // 获取需要首页展示的成果
      function getProfessorFruitById() {
        const indexViewFlagIndex = state.professorFruit.header.indexOf('indexViewFlag')
        let ret = []
        state.professorFruit.body.forEach((element) => {
          if (element[indexViewFlagIndex]) {
            const obj = {}
            element.forEach((attr, index) => {
              obj[state.professorFruit.header[index]] = attr
            })
            ret.push(obj)
          }
        })
        return ret
      }

      toDisplayProfessor.value = getProfessorById()
      toDisplayFruit.value = getProfessorFruitById()
    },
    {detached: false}
)

const handleQuery = ()=>{
  const type = value.value
  const queryInfo = input1.value
  if (isValidInput(type)&&isValidInput(queryInfo)){
    router.push({
      name: type,
      query: {[type]: queryInfo}
    })
  }else{
    ElMessage.error("请前选择检索类型或输入检索参数！")
  }
}

function isValidInput(inputString){
  if (!inputString){
    return false
  }
  if (inputString.trim()===''){
    return false
  }
  return true
}

const activeIndex = ref('1')
const input1 = ref('')
const source = ref(0)
const source1 = ref(0)
// const progress = useTransition(source, {
//   duration: 1000,
// })
// source.value = 1200
// const analyze = useTransition(source1, {
//   duration: 1000,
// })
source1.value = 1200
const value = ref('')
const options = [
  {
    value: 'professor',
    label: '学者',
  },
  {
    value: 'fruitQ',
    label: '成果',
  },
]

</script>

<style scoped lang="scss">
.background-image-container {
  background-image: url('@/assets/back.jpg');
  background-position: center; /* 图片居中显示 */
  height: 84vh; /* 调整容器的高度，根据需要更改 */
  background-size: 98%; /* 缩小背景图片 */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white; /* 文字颜色 */
  background-repeat: no-repeat;
  position: relative;
}
.fruit-item::-webkit-scrollbar{
  height: 0;
  width: 0;
}
:deep(.el-select__wrapper){
  border-radius: 0 !important;
}
:deep(.el-input__wrapper){
  border-radius: 0 !important;
}
:deep(.el-button){
  border-radius: 0 !important;
}
.index-footer{
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.link-image{
  border-radius: .5rem;
  height: 4rem;
}
</style>
