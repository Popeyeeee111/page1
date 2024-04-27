<!--
-- @author Santa Antilles
-- @description
-- @date 2024/4/27-15:17:37
-->

<script setup>
const props = defineProps({
  menuName: String
})
</script>

<template>
  <div style="width: 95%; margin-top: 30px;">
    <div style="font-size: 1.3rem; display: flex; font-weight: 500;">{{props.menuName}}</div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
*{
  text-align: justify;
}
</style>