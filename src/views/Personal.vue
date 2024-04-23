<template>
  <div style="display: flex; align-items: center; cursor: pointer;">
    <img src="../assets/school.jpg" alt="图标" style="width: 200px; height: 50px; margin-right: 10px;"
         @click="handleClick">
    <div style="display: flex; margin: 0 auto">
      <el-input v-model="input" style="width: 240px;" placeholder="搜索"/>
      <el-button :icon="Search" circle style="margin-left: 5px "/>
    </div>
    <el-button style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);margin-right: 10px">退出登录</el-button>
  </div>


  <div style="height: 200px;background-color: aliceblue;margin-left: 10px;margin-right: 10px;margin-top: 20px ">
    <el-avatar style="height: 120px;width:120px;margin-top: 10px"
               :src="require('@/assets/Teacher.png')"
    />
    <p style="font-size: 20px;font-weight: bold">许东升</p>
  </div>

  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick1">
      <el-tab-pane  label="主页"  name="first" >
        <!--数据框-->
        <div class="container">
          <div class="row" style="margin-left: 30px;margin-right: 30px">
            <div class="item">项目</div>
            <div class="item">成果</div>
            <div class="item">阅读</div>
            <div class="item">下载</div>
            <div class="item">被引</div>
          </div>
          <div class="row" style="text-indent: 12px;margin-left:30px;margin-right: 30px">
            <div class="item">2</div>
            <div class="item" style="text-indent: 30px">987</div>
            <div class="item " style="text-indent: 20px">755</div>
            <div class="item" style="text-indent: 20px">14</div>
            <div class="item" style="">41905</div>
          </div>
        </div>

        <!--  个人简介-->
        <div style="margin: 40px auto;width: 95%">
          <p style="font-weight: bold;font-size: 30px;display: flex">个人简介</p>
          <hr style="margin-top: -20px">
          <p style="display: flex;flex-wrap: wrap;">
            许东升，教授，博士生导师、同济大学博士后合作导师、美国Nebraska大学医学中心兼职教授，上海中医药大学康复研究所副所长、上海市医师协会康复医师分会副会长、上海市康复医学会脑功能检测与调控康复专业委员会副主任委员、上海市康复医学会重症康复专业委员会副主任委员、中国研究型医院学会神经再生与修复专业委员会神经调控与康复研究学组组长.上海市医学会物理医学与康复学专业分会神经康复学组组长。</p>
        </div>

        <!--关键词-->
        <div style="margin: 70px auto;width: 95%">
          <p style="font-weight: bold;font-size: 30px;display: flex">关键词</p>
          <hr style="margin-top: -20px">
          <div style="display: flex">
            <el-tag
                v-for="tag in dynamicTags"
                :key="tag"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
                v-if="inputVisible"
                ref="InputRef"
                v-model="inputValue"
                class="w-20"
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag" size="small" @click="showInput">
              + New Tag
            </el-button>
          </div>
        </div>

        <div style="margin: 70px auto;width: 95%">
          <div style="display: flex;align-items: center;">
            <p style="font-weight: bold;font-size: 30px;display: flex">邮箱
              <el-icon size="40px">
                <Message/>
              </el-icon>
            </p>
            <el-button style="margin-left:1320px" type="default" :icon="Edit" circle/>
          </div>

          <hr style="margin-top: -20px">
          <div style="background-color: azure;width: 200px"><p>dxu0927@tongji.edu.cn</p></div>
        </div>

        <div style="margin: 70px auto;width: 95%">
          <div style="display: flex;align-items: center;">
            <p style="font-weight: bold;font-size: 30px;display: flex">电话
              <el-icon size="40px">
                <Phone/>
              </el-icon>
            </p>
            <el-button style="margin-left:1320px" type="default" :icon="Edit" circle/>
          </div>

          <hr style="margin-top: -20px">
          <div style="background-color: azure;width: 200px"><p>19923851828</p></div>
        </div>

        <!--工作经历-->
        <div style="margin: 70px auto;width: 95%">
          <div style="display: flex;align-items: center">
            <p style="font-weight: bold;font-size: 30px;display: flex">工作经历</p>
            <el-button style="margin-left:1300px" type="default" :icon="Plus" circle/>
          </div>

          <hr style="margin-top: -20px">
          <div style="background-color: azure">
            <el-table :data="tableData">
              <el-table-column prop="date" label="Date"/>
              <el-table-column prop="position" label="Position"/>
              <el-table-column prop="address" label="Address"/>
            </el-table>
          </div>
        </div>
      </el-tab-pane>


      <!--      成果-->
      <el-tab-pane label="成果" name="second">
        <div style="display: flex;margin-top: -12px">
          <el-col :span="6" >

            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                style="height: 100vh"
            >
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>年份</span>
                </template>
                <el-menu-item-group title="Group One">
                  <el-menu-item index="1-1">item one</el-menu-item>
                  <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                  <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                  <template #title>item four</template>
                  <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
              <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span>成果类型</span>
              </el-menu-item>

            </el-menu>
          </el-col>



          <div style="width: 100%">
            <div style="display: flex">
              <p style="text-indent: 5px">H指数:113  成果:123</p>
            </div>
            <el-card style="height: 130px; width: 1600px;" shadow="hover" >
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                  <el-icon size="110px"><Document /></el-icon>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; width: 1000px;">
                    <p style="margin-top: -10px;margin-left: 37px; font-size: 16px; font-weight: bold;">Multimodal treatment for spinal cord injury; a sword of neuroregeneration upon neuromodulation	</p>
                    <p style="margin-top: 10px;margin-left: 37px;">Dongshen Xu</p>
                    <p style="margin-bottom: 10px;margin-left: 37px; font-weight: lighter; color: darkgray;">Neural Roneneration Rasearch</p>
                  </div>

                  <div style="display: flex; flex-direction: column; align-items: flex-start;">
                    <el-button type="default" style="margin-top: 5px;margin-left: -60px ; color: #2c3e50;">编辑</el-button>
                    <el-button type="default" style="margin-top: 15px;margin-left: -60px ; ">删除</el-button>
                  </div>
                </div>
              </div>
            </el-card>

            <el-card style="height: 130px; width: 1600px;" shadow="hover" >
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                  <el-icon size="110px"><Document /></el-icon>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; width: 1000px;">
                    <p style="margin-top: -10px;margin-left: 37px; font-size: 16px; font-weight: bold;">Brain Endothelial Cell-Derived Exosomes Induce Neuroplasticity in Rats with Ischemia/Reperfusion Injury </p>
                    <p style="margin-top: 10px;margin-left: 37px;">Dongshen Xu</p>
                    <p style="margin-bottom: 10px;margin-left: 37px; font-weight: lighter; color: darkgray;">ACS Chemical Neuroscience</p>
                  </div>

                  <div style="display: flex; flex-direction: column; align-items: flex-start;">
                    <el-button type="default" style="margin-top: 5px;margin-left: -60px ; color: #2c3e50;">编辑</el-button>
                    <el-button type="default" style="margin-top: 15px;margin-left: -60px ; ">删除</el-button>
                  </div>
                </div>
              </div>
            </el-card>

            <el-card style="height: 130px; width: 1600px;" shadow="hover" >
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                  <el-icon size="110px"><Document /></el-icon>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; width: 1000px;">
                    <p style="margin-top: -10px;margin-left: 37px; font-size: 16px; font-weight: bold;">Vascular Endothelial Cell-derived Exosomes Protect Neural Stem Cells Against Ischemia/reperfusion Injury  </p>
                    <p style="margin-top: 10px;margin-left: 37px;">Dongshen Xu</p>
                    <p style="margin-bottom: 10px;margin-left: 37px; font-weight: lighter; color: darkgray;">Neuroscience</p>
                  </div>

                  <div style="display: flex; flex-direction: column; align-items: flex-start;">
                    <el-button type="default" style="margin-top: 5px;margin-left: -60px ; color: #2c3e50;">编辑</el-button>
                    <el-button type="default" style="margin-top: 15px;margin-left: -60px ; ">删除</el-button>
                  </div>
                </div>
              </div>
            </el-card>

            <el-card style="height: 130px; width: 1600px;" shadow="hover" >
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                  <el-icon size="110px"><Document /></el-icon>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; width: 1000px;">
                    <p style="margin-top: -10px;margin-left: 37px; font-size: 16px; font-weight: bold;">Multi-target synergistic enhanced neural circuit modulation: thinking and innovation  </p>
                    <p style="margin-top: 10px;margin-left: 37px;">Dongshen Xu</p>
                    <p style="margin-bottom: 10px;margin-left: 37px; font-weight: lighter; color: darkgray;">Journal of Sichuan University (Medical Sciance Edition)</p>
                  </div>

                  <div style="display: flex; flex-direction: column; align-items: flex-start;">
                    <el-button type="default" style="margin-top: 5px;margin-left: -60px ; color: #2c3e50;">编辑</el-button>
                    <el-button type="default" style="margin-top: 15px;margin-left: -60px ; ">删除</el-button>
                  </div>
                </div>
              </div>
            </el-card>

            <el-card style="height: 130px; width: 1600px;" shadow="hover" >
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                  <el-icon size="110px"><Document /></el-icon>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; width: 1000px;">
                    <p style="margin-top: -10px;margin-left: 37px; font-size: 16px; font-weight: bold;">Paired associated magnetic stimulation promotes neural repair in the rat middle cerebral artery occlusion model of
                      stroke</p>
                    <p style="margin-top: 10px;margin-left: 37px;">Dongshen Xu</p>
                    <p style="margin-bottom: 10px;margin-left: 37px; font-weight: lighter; color: darkgray;">Noural Regeneration Reseatch</p>
                  </div>

                  <div style="display: flex; flex-direction: column; align-items: flex-start;">
                    <el-button type="default" style="margin-top: 5px;margin-left: -60px ; color: #2c3e50;">编辑</el-button>
                    <el-button type="default" style="margin-top: 15px;margin-left: -60px ; ">删除</el-button>
                  </div>
                </div>
              </div>
            </el-card>
          </div>


        </div>






      </el-tab-pane>
    </el-tabs>
  </div>


