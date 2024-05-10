import {create} from 'zustand'

type contextUserType = {
    data: object
    token: string
    payload: string
    setData: (value: {}) => void
    setToken: (value: any) => void
    setPayload: (value: any) => void
}



export const useContextUserAuth = create<contextUserType>()( (set) => ({
    data: {},
    token: "",
    payload: "",
    setData: (value) => set({data: value}),
    setToken: (value) => set({token: value}),
    setPayload: (value) => set({payload: value})
}) )