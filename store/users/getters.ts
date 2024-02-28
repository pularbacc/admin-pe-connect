import { State } from './state'
import { IProfileInfoRes } from '~/types/profile'

export default {
  getUsers: (state: State): Array<IProfileInfoRes> => state.users,
}
  