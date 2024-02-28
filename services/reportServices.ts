import { AxiosInstance } from 'axios'
import { errServicesHandler } from '.'
import { IReportReq, IReportRes } from '~/types/report'

export default class ReportServices {
  private axios: AxiosInstance
  public constructor(axios: AxiosInstance) {
    this.axios = axios
  }

  public async getReports(): Promise<Array<IReportRes>> {
    const url = '/reports'
    return await this.axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async createReport(data: IReportReq): Promise<IReportRes> {
    const url = '/reports/create'
    return await this.axios
      .post(url, data)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async createBlock(data: IReportReq): Promise<IReportRes> {
    const url = '/reports/create/block'
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