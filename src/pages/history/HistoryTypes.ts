
type idMaterialType = {
    name: string
}

type idPayType = {
    platformName: string
}

type idProvider = {
    nit: string
    fullName: string
    address: string
    place: string
    cellphone: string
    email: string
    isActive: boolean
}

type idDate = {
    id: string
    meetDate: string 
    meetPlace: string
    createdAt: string
    proveedor: idProvider
}

type idRoute = {
    id: string
    initPlace: string
    destinyPlace: string
    createdAt: string
    cita: idDate
}

type idCollection = {
    id: string
    materialsQuantity: number
    spentMoney: number
    idPayType: idPayType
    createdAt: string
    ruta: idRoute
}

type idRawMaterial = {
    id: string
    idMaterialType: idMaterialType
    kgQuantity: number
    materialPricePerKg: number
    coleccion: idCollection
    idProvider?: idProvider
}

type idPerson = {
    identityNumber: number
    documentType: string
    firstName: string
    lastName: string
    homeAddress: string
    neighborhood: string
    phoneNumber1: string
    phoneNumber2: string
    gender: string
    admissionDate: string
    jobPosition: string
    birthday: string
    maritalStatus: string
    bloodType: string
    createdAt: string
}

type idUserRolInPermission = {
    nameView: string
    isActive: boolean
      
}

type idUserRol = {
    idUserRolInPermission: idUserRolInPermission[]
}

type idUserInfo = {
    persona: idPerson
    roles: idUserRol
}

type idClient = {
    nit: string
    fullName: string
    address: string
    place: string
    cellphone: string
    email: string
    isActive: boolean
}

type idLoteSellInReceiptSell = {
    id: string
    cliente: idClient
    date: string
    idPayType: idPayType
    productPricePerKg: number
    totalPrice: number
}

type idLoteSell = {
    id: string
    idMaterialType: idMaterialType
    productsQuantity: number
    totalWeightLote: number
    sold: boolean
    createdAt: string
    venta: idLoteSellInReceiptSell[]
}

export type HistoryClassification = {
    id: string
    materiaPrima: idRawMaterial
    usuario: idUserInfo
    lote: idLoteSell
    totalWeight: number
}
