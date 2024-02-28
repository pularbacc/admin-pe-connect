import { Commit } from 'vuex'
import { IProfileInfoRes } from '~/types/profile'

export const actions = {
  addUser({commit}: { commit: Commit }, user: IProfileInfoRes): void{
    commit('addUser', user)
  },
}