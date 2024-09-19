
export type RegisterAppointment = {
    provider: string
    dateAppointment: string
    placeAppointment: string
}

type idProvider = {
    id: string
    fullName: string
}

export type Appointments = {
    id: string
    idProvider: idProvider
    meetDate: string
    meetPlace: string
    isPending: boolean
}

export type RegisterRoute = {
    routeAppointment: string
    initPlaceRoute: string
    destinyPlaceRoute: string
}

type idDate = {
    id: string
    meetDate: string
    meetPlace: string
}

export type Routes = {
    id: string
    idDate: idDate
    initPlace: string
    destinyPlace: string
    isPending: boolean
}

type idRoute = {
    id: string
    initPlace: string
    destinyPlace: string
}

export type idPayType = {
    id: string
    platformName: string
}

export type Collections = {
    id: string
    idRoute: idRoute
    materialsQuantity: number
    spentMoney: number
    idPayType: idPayType
    isPending: boolean
}

export type RegisterGathering = {
    gatheringRoute: string
    payMethod: string
    materialQuantity: number
    moneySpent: number
}

export type RegisterClassification = {
    rawMaterialType: string
    userInfo: string
    procedureType: string
    totalWeight: number
}

export type RegisterRawMaterial = {
    rawMaterialGathering: string
    materialType: string
    kgQuantity: number
    pricePerKg: number
}

export type dataProviders = {
    id: string
    fullName: string
    nit: string
    address: string
    place: string
}

type idPerson = {
    identityNumber: number
    firstName: string
    lastName: string
}

export type dataUsers = {
    id: string
    idPerson: idPerson
}

export type dataProcedureType = {
    id: string
    procedureName: string
}

type idMaterialType = {
    name: string
}

type idCollection = {
    id: string
}

export type dataRawMaterial = {
    id: string
    idMaterialType: idMaterialType
    kgQuantity: number
    materialPricePerKg: number
    isPending: boolean
    idCollection: idCollection
}

export type materialType = {
    id: string
    name: string
}