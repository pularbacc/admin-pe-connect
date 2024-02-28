import { State, TypeShowAuth } from './state'

export default {
  getShowAuth: (state: State): TypeShowAuth => state.showAuth,
}
  