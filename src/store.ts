import {create} from 'zustand'

type contextUserType = {
    data: any
    token: string
    payload: string
    title: string
    permissions: any
    refreshPermission: any
    setData: (value: {}) => void
    setToken: (value: any) => void
    setPayload: (value: any) => void
    setTitle: (value: any) => void
    setPermissions: (value: any) => void
    setRefreshPermission: (value: any) => void
}



export const useContextUserAuth = create<contextUserType>()( (set) => ({
    data: null,
    token: null,
    payload: null,
    title: "PANEL PRINCIPAL",
    permissions: null,
    refreshPermission: null,
    setData: (value) => set({data: value}),
    setToken: (value) => set({token: value}),
    setPayload: (value) => set({payload: value}),
    setTitle: (value) => set({title: value}),
    setPermissions: (value) => set({permissions: value}),
    setRefreshPermission: (value) => set({refreshPermission: value})
}) )