import { Plugin } from '@nuxt/types'

export const date = {
  get: (time: string | Date): string => {
    const date = new Date(time)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  },
  convert: (time: string): Date => {
    return new Date(time)
  },
}

const datePlugin: Plugin = (_, inject) => {
  inject('date', date)
}

export default datePlugin
