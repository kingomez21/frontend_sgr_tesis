import { gql, useQuery } from "@apollo/client"
import HistoryContext from "./historyContext"
import { useContextUserAuth } from "../../../store"

const GET_ALL_CLASSIFICATIONS = gql`
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

const HistoryProvider = ({children}) => {

    const dataUser = useContextUserAuth((state) => state.data)

    const data = useQuery(GET_ALL_CLASSIFICATIONS,
        {
            variables: {
                idCompany: `${dataUser.idCompany.id}`
            }
        }
    )

    return (
        <HistoryContext.Provider
            value={{
                dataClassifications: data.loading ? [] : data.data.classifications
            }}
        >
            {children}
        </HistoryContext.Provider>
    )
}


export default HistoryProvider