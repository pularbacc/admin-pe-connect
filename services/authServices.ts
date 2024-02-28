import { AxiosInstance } from 'axios'
import { Auth } from '@nuxtjs/auth-next'
import { errServicesHandler, validationHandler } from '.'
import {
  ILoginReq,
  ILoginRes,
  IRegisterReq,
  IUserRes,
  schemaLogin,
  schemaRegister,
} from '~/types/auth'

export default class AuthServices {
  private axios: AxiosInstance
  public constructor(axios: AxiosInstance) {
    this.axios = axios
  }

  public async login(auth: Auth, dataLogin: ILoginReq): Promise<ILoginRes> {
    validationHandler(dataLogin, schemaLogin)
    return await auth
      .loginWith('local', { data: dataLogin })
      .then((res: any) => {
        return res.data
      })
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async register(data: IRegisterReq): Promise<IUserRes> {
    validationHandler(data, schemaRegister)
    const url = '/auth/register'
    return await this.axios
      .post(url, data)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }
}
