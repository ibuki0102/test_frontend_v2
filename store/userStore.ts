import cloneDeep from 'lodash-es/cloneDeep'
import type { UserData } from '~/types/User'

export const useUserStore = defineStore('userStore', () => {
  /**使用者預設資料 */
  const defaultUserData: UserData = {
    id: 0,
    name: '',
    age: null,
  }
  /**使用者資料 */
  const userData: Ref<UserData> = ref(cloneDeep(defaultUserData))

  return {
    userData,
  }
})
