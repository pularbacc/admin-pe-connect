import { IProfileInfoRes } from '~/types/profile'

export type TypeShowAuth = false | 'LOGIN' | 'REGISTER'

export interface State {
  users: Array<IProfileInfoRes>
}

export const state = (): State => ({
  users: [],
})