</template>

<script>

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

.custom:hover{
  filter: grayscale(200%);
}
</style>


<script>
import { Timer } from '@element-plus/icons-vue'
import {Search, Edit, Plus, House} from "@element-plus/icons-vue";
import {ref, nextTick} from 'vue'
import {ElInput} from 'element-plus'

export default {
  components: {House},
  // 表格数据
  data() {
    return {

      tableData2: [
        {
          date: 'Multimodal treatment for spinal cord injury; a sword of neuroregeneration upon neuromodulation',
          name: 'Dongshen Xu',
          author: 'Neural Roneneration Rasearch',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],


      // tableData: [
      //   {
      //     date: '2019-10-01至2019-10-01',
      //     position: '教授',
      //     address: '同济大学 同济大学医学院',
      //   },
      //   {
      //     date: '2019-10-01至2022-4-30',
      //     position: '教授',
      //     address: '上海中医药大学 康复医学院',
      //   },
      //
      //
      // ],
      //
      // tableData1: [
      //   {
      //     date: '2019-10-01至2019-10-01',
      //     position: '教授',
      //     address: '同济大学 同济大学医学院',
      //   },
      //   {
      //     date: '2019-10-01至2022-4-30',
      //     position: '教授',
      //     address: '上海中医药大学 康复医学院',
      //   },
      //
      //
      // ]
    };
  },


  setup() {



    // 分页
    const activeName = ref('first');

    const handleClick1 = (tab, event) => {
      console.log(tab, event);
    };

// 标签
    const inputValue = ref('')
    const dynamicTags = ref(['再生康复医学', '神经调控'])
    const inputVisible = ref(false)
    const InputRef = ref(null)

    const handleClose = (tag) => {
      dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
    }

    const showInput = () => {
      inputVisible.value = true
      nextTick(() => {
        InputRef.value.focus()

      })
    }

    const handleInputConfirm = () => {
      if (inputValue.value) {
        dynamicTags.value.push(inputValue.value)
      }
      inputVisible.value = false
      inputValue.value = ''
    }

    return {
      inputValue,
      dynamicTags,
      inputVisible,
      InputRef,
      handleClose,
      showInput,
      handleInputConfirm,

      activeName,
      handleClick1,


    }
  },

  //其他
  computed: {
    Plus() {
      return Plus
    },
    Edit() {
      return Edit
    },
    Search() {
      return Search
    }
  },
  methods: {
    handleClick() {
      this.$router.push('/');
    },

    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  },
}
</script>

<style>
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>

