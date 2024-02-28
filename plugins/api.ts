import { Plugin } from '@nuxt/types'
import AuthServices from '~/services/authServices'
import PostServices from '~/services/postServices'
import ProfileServices from '~/services/profileServices'
import PetServices from '~/services/petServices'
import ConversationServices from '~/services/conversationServices'
import UserServices from '~/services/userServices'
import ArticleServices from '~/services/articleServices'
import NotiSystemServices from '~/services/notiSystemServices'
import FileServices from '~/services/fileServices'
import ReportServices from '~/services/reportServices'

const apiPlugin: Plugin = ({ $axios }, inject) => {
  const auth = new AuthServices($axios)
  const profile = new ProfileServices($axios)
  const post = new PostServices($axios)
  const pet = new PetServices($axios)
  const conversation = new ConversationServices($axios)
  const user = new UserServices($axios)
  const article = new ArticleServices($axios)
  const notiSystem = new NotiSystemServices($axios)
  const file = new FileServices($axios)
  const report = new ReportServices($axios)

  inject('api', {
    auth,
    profile,
    post,
    pet,
    conversation,
    user,
    article,
    notiSystem,
    file,
    report,
  })
}

export default apiPlugin
