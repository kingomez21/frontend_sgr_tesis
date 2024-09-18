import {create} from 'zustand'

type contextUserType = {
    data
    token: string
    payload: string
    title: string
    permissions
    refreshPermission
    setData: (value) => void
    setToken: (value) => void
    setPayload: (value) => void
    setTitle: (value) => void
    setPermissions: (value) => void
    setRefreshPermission: (value) => void
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