import { State } from './state'
import { IProfileInfoRes } from '~/types/profile'


export const mutations = {
  addUser(state: State, val: IProfileInfoRes): void {
    state.users.push(val)
  },
}
