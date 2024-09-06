

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