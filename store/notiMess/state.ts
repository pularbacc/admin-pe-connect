export type TypeNotiMess = {
    show?: boolean,
    mess?: string,
    link?: string,
    open?: string,
    error?: boolean,
    bottom?: boolean,
}

export interface State {
    notiMess: TypeNotiMess
}

export const state = ():State => ({
  notiMess: {
    show: false,
    mess: '',
    link: '',
    open: '',
    error: false,
    bottom: false,
  },
})