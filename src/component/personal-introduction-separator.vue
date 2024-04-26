<!--
-- @author Santa Antilles
-- @description
-- @date 2024/4/26-23:33:52
-->

<script setup>
const props = defineProps({
  menuName: String
})
</script>

<template>
  <div style="width: 95%">
    <p style="font-weight: bold;font-size: 1.5rem; display: flex">{{props.menuName}}</p>
    <hr style="margin-top: -20px">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">

</style>