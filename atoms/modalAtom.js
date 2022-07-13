import { atom } from "recoil";

export const modalState = atom({
    key: 'modalState',
    default: false,
})

export  const  postIdState = atom({
    key: 'postIdState',
    default: '',
})

export  const  quitState = atom( {
    key: 'quitState',
    default: false
})


export const  deleteState = atom( {
    key: 'deleteState',
    default: false
})
