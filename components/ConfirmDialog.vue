<template>
  <dialog ref="dialog" class="rounded-lg shadow-lg p-6 w-96">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">{{ props.title }}</h3>
      <button @click="closeDialog" class="text-gray-500 hover:text-gray-700 justify-self-end">
        &times;
      </button>
    </div>

    <div class="mb-6">
      <slot />
    </div>

    <div class="flex justify-center gap-2">
      <!-- 取消 -->
      <EBtn
        color="warn"
        :text="t('cancel')"
        class="px-3 py-1 rounded-md text-black"
        @click="closeDialog"
      />
      <!-- 確定 -->
      <EBtn color="success" :text="t('confirm')" class="px-3 py-1 rounded-md" @click="confirm" />
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'

interface Props {
  title: string
}
const props = defineProps<Props>()

const { t } = useI18n()

const dialog = ref<HTMLDialogElement | null>(null)
let confirmCallback: (() => void) | null = null

/**開跳窗 */
function openDialog(callback?: () => void) {
  confirmCallback = callback || null
  dialog.value?.showModal()
}

/**關掉窗 */
function closeDialog() {
  dialog.value?.close()
  confirmCallback = null
}

/**點確認 */
function confirm() {
  if (confirmCallback) confirmCallback()
  closeDialog()
}

// 將開跳窗&關跳窗方法暴露給父組件
defineExpose({
  openDialog,
  closeDialog,
})
</script>

<style scoped>
dialog::backdrop {
  background: rgba(0, 0, 0, 0.4);
}
</style>
