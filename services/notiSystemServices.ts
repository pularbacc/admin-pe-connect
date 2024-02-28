import { AxiosInstance } from 'axios'
import { errServicesHandler } from '.'
import { INotiSystemReq, INotiSystemRes } from '~/types/notiSystem'

export default class NotiSystemServices {
  private axios: AxiosInstance
  public constructor(axios: AxiosInstance) {
    this.axios = axios
  }
  
  public async getListNotiSystem(): Promise<Array<INotiSystemRes>> {
    const url = '/noti-systems'
    return await this.axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async detailNotiSystem(id: number | string): Promise<INotiSystemRes> {
    const url = `/noti-systems/${id}`
    return await this.axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async deleteNotiSystem(id: number | string): Promise<INotiSystemRes> {
    const url = `/noti-systems/${id}`
    return await this.axios
      .delete(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }


  public async createNotiSystem(data: INotiSystemReq): Promise<INotiSystemRes> {
    const url = '/noti-systems'
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
