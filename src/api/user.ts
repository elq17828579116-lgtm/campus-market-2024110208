import http from './http'

export interface UserData {
  id: number
  username: string
  password: string
  name: string
  college: string
  grade: string
  studentId: string
  joinDate: string
  publishedCount: number
  tradedCount: number
  followerCount: number
}

export type RegisterInput = Omit<UserData, 'id' | 'joinDate' | 'publishedCount' | 'tradedCount' | 'followerCount'>

export function getUsers() {
  return http.get<UserData[]>('/users')
}

export function createUser(data: Omit<RegisterInput, 'password'> & { password: string }) {
  return http.post<UserData>('/users', {
    ...data,
    joinDate: new Date().toISOString().slice(0, 7),
    publishedCount: 0,
    tradedCount: 0,
    followerCount: 0,
  })
}
