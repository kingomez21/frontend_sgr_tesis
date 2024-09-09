

export type RegisterAppointment = {
    provider: string
    dateAppointment: string
    placeAppointment: string
}

export type RegisterRoute = {
    routeAppointment: string
    initPlaceRoute: string
    destinyPlaceRoute: string
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