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

type idLoteSellType = {
    id: string
    productsQuantity: number
    sold: boolean
}

type materialType = {
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
    idLoteSell: idLoteSellType
    createdAt: string
}

export type LoteSellType = {
    id: string
    material: materialType
    products: number
    total: number
    sold: boolean
    cls?: ClassificationsType[]
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