import {create} from 'zustand'

type contextUserType = {
    data: object
    token: string
    payload: string
    title: string
    setData: (value: {}) => void
    setToken: (value: any) => void
    setPayload: (value: any) => void
    setTitle: (value: any) => void
}



export const useContextUserAuth = create<contextUserType>()( (set) => ({
    data: {},
    token: null,
    payload: null,
    title: "PANEL PRINCIPAL",
    setData: (value) => set({data: value}),
    setToken: (value) => set({token: value}),
    setPayload: (value) => set({payload: value}),
    setTitle: (value) => set({title: value})
}) )