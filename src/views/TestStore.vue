<!--
-- @author Santa Antilles
-- @description
-- @date 2024/4/26-21:01:23
-->

<script setup>
import {useProfessorStore} from "@/store";
// 教授信息数据共享组件
const professorStore = useProfessorStore();
import {storeToRefs} from "pinia";
const {professor, professorFruit} = storeToRefs(professorStore)
console.log(professorFruit.value)
console.log(professor.value)

</script>

<template>

</template>

<style scoped lang="scss">

</style>