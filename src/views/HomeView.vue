<template>
  <div>
    <el-row>
      <el-col :span="8">
        <img src="../assets/logo1.jpg" alt="图片描述" style="width: 200px; height: 50px">
      </el-col>
      <el-col :span="8">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
          <el-menu-item index="1" @click.native="$router.push('/password')">首页</el-menu-item>
          <el-menu-item index="2" @click.native="$router.push('/password')">学者</el-menu-item>
          <el-menu-item index="3" @click.native="$router.push('/password')">成果</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="8" style="margin-top: 10px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-button plain @click="handelregisterVisible()">登录|注册</el-button>
          </el-col>

          <el-col :span="8">
            <el-button plain>个人主页</el-button>
          </el-col>

          <el-col :span="8">
            <el-button plain>管理员主页</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-container class="background-image-container">
    </el-container>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-statistic title="成果" :value="progess" />
      </el-col>
      <el-col :span="12">
        <el-statistic title="研究" :value="analyze" />
      </el-col>
    </el-row>
    <el-row>
      <el-container style="background-color: #d74764; width: 100%; height: 350px; margin-right: 30px; margin-left: 30px; margin-top: 20px">
        <el-header style="display: flex; justify-content: space-between;">
          <p style="margin-right: auto; margin-left: 10px; font-weight: bold; color: white">主要学者</p>
          <p style="margin-left: auto; margin-right: 10px; cursor: pointer; font-weight: bold; color: white" @click="">MORE</p>
        </el-header>
        <el-row :gutter="20" style="margin: 15px">
          <el-col :span="4">
            <el-card>
              <el-avatar
                  src="https://th.bing.com/th/id/OIP.eGxrXl3JBPvZ-9UeBRx0cgHaHa?rs=1&pid=ImgDetMain" style="width: 100px; height: 100px"
              />
              <p style="font-weight: bold">张三</p>
              <p></p>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <el-avatar
                  src="https://th.bing.com/th/id/OIP.eGxrXl3JBPvZ-9UeBRx0cgHaHa?rs=1&pid=ImgDetMain" style="width: 100px; height: 100px"
              />
              <p style="font-weight: bold">张三</p>
              <p></p>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <el-avatar
                  src="https://th.bing.com/th/id/OIP.eGxrXl3JBPvZ-9UeBRx0cgHaHa?rs=1&pid=ImgDetMain" style="width: 100px; height: 100px"
              />
              <p style="font-weight: bold">张三</p>
              <p></p>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <el-avatar
                  src="https://th.bing.com/th/id/OIP.eGxrXl3JBPvZ-9UeBRx0cgHaHa?rs=1&pid=ImgDetMain" style="width: 100px; height: 100px"
              />
              <p style="font-weight: bold">张三</p>
              <p></p>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <el-avatar
                  src="https://th.bing.com/th/id/OIP.eGxrXl3JBPvZ-9UeBRx0cgHaHa?rs=1&pid=ImgDetMain" style="width: 100px; height: 100px"
              />
              <p style="font-weight: bold">张三</p>
              <p></p>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <el-avatar
                  src="https://th.bing.com/th/id/OIP.eGxrXl3JBPvZ-9UeBRx0cgHaHa?rs=1&pid=ImgDetMain" style="width: 100px; height: 100px"
              />
              <p style="font-weight: bold">张三</p>
              <p></p>
            </el-card>
          </el-col>
        </el-row>
      </el-container>
      <el-container style="background-color: #2a86be; width: 100%; height: 350px; margin-right: 30px; margin-left: 30px; margin-top: 15px">
        <el-header style="display: flex; justify-content: space-between;">
          <p style="margin-right: auto; margin-left: 10px; font-weight: bold; color: white">最新成果</p>
          <p style="margin-left: auto; margin-right: 10px; cursor: pointer; font-weight: bold; color: white" @click="">MORE</p>
        </el-header>
      </el-container>
    </el-row>
  </div>
  <el-dialog
      v-model="registerVisible"
      title="Tips"
      width="500"
      draggable
      overflow
  >
    <span>It's a overflow draggable Dialog</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="registerVisible = false">Cancel</el-button>
        <el-button type="primary" @click="registerVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from 'vue';
import { useTransition } from '@vueuse/core'

export default {
  name: 'HomeView',
  setup() {
    const activeIndex = ref('1')
    const registerVisible = ref(false)
    const source = ref(0)
    const source1 = ref(0)
    const progess = useTransition(source, {
      duration: 1500,
    })
    source.value = 1200
    const analyze = useTransition(source1, {
      duration: 1500,
    })
    source1.value = 1200
    function handelregisterVisible() {
      registerVisible.value = true
    }
    return{
      activeIndex,
      registerVisible,
      progess,
      analyze,
      handelregisterVisible
    }
  },
}
</script>

<style lang="scss">
.background-image-container {
  background-image: url('@/assets/back.jpg');
  background-size: cover; /* 将背景图片铺满整个容器 */
  background-position: center; /* 图片居中显示 */
  height: 84vh; /* 调整容器的高度，根据需要更改 */
  background-size: 100%; /* 缩小背景图片 */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white; /* 文字颜色 */
}
</style>