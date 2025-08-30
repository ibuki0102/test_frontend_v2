<template>
  <div class="bg-gray-900 text-white min-h-screen flex items-center justify-center">
    <div class="space-y-6 w-full max-w-2xl">
      <div class="flex justify-end gap-4">
        <!-- 中文 -->
        <EBtn
          color="success"
          :text="t('chinese')"
          class="px-3 py-1 rounded-md"
          @click="onSwitchLang('zh-TW')"
          :active="locale === 'zh-TW'"
        />
        <!-- 英文 -->
        <EBtn
          color="warn"
          :text="t('english')"
          class="px-3 py-1 rounded-md text-black"
          @click="onSwitchLang('en-US')"
          :active="locale === 'en-US'"
        />
      </div>

      <!-- 表單 -->
      <div class="bg-gray-800 rounded-xl py-6 px-6 md:px-20 shadow-lg border border-gray-700">
        <h2 class="text-center text-xl font-semibold mb-6">{{ t('operate') }}</h2>
        <div class="space-y-4">
          <div>
            <!-- 名字 -->
            <ETextField
              :label="t('name')"
              class="text-white bg-transparent"
              v-model:value="userData.name"
              type="text"
              :required="true"
              :errors="errors?.name?.errors ?? []"
            />
          </div>
          <div>
            <!-- 年齡 -->
            <ETextField
              :label="t('age')"
              class="text-white bg-transparent"
              v-model:value="userData.age"
              type="number"
              :required="true"
              :errors="errors?.age?.errors ?? []"
            />
          </div>
          <div class="flex justify-end gap-4 pt-4">
            <!-- 修改 -->
            <EBtn
              v-if="currentMode === 'edit'"
              color="success"
              :text="t('edit')"
              class="px-3 py-1 rounded-md"
              @click="onEditConfirm"
            />
            <!-- 新增 -->
            <EBtn
              v-if="currentMode === 'add'"
              color="warn"
              :text="t('add')"
              class="px-3 py-1 rounded-md text-black"
              @click="onAddUser"
            />
            <!-- 取消 -->
            <EBtn
              v-if="currentMode === 'edit'"
              color="warn"
              :text="t('cancel')"
              class="px-3 py-1 rounded-md text-black"
              @click="onCancel"
            />
          </div>
        </div>
      </div>

      <!-- 表格 -->
      <div class="bg-gray-800 rounded-xl py-6 md:px-20 shadow-lg border border-gray-700">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="py-2 px-2 text-center">#</th>
              <th class="py-2 px-2 text-center">{{ t('name') }}</th>
              <th class="py-2 px-2 text-center">{{ t('age') }}</th>
              <th class="py-2 px-2 text-center">{{ t('operate') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr v-for="(user, index) of userList" :key="user.id">
              <td class="py-2 px-2 text-center">{{ index + 1 }}</td>
              <td class="py-2 px-2 text-center">{{ user.name }}</td>
              <td class="py-2 px-2 text-center">{{ user.age }}</td>
              <td class="py-2 px-2 space-x-2 text-center">
                <!-- 修改 -->
                <EBtn
                  color="success"
                  :text="t('edit')"
                  class="px-3 py-1 rounded-md"
                  @click="onEditUser(user.id)"
                />
                <!-- 刪除 -->
                <EBtn
                  color="error"
                  :text="t('delete')"
                  class="px-3 py-1 rounded-md text-black"
                  @click="onDeleteConfirm(user.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 確認跳窗 -->
    <ConfirmDialog ref="dialog" :title="dialogContent.header">
      <p>{{ dialogContent.content }}</p>
    </ConfirmDialog>
  </div>
</template>

<script setup lang="ts">
import type { UserData } from '~/types/User'
import { getUsers, addUser, editUser, deleteUser } from '~/api/user'
import { z } from 'zod'
import { cloneDeep } from 'lodash-es'
import { useUserStore } from '~/store/userStore'

const { t, locale } = useI18n()

const userStore = useUserStore()
const { userData } = storeToRefs(userStore)

/**當前上方區塊的模式 */
const currentMode: Ref<'add' | 'edit'> = ref('add')

/**跳窗 */
const dialog = ref()
/**跳窗內容 */
const dialogContent: Ref<{
  header: string
  content: string
}> = ref({
  header: '',
  content: '',
})

/**使用者預設資料 */
const defaultUserData: UserData = {
  id: 0,
  name: '',
  age: null,
}
/**使用者清單 */
const userList: Ref<UserData[]> = ref([])

/**所有錯誤 */
const errors: Ref<Record<string, { errors: string[] }> | null> = ref(null)

/**使用者驗證模型 */
const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: t('required') }),
  age: z.number({ error: t('required') }).min(1, { error: t('required') }),
})

