import { AxiosInstance } from 'axios'
import { errServicesHandler } from '.'
import { IFileRes } from '~/types/file'

export default class FileServices {
  private axios: AxiosInstance
  public constructor(axios: AxiosInstance) {
    this.axios = axios
  }
  
  public async uploadFiles(data: any): Promise<Array<IFileRes>> {
    const url = '/files/uploads'
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
