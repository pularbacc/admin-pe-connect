import { AxiosInstance } from 'axios'
import { errServicesHandler } from '.'
import { IUserRes } from '~/types/auth'

export default class UserServices {
  private axios: AxiosInstance
  public constructor(axios: AxiosInstance) {
    this.axios = axios
  }

  public async getUsers(): Promise<Array<IUserRes>> {
    const url = '/users'
    return await this.axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }
}
