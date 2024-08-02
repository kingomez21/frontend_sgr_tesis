type dataPersonType = {
    firstName: string
    lastName: string
}
type PersonType = {
    idPerson: dataPersonType
}

type companyType = {
    name: string
    nit: string
}

export type idLoteSellType = {
    id: string
    productsQuantity: number
    sold: boolean
}

export type materialType = {
    id?: string
    name: string
}

type rawMaterialType = {
    idMaterialType: materialType
    materialName: string
    materialPricePerKg: number
    kgQuantity: number
}

export type ClassificationsType = {
    id: string
    totalWeight: number
    idUserInfo: PersonType
    idRawMaterial: rawMaterialType
    idCompany: companyType
    idLoteSell?: idLoteSellType
    createdAt: string
}

type ClientType = {
    nit: string
    fullName: string
    address: string
    place: string
    cellphone: string
    email: string
}

type PayType = {
    name: string
}

type ReceiptSellType = {
    id: string
    client: ClientType
    date: string
    perkg: number
    totalPrice: number
    pay: PayType
}

export type LoteSellType = {
    id: string
    material: materialType
    products: number
    total: number
    sold: boolean
    cls?: ClassificationsType[]
    sell?: ReceiptSellType[]
    createdAt: string
} 

type getAllCounts = {
    sell: number
    stock: number
    cls: number
}
export type CountsInventory = {
    getAllCounts: getAllCounts
}