import { State, TypeShowAuth } from './state'


export const mutations = {
  setShowAuth(state: State, val: TypeShowAuth): void {
    state.showAuth = val
  },
}
