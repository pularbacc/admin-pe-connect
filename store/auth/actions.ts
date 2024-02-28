import { Commit } from 'vuex'
import { TypeShowAuth } from './state'

export const actions = {
  setShowAuth({commit}: { commit: Commit }, val: TypeShowAuth): void{
    commit('setShowAuth', val)
  },
}