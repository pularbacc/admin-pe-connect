import { Plugin } from '@nuxt/types'

export const linkFile = (idFile: string): string  => {
  const baseUrl = process.env.BASE_URL_API
  if(!baseUrl) {
    throw  new Error('Not found base url api')
  }
  const link = `${baseUrl}/files/load/${idFile}`
  return link
}

const linkFilePlugin: Plugin = (_ , inject) => {
  inject('linkFile', linkFile )
}

export default linkFilePlugin
