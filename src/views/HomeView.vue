<template>
  <div>
    <el-row>
      <el-col :span="8">
        <img src="../assets/logo1.jpg" alt="图标" style="width: 300px; height: 75px">
      </el-col>
      <el-col :span="8">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
          <el-menu-item index="1" @click.native="$router.push('/')">首页</el-menu-item>
          <el-menu-item index="2" @click.native="$router.push('/123.pdf')">学者</el-menu-item>
          <el-menu-item index="3" @click.native="$router.push('/password')">成果</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-container class="background-image-container">
      <div style="margin: 10px; backdrop-filter: blur(2px); width: 600px; height: 80px; display: flex; justify-content:center">
        <div style="display: flex; justify-content: center; align-items: center;">
          <el-select
              v-model="value"
              placeholder="请选择"
              size="large"
              style="width: 130px"
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
          <el-input
              v-model="input1"
              style="width: 240px; height: 40px"
              placeholder="请输入内容"
          />
          <el-button type="primary" style="height: 40px"><el-icon style="margin: 5px">
            <search />
          </el-icon></el-button>
        </div>
      </div>
    </el-container>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-statistic title="成果" :value="progress" />
      </el-col>
      <el-col :span="12">
        <el-statistic title="研究" :value="analyze" />
      </el-col>
    </el-row>
    <el-row>
      <el-container style="background-color: #d74764; width: 100%; height: 350px; margin-right: 30px; margin-left: 30px; margin-top: 20px; border-radius: 15px">
        <el-header style="display: flex; justify-content: space-between;">
          <p style="margin-right: auto; margin-left: 10px; font-weight: bold; color: white">主要学者</p>
          <p style="margin-left: auto; margin-right: 10px; cursor: pointer; font-weight: bold; color: white" @click="">MORE</p>
        </el-header>
        <el-row :gutter="20" style="margin: 15px">
          <el-col :span="6">
            <index-professor-avatar introduction="博导" id="1" avatar="/avatar/test-avatar.png" name="许东升"/>
          </el-col>
          <el-col :span="6">
            <el-card>
              <el-avatar
                  src="https://th.bing.com/th/id/OIP.eGxrXl3JBPvZ-9UeBRx0cgHaHa?rs=1&pid=ImgDetMain" style="width: 100px; height: 100px"
              />
              <p style="font-weight: bold">名字</p>
              <p>职位</p>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <el-avatar
                  src="https://th.bing.com/th/id/OIP.eGxrXl3JBPvZ-9UeBRx0cgHaHa?rs=1&pid=ImgDetMain" style="width: 100px; height: 100px"
              />
              <p style="font-weight: bold">名字</p>
              <p>职位</p>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <el-avatar
                  src="https://th.bing.com/th/id/OIP.eGxrXl3JBPvZ-9UeBRx0cgHaHa?rs=1&pid=ImgDetMain" style="width: 100px; height: 100px"
              />
              <p style="font-weight: bold">名字</p>
              <p>职位</p>
            </el-card>
          </el-col>
        </el-row>
      </el-container>
      <el-container style="background-color: #2a86be; width: 100%; height: 900px; margin-right: 30px; margin-left: 30px; margin-top: 15px; border-radius: 15px">
        <el-header style="display: flex; justify-content: space-between;">
          <p style="margin-right: auto; margin-left: 10px; font-weight: bold; color: white">最新成果</p>
          <p style="margin-left: auto; margin-right: 10px; cursor: pointer; font-weight: bold; color: white" @click="">MORE</p>
        </el-header>
        <el-col :span="24">
          <div style="margin: 20px">
            <el-card style="height: 130px; width: 1400px;" shadow="hover" >
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                  <el-icon size="110px"><Document /></el-icon>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; width: 1000px;">
                    <el-link :underline="false" style="margin-top: -10px;margin-left: 37px; font-size: 16px; font-weight: bold;" href="https://pubmed.ncbi.nlm.nih.gov/30067297/">基于深度学习的图像分割技术</el-link>
                    <p style="margin-top: 10px;margin-left: 37px;">张三 李四</p>
                    <p style="margin-bottom: 10px;margin-left: 37px; font-weight: lighter; color: darkgray;">中国计算机杂志</p>
                  </div>
                </div>
              </div>
            </el-card>


            <el-card style="height: 130px; width: 1400px;" shadow="hover" >
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                  <el-icon size="110px"><Document /></el-icon>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; width: 1000px;">
                    <el-link :underline="false" style="margin-top: -10px;margin-left: 37px; font-size: 16px; font-weight: bold;" @click.native="$router.push('/123.pdf')">Multimodal treatment for spinal cord injury; a sword of neuroregeneration upon neuromodulation</el-link>
                    <p style="margin-top: 10px;margin-left: 37px;">Dongshen Xu</p>
                    <p style="margin-bottom: 10px;margin-left: 37px; font-weight: lighter; color: darkgray;">Neural Roneneration Rasearch</p>
                  </div>
                </div>
              </div>
            </el-card>

            <el-card style="height: 130px; width: 1400px;" shadow="hover" >
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                  <el-icon size="110px"><Document /></el-icon>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; width: 1000px;">
                    <el-link :underline="false" style="margin-top: -10px;margin-left: 37px; font-size: 16px; font-weight: bold;" @click.native="$router.push('/123.pdf')">Brain Endothelial Cell-Derived Exosomes Induce Neuroplasticity in Rats with Ischemia/Reperfusion Injury </el-link>
                    <p style="margin-top: 10px;margin-left: 37px;">Dongshen Xu</p>
                    <p style="margin-bottom: 10px;margin-left: 37px; font-weight: lighter; color: darkgray;">ACS Chemical Neuroscience</p>
                  </div>
                </div>
              </div>
            </el-card>

            <el-card style="height: 130px; width: 1400px;" shadow="hover" >
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                  <el-icon size="110px"><Document /></el-icon>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; width: 1000px;">
                    <el-link :underline="false" style="margin-top: -10px;margin-left: 37px; font-size: 16px; font-weight: bold;" @click.native="$router.push('/123.pdf')">Vascular Endothelial Cell-derived Exosomes Protect Neural Stem Cells Against Ischemia/reperfusion Injury  </el-link>
                    <p style="margin-top: 10px;margin-left: 37px;">Dongshen Xu</p>
                    <p style="margin-bottom: 10px;margin-left: 37px; font-weight: lighter; color: darkgray;">Neuroscience</p>
                  </div>
                </div>
              </div>
            </el-card>

            <el-card style="height: 130px; width: 1400px;" shadow="hover" >
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                  <el-icon size="110px"><Document /></el-icon>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; width: 1000px;">
                    <el-link :underline="false" style="margin-top: -10px;margin-left: 37px; font-size: 16px; font-weight: bold;" @click.native="$router.push('/123.pdf')">Multi-target synergistic enhanced neural circuit modulation: thinking and innovation  </el-link>
                    <p style="margin-top: 10px;margin-left: 37px;">Dongshen Xu</p>
                    <p style="margin-bottom: 10px;margin-left: 37px; font-weight: lighter; color: darkgray;">Journal of Sichuan University (Medical Sciance Edition)</p>
                  </div>
                </div>
              </div>
            </el-card>

            <el-card style="height: 130px; width: 1400px;" shadow="hover" >
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                  <el-icon size="110px"><Document /></el-icon>
                  <div style="display: flex; flex-direction: column; align-items: flex-start; width: 1000px;">
                    <el-link :underline="false" style="margin-top: -10px;margin-left: 37px; font-size: 16px; font-weight: bold;" @click.native="$router.push('/123.pdf')">Paired associated magnetic stimulation promotes neural repair in the rat middle cerebral artery occlusion model of stroke</el-link>
                    <p style="margin-top: 10px;margin-left: 37px;">Dongshen Xu</p>
                    <p style="margin-bottom: 10px;margin-left: 37px; font-weight: lighter; color: darkgray;">Noural Regeneration Reseatch</p>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>

      </el-container>
    </el-row>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTransition } from '@vueuse/core'
