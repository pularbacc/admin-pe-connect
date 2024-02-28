import { Plugin } from '@nuxt/types'

/* eslint-disable no-console */

export const log = {
  log: console.log,
  
  warn: console.warn,

  error: console.error,
}

const logPlugin: Plugin = (_ , inject) => {
  inject('log', log )
}

export default logPlugin
