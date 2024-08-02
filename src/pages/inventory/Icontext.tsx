import { gql, useQuery } from "@apollo/client"
import { createContext, useContext, useEffect, useState } from "react"
import { ClassificationsType, LoteSellType } from "./Itypes"
import { useContextUserAuth } from "../../store"

const GET_ALL_CLASSIFICATIONS_WITH_STATE = gql`
    query getAllClassfications($state: Boolean, $idCompany: String){
        classifications: getAllClassifications(state: $state, idCompany: $idCompany){
            id
            totalWeight
            idUserInfo{
            idPerson{
                firstName
                lastName
            }
            }
            idRawMaterial{
                idMaterialType{
                    id
                    name
                }
                materialName
                materialPricePerKg
                kgQuantity
            }
            idCompany{
            name
            nit
            }
            idLoteSell{
            id
            productsQuantity
            sold
            }
            createdAt
        }
    }
`
const GET_ALL_CLASSIFICATIONS_WITHOUT_STATE = gql`
    query getAllClassfications($idCompany: String){
        classifications: getAllClassifications(idCompany: $idCompany){
            id
            totalWeight
            idUserInfo{
            idPerson{
                firstName
                lastName
            }
            }
            idRawMaterial{
                idMaterialType{
                    id
                    name
                }
                materialName
                materialPricePerKg
                kgQuantity
            }
            idCompany{
            name
            nit
            }
            idLoteSell{
            id
            productsQuantity
            sold
            }
            createdAt
        }
    }
`

const GET_ALL_LOTE_SELL = gql`
    query getAllLoteSell($idCompany: String){
        lotes: getAllLoteSell (idCompany: $idCompany){
            id
            material: idMaterialType{
                name
            }
            products: productsQuantity
            total: totalWeightLote
            sold
            createdAt
        }
    }

`



type InventoryContextTypes = {
    dataClassicationsStock: ClassificationsType[]
    dataClassifications: ClassificationsType[]
    dataLoteSell: LoteSellType[]
    updated: string
    setUpdated?
    aggProductsLote: ClassificationsType[]
    setAggProductsLote?
    deleteProductsLote?
    stock: ClassificationsType[]
    setStock?
    deleteStock?
    aggStockAfter?
    deleteAllProductsLote?
}
const InventoryContextData: InventoryContextTypes = {
    dataClassicationsStock: [],
    dataClassifications: [],
    dataLoteSell: [],
    updated: "",
    aggProductsLote: [],
    stock: []
}

const InventoryContext = createContext(InventoryContextData)


export const InventoryProvider = ({children}) => {

    const [updated, setUpdated] = useState("")
    const data = useContextUserAuth((state) => state.data)
    const [aggProductsLote, setAggProduct] = useState([])
    const [stock, setStock] = useState([])

    const cls_state = useQuery(GET_ALL_CLASSIFICATIONS_WITH_STATE, {
        variables: {
            state: false,
            idCompany: `${data.idCompany.id}`
        }
    })
    const cls = useQuery(GET_ALL_CLASSIFICATIONS_WITHOUT_STATE, {
        variables:{
            idCompany: `${data.idCompany.id}`
        }
    })
    const lotes = useQuery(GET_ALL_LOTE_SELL, {
        variables: {
            idCompany: `${data.idCompany.id}`
        }
    })

    const aggProduct = (v: ClassificationsType[]) => {
        setAggProduct((prevState) => prevState.concat(v))
    }

    const deleteProductsLote = (v: number) => {
        setAggProduct((prevState) => prevState.filter((_, i) => i !== v))
    }

    const deleteAllProductsLote = () => {
        setAggProduct([])
    }

    const aggStock = (t: string) => {
        setStock(cls_state.data.classifications.filter((value) => value.idRawMaterial.idMaterialType.id === t))

    }

    const deleteStock = (v: number) => {
        setStock((prevState) => prevState.filter((_, i) => i !== v))
    }

    const aggStockAfter = (v: ClassificationsType) => {
        setStock((prevState) => prevState.concat(v))
    }

    useEffect( () => {
        cls_state.refetch()
        cls.refetch()
        lotes.refetch()
    }, [updated])
    
    return (
        <InventoryContext.Provider 
            value={{
                dataClassicationsStock: cls_state.loading ? [] : cls_state.data.classifications,
                dataClassifications: cls.loading ? [] : cls.data.classifications,
                dataLoteSell: lotes.loading ? [] : lotes.data.lotes,
                updated,
                setUpdated,
                aggProductsLote,
                setAggProductsLote: aggProduct,
                deleteProductsLote,
                stock,
                setStock: aggStock,
                deleteStock,
                aggStockAfter, 
                deleteAllProductsLote
            }}
        >
            {children}
        </InventoryContext.Provider>
    )
}

export function useInventoryContext() {
    return useContext(InventoryContext)
}