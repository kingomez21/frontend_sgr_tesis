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
}
const InventoryContextData: InventoryContextTypes = {
    dataClassicationsStock: [],
    dataClassifications: [],
    dataLoteSell: [],
    updated: "",

}

const InventoryContext = createContext(InventoryContextData)


export const InventoryProvider = ({children}: any) => {

    const [updated, setUpdated] = useState("")
    const data = useContextUserAuth((state) => state.data)
    const [dataClassications_state, setDataClassifications_state] = useState([])
    const [dataClassifications, setDataClassifications] = useState([])
    const [dataLoteSell, setDataLoteSell] = useState([])

    const [classifications_state] = useLazyQuery(GET_ALL_CLASSIFICATIONS_WITH_STATE)
    const [classifications] = useLazyQuery(GET_ALL_CLASSIFICATIONS_WITHOUT_STATE)
    const [lotes] = useLazyQuery(GET_ALL_LOTE_SELL)

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
                setUpdated
            }}
        >
            {children}
        </InventoryContext.Provider>
    )
}

export function useInventoryContext() {
    return useContext(InventoryContext)
}