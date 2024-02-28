export type TypeShowAuth = 
  false | 
  'LOGIN' | 
  'REGISTER' | 
  'CREATE_PROFILE' |
  'UPDATE_PROFILE' |
  'CREATE_PROFILE_PET' |
  'UPDATE_PROFILE_PET'

export interface State {
    showAuth: TypeShowAuth
}

export const state = ():State => ({
  showAuth: false,
})