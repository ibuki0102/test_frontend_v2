<template>
  <div class="flex flex-col gap-2">
    <label :for="label">{{ label }}</label>
    <input :id="label" class="bg-transparent border rounded-md h-10 px-2" :value="props.value" @input="onInput" :type="props.type" min="1"/>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string // 若使用者有輸入，以使用者輸入的為主，若沒有請產出一個唯一 ID
  label?: string
  type:string
  value:string|number|null
}

const emit = defineEmits<{
  (e: 'update:value', value: string|number|null): void
}>()

const props = withDefaults(defineProps<Props>(), {
  id:'',
  value:''
})

/**輸入值 */
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const val = target.value;

  const parsed = props.type === 'number' ? Number(val) : val;
  emit('update:value', parsed);
};
</script>

<style scoped lang="scss"></style>
