import { gql, useLazyQuery } from "@apollo/client"
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
    setUpdated?: any
    aggProductsLote: ClassificationsType[]
    setAggProductsLote?: any
    deleteProductsLote?: any
    stock: ClassificationsType[]
    setStock?: any
    deleteStock?: any
    aggStockAfter?: any
    deleteAllProductsLote?: any
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


export const InventoryProvider = ({children}: any) => {

    const [updated, setUpdated] = useState("")
    const data = useContextUserAuth((state) => state.data)
    const [dataClassications_state, setDataClassifications_state] = useState([])
    const [dataClassifications, setDataClassifications] = useState([])
    const [dataLoteSell, setDataLoteSell] = useState([])
    const [aggProductsLote, setAggProduct] = useState([])
    const [stock, setStock] = useState([])

    const [classifications_state] = useLazyQuery(GET_ALL_CLASSIFICATIONS_WITH_STATE)
    const [classifications] = useLazyQuery(GET_ALL_CLASSIFICATIONS_WITHOUT_STATE)
    const [lotes] = useLazyQuery(GET_ALL_LOTE_SELL)

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
        setStock(dataClassications_state.filter((value) => value.idRawMaterial.idMaterialType.id === t))

    }

    const deleteStock = (v: number) => {
        setStock((prevState) => prevState.filter((_, i) => i !== v))
    }

    const aggStockAfter = (v: ClassificationsType) => {
        setStock((prevState) => prevState.concat(v))
    }

    useEffect( () => {
        classifications_state({
            variables: {
                state: false,
                idCompany: `${data.idCompany.id}`
            }
        }).then( (data) => {
            setDataClassifications_state(data.data.classifications)
            data.refetch()
        }).catch((err) => console.error(err))
        .finally()

        classifications({
            variables:{
                idCompany: `${data.idCompany.id}`
            }
        }).then( (data) => {
            setDataClassifications(data.data.classifications)
            data.refetch()
        }).catch((err) => console.error(err))
        .finally()

        lotes({
            variables: {
                idCompany: `${data.idCompany.id}`
            }
        })
        .then((data) => {
            setDataLoteSell(data.data.lotes)
            data.refetch()
        })
        .catch((err) => console.log(err))
        .finally()

    }, [updated])
    
    return (
        <InventoryContext.Provider 
            value={{
                dataClassicationsStock: dataClassications_state,
                dataClassifications,
                dataLoteSell,
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