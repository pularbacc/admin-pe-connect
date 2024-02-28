import { Plugin } from '@nuxt/types'
import { Context } from 'joi'
import { IProfileInfoRes } from '~/types/profile'

let getConext: Context | undefined

interface ICacheUser {
  id: number
  profileCall: Promise<any>
}
const cacheUsers: Array<ICacheUser> = []

export const getUser = async (id: number): Promise<IProfileInfoRes | undefined> => {
  if (!getConext) {
    return
  }
  
  const { store, $api } = getConext
  const users: Array<IProfileInfoRes> = store.getters['users/getUsers']

  const findUser = users.find((user) => user.id === id)
  if (findUser) {
    return findUser
  } else {
    const findCache = cacheUsers.find((cache: ICacheUser) => cache.id === id)
    if (findCache) {
      const dataFind = await findCache.profileCall.then((res) => {
        return res
      })
      return dataFind
    } else {
      try {
        const profileCall = $api.profile.infoProfile(id).then((data: IProfileInfoRes) => {
          store.commit('users/addUser', data)
          let i
          for (i = 0; i < cacheUsers.length; i++) {
            if (cacheUsers[i].id === id) {
              cacheUsers.splice(i, 1)
              break
            }
          }
          return data
        })

        const cacheUser = {
          id,
          profileCall,
        }
        cacheUsers.push(cacheUser)

        return profileCall
      } catch (e) {
        console.log(e)
      }
    }
  }
}

const getUserPlugin: Plugin = (context, inject) => {
  getConext = context
  inject('getUser', getUser)
}

export default getUserPlugin