import IndexProfessorAvatar from "@/component/index-professor-avatar.vue";
// TODO 进入首页首先请求useUserStore，获取需要展示的学者

export default {
  name: 'HomeView',
  components: {IndexProfessorAvatar},
  setup() {
    const activeIndex = ref('1')
    const registerVisible = ref(false)
    const input1 = ref('')
    const source = ref(0)
    const source1 = ref(0)
    const progress = useTransition(source, {
      duration: 1000,
    })
    source.value = 1200
    const analyze = useTransition(source1, {
      duration: 1000,
    })
    source1.value = 1200
    const value = ref('')
    const options = [
      {
        value: 'Option1',
        label: 'Option1',
      },
      {
        value: 'Option2',
        label: 'Option2',
      },
      {
        value: 'Option3',
        label: 'Option3',
      },
      {
        value: 'Option4',
        label: 'Option4',
      },
      {
        value: 'Option5',
        label: 'Option5',
      },
    ]
    const activeName = ref('first')
    const account =ref('')
    const password =ref('')
    const phone =ref('')
    const code =ref('')
    function handelregisterVisible() {
      registerVisible.value = true
    }
    return{
      activeIndex,
      input1,
      registerVisible,
      progress,
      analyze,
      handelregisterVisible,
      value,
      options,
      activeName,
      account,
      password,
      phone,
      code
    }
  },
}
</script>

<style lang="scss">
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
</style>
