import { AxiosInstance } from 'axios'
import { errServicesHandler, validationHandler } from '.'
import { IConversationRes, IMessageReq, IMessageRes, schemaMessage } from '~/types/conversation'

export default class ConversationServices {
  private axios: AxiosInstance
  public constructor(axios: AxiosInstance) {
    this.axios = axios
  }

  public async createConversation(idGuest: number | string): Promise<IConversationRes> {
    const url = `/conversations/${idGuest}`
    return await this.axios
      .post(url)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async sendMess(idConversation: number | string, data: IMessageReq): Promise<IMessageRes> {
    validationHandler(data, schemaMessage)
    const url = `/conversations/${idConversation}/messages/send`
    return await this.axios
      .post(url, data)
      .then((res) => res.data)
      .catch((e) => {
        const errMess = e.response.data.error
        errServicesHandler(errMess)
        throw errMess
      })
  }

  public async myConversations(): Promise<Array<IConversationRes>> {
    const url = '/conversations/my'
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
