<template>
  <el-row>
    <el-col :span="8">
      <router-link to="/">
        <img src="/static/school.jpg" alt="图标" style="width: 200px; height: 50px">
      </router-link>
    </el-col>
    <el-col :span="8"/>
  </el-row>

  <el-row>
    <el-col :span="2"/>
    <el-col :span="20">
      <div style="height: 200px;background-color: aliceblue;margin-left: 10px;margin-right: 10px;margin-top: 20px ">
        <el-avatar style="height: 120px;width:120px;margin-top: 10px" :src="professorBasicInfo.avatar"/>
        <p style="font-size: 20px;font-weight: bold">{{professorBasicInfo.name}}</p>
      </div>
    </el-col>
    <el-col :span="2"/>
  </el-row>

  <el-row>
    <el-col :span="2"/>
    <el-col :span="20">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick1">
        <el-tab-pane  name="first" >
          <template #label>
            <span class="personal-tabs-header-text">主页</span>
          </template>
          <!--数据框-->
<!--          <div class="container">-->
<!--            <div class="row" style="margin-left: 30px;margin-right: 30px">-->
<!--              <div class="item">项目</div>-->
<!--              <div class="item">成果</div>-->
<!--              <div class="item">阅读</div>-->
<!--              <div class="item">下载</div>-->
<!--              <div class="item">被引</div>-->
<!--            </div>-->
<!--            <div class="row" style="text-indent: 12px;margin-left:30px;margin-right: 30px">-->
<!--              <div class="item">2</div>-->
<!--              <div class="item" style="text-indent: 30px">987</div>-->
<!--              <div class="item " style="text-indent: 20px">755</div>-->
<!--              <div class="item" style="text-indent: 20px">14</div>-->
<!--              <div class="item" style="">41905</div>-->
<!--            </div>-->
<!--          </div>-->

          <!--  个人简介-->
          <personal-introduction-separator menu-name="个人简介">
            <p style="text-align: left">{{professorBasicInfo.introduction}}</p>
          </personal-introduction-separator>

          <!--关键词-->
          <personal-introduction-separator menu-name="关键词">
            <div style="display: flex">
              <el-tag v-for="tag in professorBasicInfo.keyword" style="margin-left: 5px; margin-right: 5px;"
                      :key="tag" :disable-transitions="false" @close="handleClose">
                {{ tag }}
              </el-tag>
            </div>
          </personal-introduction-separator>

          <!--邮箱-->
          <personal-introduction-separator menu-name="邮箱">
            <p>{{professorBasicInfo.email}}</p>
          </personal-introduction-separator>

          <!--电话-->
          <personal-introduction-separator menu-name="电话">
            <p>{{professorBasicInfo.phone}}</p>
          </personal-introduction-separator>

          <!--工作经历-->
          <personal-introduction-separator menu-name="工作经历">
            <div style="background-color: azure">
              <el-table :data="professorBasicInfo.resume">
                <el-table-column prop="address" label="工作单位"/>
                <el-table-column prop="author" label="职称"/>
                <el-table-column prop="date" label="日期"/>
              </el-table>
            </div>
          </personal-introduction-separator>
        </el-tab-pane>


        <!--成果-->
        <el-tab-pane name="second">
          <template #label>
            <span class="personal-tabs-header-text">成果</span>
          </template>
          <div style="display: flex; margin-top: -12px">
            <el-col :span="6" >


              <el-menu default-active="all-year" @close="handleClose" @select="handleSelect">
                <el-sub-menu index="year">
                  <template #title>
                    <span>年份</span>
                  </template>
                  <el-menu-item index="all-year">全部年份</el-menu-item>
                  <el-menu-item v-for="year in inclusiveYearList" :index="year">{{year}}年</el-menu-item>
                </el-sub-menu>
              </el-menu>

              <el-menu default-active="all-type" @close="handleClose" @select="handleSelect">
                <el-sub-menu index="type">
                  <template #title>
                    <span>成果类型</span>
                  </template>
                  <el-menu-item index="all-type">全部类型</el-menu-item>
                  <el-menu-item v-for="t in inclusiveTypeList" :index="t">{{t}}</el-menu-item>
                </el-sub-menu>
              </el-menu>


            </el-col>



            <div style="width: 100%">
<!--              <div style="display: flex">-->
<!--                <p style="text-indent: 5px">H指数:113  成果:123</p>-->
<!--              </div>-->
              <personal-professor-fruit v-for="fruit in fruitToDisplay" :key="fruit.id" :publisher="fruit.fruitBaseIn"
                                        :link="fruit.fruitOutLink" :author="fruit.authorNames" :id="fruit.id"
                                        :title="fruit.fruitName"/>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="2"/>
  </el-row>
  <div class="bottom-view"/>
