import { Commit } from 'vuex'
import { TypeNotiMess } from './state'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let timeout: any

export const actions = {
  setNotiMess({commit}: { commit: Commit }, val: TypeNotiMess): void{
    commit('clearNotiMess')
    timeout = undefined

    val.show = true
    commit('setNotiMess', val)
    timeout = setTimeout(() => {
      commit('clearNotiMess')
    }, 5000) 
  },
  clearNotiMess({commit}: {commit: Commit}): void {
    commit('clearNotiMess')
  },
}