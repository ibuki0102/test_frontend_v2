<template>
  <button :class="`e-btn-${props.color} hover:opacity-80 ${props.active ? 'border-2 border-white':''}` " @click="$emit('click')">
    <template v-if="props.text">{{ props.text }}</template>
    <template v-else><slot></slot></template>
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: 'success' | 'error' | 'warn' // 預設為 success
  active?:boolean,
}

const props = withDefaults(defineProps<Props>(), {
  text:'',
  color:'success',
  active:false,
})
</script>

<style scoped lang="scss">
.e-btn {
  // success 綠
  &-success {
    background-color: green;
    color: white;
  }

  // error 紅
  &-error {
    background-color: red;
    color: white;
  }

  // warn 黃
  &-warn {
    background-color: #fcbc3f;
  }
}
</style>
