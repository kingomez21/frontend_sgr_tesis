import { useState } from "react"
import RegisterContext from "./RegisterContext"
import { gql, useQuery } from "@apollo/client"
import { useContextUserAuth } from "../../../store"

const GET_PROVIDERS = gql`
query getAllProviders($idCompany: String) {
  getAllProviders(idCompany: $idCompany){
    id
    fullName
    nit
    address
    place
  }
}`

const GET_ALL_USERS = gql`
query getAllUsers($idCompany: String){
  getAllUsers(company: $idCompany){
    id
    idPerson{
      identityNumber
      firstName
      lastName
    }
  }
}

`

const GET_PROCEDURE_TYPE = gql`
query getProcedureTypes{
  procedure: getAllProcedureType{
    id
    procedureName
  }
}

`


const RegisterProvider = ({children}) => {

    const dataUser = useContextUserAuth((state) => state.data)
    const token = useContextUserAuth((state) => state.token)

    const providers = useQuery(GET_PROVIDERS, {
        variables: {
            idCompany: `${dataUser.idCompany.id}` 
        }
    })

    const dataUsers = useQuery(GET_ALL_USERS, {
        variables: {
            idCompany: `${dataUser.idCompany.id}` 
        },
        context: {
            headers: {
                "Authorization": `JWT ${token}` 
            }
        }
    })

    const dataProcedureType = useQuery(GET_PROCEDURE_TYPE, {
      variables: {
          idCompany: `${dataUser.idCompany.id}` 
      }
    })

    const [registerAppointment, setRegisterAppointment] = useState(null)
    const [registerRoute, setRegisterRoute] = useState(null)
    const [registerGathering, setRegisterGathering] = useState(null)
    const [registerClassification, setRegisterClassification] = useState(null)
    const [registerRawMaterial, setRegisterRawMaterial] = useState(null)

    return (
        <RegisterContext.Provider
         value={{
            dataRegisterAppointment: registerAppointment,
            dataRegisterRoute: registerRoute,
            dataRegisterGathering: registerGathering,
            dataRegisterClassification: registerClassification,
            dataRegisterRawMaterial: registerRawMaterial,
            setRegisterAppointment,
            setRegisterRoute,
            setRegisterGathering,
            setRegisterClassification,
            setRegisterRawMaterial,
            dataProviders: providers.loading ? [] : providers.data.getAllProviders,
            dataUsers: dataUsers.loading ? [] : dataUsers.data.getAllUsers,
            dataProcedureType: dataProcedureType.loading ? [] : dataProcedureType.data.procedure,
         }}>
            {children}
        </RegisterContext.Provider>
    )
}

export default RegisterProvider