/**變更語系 */
async function onSwitchLang(lang: 'zh-TW' | 'en-US') {
  locale.value = lang
  // 等待對應語系檔載入完成
  await nextTick()
}

/**新增使用者 */
async function onAddUser(): Promise<void> {
  dialogContent.value = {
    header: t('confirmTitle', { operate: t('add') }),
    content: t('confirmContent', { operate: t('add') }),
  }
  dialog.value.openDialog(async () => {
    const result = userSchema.safeParse(userData.value)
    if (result.error) {
      const treeufiedError = z.treeifyError(result.error).properties
      if (treeufiedError) {
        errors.value = treeufiedError
        nextTick(() => {
          dialogContent.value = {
            header: t('validationErrorHeader'),
            content: t('RequiredFieldError'),
          }
          dialog.value.openDialog()
        })
      }
    } else {
      errors.value = null
      const data = await addUser(userData.value)
      if (data?.code === 200) {
        nextTick(() => {
          dialogContent.value = {
            header: '',
            content: t('operateSuccess', { operate: t('add') }),
          }
          dialog.value.openDialog()
        })
        await getUserList(false)
        userData.value = cloneDeep(defaultUserData)
      }
    }
  })
}

/**編輯使用者(把資料帶上去) */
function onEditUser(id: number): void {
  const selectedUser = userList.value.find((userData) => userData.id === id)
  if (selectedUser) {
    userData.value = cloneDeep(selectedUser)
    currentMode.value = 'edit'
  }
}

/**新增使用者 */
async function onEditConfirm(): Promise<void> {
  dialogContent.value = {
    header: t('confirmTitle', { operate: t('edit') }),
    content: t('confirmContent', { operate: t('edit') }),
  }

  dialog.value.openDialog(async () => {
    const result = userSchema.safeParse(userData.value)
    if (result.error) {
      const treeufiedError = z.treeifyError(result.error).properties
      if (treeufiedError) {
        errors.value = treeufiedError
        nextTick(() => {
          dialogContent.value = {
            header: t('validationErrorHeader'),
            content: t('RequiredFieldError'),
          }
          dialog.value.openDialog()
        })
      }
    } else {
      errors.value = null
      const data = await editUser(userData.value)
      if (data?.code === 200) {
        nextTick(() => {
          dialogContent.value = {
            header: '',
            content: t('operateSuccess', { operate: t('edit') }),
          }
          dialog.value.openDialog()
        })
        await getUserList(false)
        userData.value = cloneDeep(defaultUserData)
        currentMode.value = 'add'
      }
    }
  })
}

/**刪除確認 */
async function onDeleteConfirm(id: number): Promise<void> {
  dialogContent.value = {
    header: t('confirmTitle', { operate: t('delete') }),
    content: t('confirmContent', { operate: t('delete') }),
  }
  dialog.value.openDialog(async () => {
    const data = await deleteUser({ id })
    if (data?.code === 200) {
      nextTick(() => {
        dialogContent.value = {
          header: '',
          content: t('operateSuccess', { operate: t('delete') }),
        }
        dialog.value.openDialog()
      })
      await getUserList(false)
      if (userData.value.id === id) {
        userData.value = cloneDeep(defaultUserData)
        currentMode.value = 'add'
      }
    }
  })
}

/**取消 */
function onCancel(): void {
  userData.value = cloneDeep(defaultUserData)
  currentMode.value = 'add'
}

/**取得資料清單 */
async function getUserList(fromServer: boolean = true) {
  const { data, error } = await useAsyncData('getUsers', async () => {
    const res = await getUsers(fromServer)
    return res.data
  })
  if (!error.value) {
    userList.value = data.value as UserData[]
  } else {
    console.error(error.value)
  }
}

await getUserList()
</script>

<style scoped lang="scss"></style>
