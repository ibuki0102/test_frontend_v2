import type { ApiResponse, UserData, IdData } from '~/types/User'

/**取得使用者清單 */
export async function getUsers(fromServer: boolean = true): Promise<ApiResponse<UserData[]>> {
  const api = createApi(fromServer)
  return (await api.get<ApiResponse<UserData[]>>('/user')).data
}

/**編輯使用者 */
export async function editUser(userData: UserData): Promise<ApiResponse<string>> {
  const api = createApi(false)
  return (await api.put<ApiResponse<string>>('/user', userData)).data
}

/**新增使用者 */
export async function addUser(userData: UserData): Promise<ApiResponse<string>> {
  const api = createApi(false)
  return (await api.post<ApiResponse<string>>('/user', userData)).data
}

/**刪除使用者 */
export async function deleteUser(idData: IdData): Promise<ApiResponse<string>> {
  const api = createApi(false)
  return (await api.delete<ApiResponse<string>>('/user', { data: idData })).data
}
