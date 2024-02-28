import { State, TypeNotiMess } from './state'


export const mutations = {
  setNotiMess(state: State, val: TypeNotiMess ): void {
    state.notiMess = val
  },
  clearNotiMess(state: State): void {
    state.notiMess = {}
  },
}
