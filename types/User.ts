/**使用者清單單列資料 */
export interface UserData{
    age:number|null,
    id:number,
    name:string|null,
}

/**api回傳結果 */
export interface ApiResponse<T> {
  code: number
  data: T
  message: string
}