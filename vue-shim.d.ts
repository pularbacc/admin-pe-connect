import AuthServices from '~/services/authServices'
import ProfileServices from '~/services/profileServices'
import PostServices from '~/services/postServices'
import PetServices from '~/services/petServices'
import ConversationServices from '~/services/conversationServices'
import UserServices from '~/services/userServices'
import ArticleServices from '~/services/articleServices'
import NotiSystemServices from '~/services/notiSystemServices'
import FileServices from '~/services/fileServices'
import ReportServices from '~/services/reportServices'

import { log } from '~/plugins/log'
import { linkFile } from '~/plugins/linkFile'
import { date } from '~/plugins/date'
import { getUser } from '~/plugins/users'

declare module 'vue/types/vue' {
  interface Vue {
    $api: {
      auth: AuthServices,
      profile: ProfileServices,
      post: PostServices,
      pet: PetServices,
      conversation: ConversationServices,
      user: UserServices,
      article: ArticleServices,
      notiSystem: NotiSystemServices,
      file: FileServices,
      report: ReportServices,
    },
    $log: typeof log,
    $linkFile: typeof linkFile,
    $date: typeof date,
    $getUser: typeof getUser
  }
}
