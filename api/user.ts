import type { ApiResponse, UserData } from '~/types/User'

/**取得使用者清單 */
export async function getUsers(): Promise<ApiResponse<UserData[]>> {
  const api = createApi()
  return (await api.get<ApiResponse<UserData[]>>('/user')).data
}

/**編輯使用者 */
export async function editUser(userData: UserData): Promise<ApiResponse<string>> {
  const api = createApi()
  return (await api.put<ApiResponse<string>>('/user', userData)).data
}

/**新增使用者 */
export async function addUser(userData: UserData): Promise<ApiResponse<string>> {
  const api = createApi()
  return (await api.post<ApiResponse<string>>('/user', userData)).data
}

/**刪除使用者 */
export async function deleteUser(): Promise<ApiResponse<string>> {
  const api = createApi()
  return (await api.delete<ApiResponse<string>>('/user')).data
}
