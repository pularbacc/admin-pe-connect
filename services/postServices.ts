import { AxiosInstance } from 'axios'
import { errServicesHandler, validationHandler } from '.'
import { IPostReq, IPostRes, IPostLikeRes, IPostCommentRes, IPostCommentReq, schemaComment, schemaPost } from '~/types/post'

export default class PostServices {
  private axios: AxiosInstance
  public constructor(axios: AxiosInstance) {
    this.axios = axios
  }
  
  public async getListPost(): Promise<Array<IPostRes>> {
    const url = '/posts'
    return await this.axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async detailPost(id: number | string): Promise<IPostRes> {
    const url = `/posts/${id}`
    return await this.axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async likePost(id: number): Promise<IPostLikeRes> {
    const url = `/posts/${id}/like`
    return await this.axios
      .post(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async commentPost(id: number, data: IPostCommentReq): Promise<IPostCommentRes> {
    validationHandler(data, schemaComment)
    const url = `/posts/${id}/comment`
    return await this.axios
      .post(url, data)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async createPost(data: IPostReq): Promise<IPostRes> {
    validationHandler(data, schemaPost)
    const url = '/posts'
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
