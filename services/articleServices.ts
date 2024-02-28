import { AxiosInstance } from 'axios'
import { errServicesHandler, validationHandler } from '.'
import { IArticleReq, IArticleRes, IArticleLikeRes, IArticleCommentRes, IArticleCommentReq, schemaComment, schemaArticle } from '~/types/article'

export default class ArticleServices {
  private axios: AxiosInstance
  public constructor(axios: AxiosInstance) {
    this.axios = axios
  }
  
  public async getListArticle(): Promise<Array<IArticleRes>> {
    const url = '/articles'
    return await this.axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async detailArticle(id: number | string): Promise<IArticleRes> {
    const url = `/articles/${id}`
    return await this.axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async likeArticle(id: number): Promise<IArticleLikeRes> {
    const url = `/articles/${id}/like`
    return await this.axios
      .post(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async commentArticle(id: number, data: IArticleCommentReq): Promise<IArticleCommentRes> {
    validationHandler(data, schemaComment)
    const url = `/articles/${id}/comment`
    return await this.axios
      .post(url, data)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async createArticle(data: IArticleReq): Promise<IArticleRes> {
    validationHandler(data, schemaArticle)
    const url = '/articles'
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