</template>


<script setup>
import {computed, reactive, ref} from 'vue'
import {useRoute} from "vue-router";
const route = useRoute()
const professorId = route.query.id

// 防止出事，这里也用一下pinia的订阅机制
import {useProfessorStore} from "@/store";
import PersonalIntroductionSeparator from "@/component/personal-introduction-separator.vue";
import PersonalProfessorFruit from "@/component/personal-professor-fruit.vue";
const professorStore = useProfessorStore();
const {setProfessorAndProfessorStore} = professorStore
setProfessorAndProfessorStore()
const professorBasicInfo = ref({
  name: null,
  introduction: null,
  // 关键词，用分号分割成列表
  keyword: [],
  email: null,
  phone: null,
  // 用\r\n分割成列表
  resume: [],
  // 头像
  avatar: null,
  // 是否首页展示0否1是
  indexViewFlag: null,
  // 职称，用于首页显示
  positionRemark: null
})
// 这里的成果直接全部取出，分页的时候再做处理
const professorFruit = ref([])
// 成果计数
const totalFruitCount = ref()
// 消息订阅，就算之前有pinia记录也要做一次确保用户不从首页进来也可以访问到
professorStore.$subscribe(
    (mutation, state) => {

      // 根据学者id取学者
      function getProfessorById(id){
        const idIndex = state.professor.header.indexOf('id')
        const obj = {}
        state.professor.body.forEach((element) => {
          if (element[idIndex]==id){
            element.forEach((attr, index)=>{
              obj[state.professor.header[index]] = attr
            })
          }
        })
        return obj;
      }

      // 根据学者id取学者成果
      function getProfessorFruitById(id){
        const authorIdIndex = state.professorFruit.header.indexOf('authors')
        let ret = []
        state.professorFruit.body.forEach((element) => {
          const authList = element[authorIdIndex].toString().replace('，',',').replace(' ','').split(',')
          if(authList.includes(id.toString())){
            const obj = {}
            element.forEach((attr, index) => {
              obj[state.professorFruit.header[index]] = attr
            })
            ret.push(obj)
          }
        })
        return ret
      }
      const obj = getProfessorById(professorId);
      Object.keys(obj).length===0?console.log("非法ID输入！"):professorBasicInfo.value=obj
      // 特殊处理关键词和个人简介
      if(Object.keys(obj).length!==0){
        professorBasicInfo.value.keyword = obj.keyword.replace(" ", '').replace('；', ';').split(';')
        professorBasicInfo.value.resume = obj.resume.split("\r\n").map(element => {
          const row = element.replace('：', ':').split(':')
          return {
            date: row[0],
            address: row[1],
            author: row[2]
          }
        })
      }
      professorFruit.value = getProfessorFruitById(professorId)
      totalFruitCount.value = professorFruit.value.length
    },
    { detached: false }
)


const activeName = ref('first');

const handleClick1 = (tab, event) => {
  // console.log(tab, event);
};

const handleClose = () => {
  return false
}

// 控制当前
const filterConditionSelected = reactive({
  year: 'all-year',
  type: 'all-type'
})

const fruitToDisplay = computed(()=>{
  // console.log(0)
  const display = []
  // 先过滤年份
  professorFruit.value.forEach((element, index) => {
    const selType = filterConditionSelected.type
    const selTypeB = selType==='all-type'
    const selYear = filterConditionSelected.year
    const selYearB = selYear==='all-year'
    const green = selTypeB&&selYearB
    const eleYear = element.year
    const eleType = element.fruitType
    if(green||(selTypeB&&selYear==eleYear)||(selYearB&&selType==eleType)||(selType==eleType&&selYear==eleYear)){
      display.push(element)
    }
  })
  // console.log(display)
  return display
})

const handleSelect = (key, keyPath)=>{
  filterConditionSelected[keyPath[0]] = key
}
// 这个人发表的文章的年份
const inclusiveYearList = computed(()=>{
  const obj = {}
  professorFruit.value.map(fruit=>{
    obj[fruit.year] = 'r'
  })
  return Object.keys(obj)
})
const inclusiveTypeList = computed(()=>{
  const obj = {}
  professorFruit.value.map(fruit=>{
    obj[fruit.fruitType] = 'r'
  })
  return Object.keys(obj)
})

</script>


<style scoped lang="scss">
.demo-type {
  display: flex;
}

.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

//数据框
.container {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 35px auto;
  background-color: #3A3C435A;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center; /* 垂直居中对齐 */
}

.item {
  padding: 10px;
  border: none;
  line-height: 1; /* 设置行高为1，可根据需要调整 */
  text-align: center; /* 水平居中对齐 */
}
.personal-tabs-header-text{
  font-size: 1rem;
}
</style>

