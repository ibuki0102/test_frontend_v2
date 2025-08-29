<template>
  <div class="bg-gray-900 text-white min-h-screen flex items-center justify-center">
    <div class="space-y-6 w-full max-w-2xl">
      <div class="flex justify-end gap-4">
        <EBtn
          color="success"
          :text="t('chinese')"
          class="px-3 py-1 rounded-md"
          @click="locale = 'zh-TW'"
          :active="locale === 'zh-TW'"
        />
        <EBtn
          color="warn"
          :text="t('english')"
          class="px-3 py-1 rounded-md text-black"
          @click="locale = 'en-US'"
          :active="locale === 'en-US'"
        />
      </div>

      <!-- 表單 -->
      <div class="bg-gray-800 rounded-xl py-6 px-6 md:px-20 shadow-lg border border-gray-700">
        <h2 class="text-center text-xl font-semibold mb-6">{{ t('operate') }}</h2>
        <div class="space-y-4">
          <div>
            <ETextField
              :label="t('name')"
              class="text-white bg-transparent"
              v-model:value="userData.name"
              type="text"
            />
          </div>
          <div>
            <ETextField
              :label="t('age')"
              class="text-white bg-transparent"
              v-model:value="userData.age"
              type="number"
            />
          </div>
          <div class="flex justify-end gap-4 pt-4">
            <EBtn color="success" :text="t('edit')" class="px-3 py-1 rounded-md" />
            <EBtn
              color="warn"
              :text="t('add')"
              class="px-3 py-1 rounded-md text-black"
              @click="onAddUser"
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
                <button class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md">
                  {{ t('edit') }}
                </button>
                <button class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md">
                  {{ t('delete') }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserData } from '~/types/User'
import { getUsers, addUser, editUser, deleteUser } from '~/api/user'
const { t, locale } = useI18n()

const baseUrl = '' // 後端網址 將由面試官提供

/**使用者資料 */
const userData: Ref<UserData> = ref({
  id: 0,
  age: null,
  name: '',
})
/**使用者清單 */
const userList: Ref<UserData[]> = ref([])

/**新增使用者 */
function onAddUser(): void {
  if (userData.value.age && userData.value.name) {
  }
}

getUsers().then((result) => {
  userList.value = result.data
})
</script>

<style scoped lang="scss"></style>
