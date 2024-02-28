import { State, TypeNotiMess } from './state'

export default {
  getNotiMess: (state: State): TypeNotiMess => state.notiMess,
}
  