import Joi, { ValidationResult } from 'joi'
import { log } from '~/plugins/log'

export const errServicesHandler = (e: string): void => {
  log.error('Services Handler Error:', e)
  // @ts-ignore
  $nuxt.$store.dispatch('notiMess/setNotiMess', {
    mess: e,
    error: true,
  })
}

export const validationHandler = (
  data: any,
  schema: Joi.ObjectSchema,
): void => {
  const { error }: ValidationResult = schema.validate(data)
  if (error) {
    const errorMess = error.details[0].message
    errServicesHandler(errorMess)
    throw errorMess
  }
}
