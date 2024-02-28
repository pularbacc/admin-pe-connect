import { AxiosInstance } from 'axios'
import { errServicesHandler } from '.'
import { IPetReq, IPetRes } from '~/types/pet'

export default class ProfileServices {
  private axios: AxiosInstance
  public constructor(axios: AxiosInstance) {
    this.axios = axios
  }

  public async detailProfilePet(idProfile: number | string): Promise<IPetRes> {
    const url = `/pets/${idProfile}`
    return await this.axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async createProfilePet(data: IPetReq): Promise<IPetRes> {
    const url = '/pets'
    return await this.axios
      .post(url, data)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async updateProfilePet(id: string | number, data: IPetReq): Promise<IPetRes> {
    const url = `/pets/${id}`
    return await this.axios
      .patch(url, data)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async getPetsByUser(profileId: number): Promise<Array<IPetRes>> {
    const url = `/pets?profile_id=${profileId}`
    return await this.axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async getPets(): Promise<Array<IPetRes>> {
    const url = '/pets'
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
