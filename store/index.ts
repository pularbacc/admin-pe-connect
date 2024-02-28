import Vuex from 'vuex'

import authModule from './auth'
import usersModule from './users'
import notiMessModule from './notiMess'

const createStore = (): any => {
  return new Vuex.Store({
    state: {
          
    },
    mutations: {
           
    },
    actions: {
			
    },
    getters: {
           
    },
    modules: {
      authCus: authModule,
      users: usersModule,
      notiMess: notiMessModule,
    },
  })
}

export default createStore