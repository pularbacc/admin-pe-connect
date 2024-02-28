import { AxiosInstance } from 'axios'
import { errServicesHandler } from '.'
import { IProfileInfoRes, IProfileReq, IProfileRes } from '~/types/profile'

export default class ProfileServices {
  private axios: AxiosInstance
  public constructor(axios: AxiosInstance) {
    this.axios = axios
  }

  public async infoProfile(idProfile: string): Promise<IProfileInfoRes> {
    const url = `/profiles/info/${idProfile}`
    return await this.axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async detailProfile(idProfile: string): Promise<IProfileRes> {
    const url = `/profiles/${idProfile}`
    return await this.axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async myProfile(): Promise<IProfileRes> {
    const url = '/profiles'
    return await this.axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async updateProfile(data: IProfileReq): Promise<IProfileRes> {
    // validationHandler(data, schemaProfile)
    const url = '/profiles'
    return await this.axios
      .post(url, data)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async getAll(): Promise<Array<IProfileRes>> {
    const url = '/profiles/all'
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
