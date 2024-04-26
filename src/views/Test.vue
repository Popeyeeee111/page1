<!--
-- @author Santa Antilles
-- @description 资源获取测试
-- @date 2024/4/26-01:15:49
-->

<script setup>
import {useProfessorStore} from "@/store";
import {storeToRefs} from "pinia";
const professorStore = useProfessorStore();
const {professors} = storeToRefs(professorStore)

</script>

<template>
{{professors}}
</template>

<style scoped lang="scss">

</style>