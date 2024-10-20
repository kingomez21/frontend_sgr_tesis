import { useEffect, useState } from "react"
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
const GET_APPOINTMENTS = gql`
query getAllDate($isPending: Boolean, $idCompany: String){
  getAllDate(isPending: $isPending, idCompany: $idCompany){
    id
    idProvider{
      id 
      fullName
    } 
    meetDate
    meetPlace
    isPending
  }
}`

const GET_ROUTES = gql`
query getAllRoute($isPending: Boolean, $idCompany: String){
  getAllRoute(isPending: $isPending, idCompany: $idCompany){
    id
    idDate{
      id
      meetDate
      meetPlace
    }
    initPlace
    destinyPlace
    isPending
  }
}`

const GET_COLLECTIONS = gql`
query getAllCollection($isPending: Boolean, $idCompany: String){
  getAllCollection(isPending: $isPending, idCompany: $idCompany){
    id
    idRoute{
      id
      initPlace
      destinyPlace
    }
    materialsQuantity
    spentMoney
    idPayType{
      id
      platformName
    }
    isPending
  }
}`

const GET_PAY_TYPES = gql`
query PayType{
  getAllPayType{
    id
    platformName
  }
}`

const GET_RAW_MATERIALS = gql`
query getRawMaterials($isPending: Boolean, $idCompany: String){
  materials: getAllRawMaterial(isPending: $isPending, idCompany: $idCompany){
    id
    idMaterialType{
      name
    }  
    kgQuantity
    materialPricePerKg
    isPending
    idCollection{
      id
    }
  }
}
`

const GET_MATERIALS_TYPE = gql`
  query getAllMaterials{
  getAllMaterialType{
    id
    name
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

    const dataProcedureType = useQuery(GET_PROCEDURE_TYPE)

    const dataAppointments = useQuery(GET_APPOINTMENTS, {
      variables: {
        isPending: true,
        idCompany: `${dataUser.idCompany.id}`
      },
      fetchPolicy: "no-cache"
    })

    const dataRoutes = useQuery(GET_ROUTES, {
      variables: {
        isPending: true,
        idCompany: `${dataUser.idCompany.id}`
      },
      fetchPolicy: "no-cache"
    })

    const dataCollections = useQuery(GET_COLLECTIONS, {
      variables: {
        isPending: true, 
        idCompany: `${dataUser.idCompany.id}`
      },
      fetchPolicy: "no-cache"
    })

    const dataRawMaterials = useQuery(GET_RAW_MATERIALS, {
      variables: {
        isPending: true, 
        idCompany: `${dataUser.idCompany.id}`
      },
      fetchPolicy: "no-cache"
    })

    const dataPayType = useQuery(GET_PAY_TYPES)
    const dataMaterialType = useQuery(GET_MATERIALS_TYPE)

    const [registerAppointment, setRegisterAppointment] = useState(null)
    const [registerRoute, setRegisterRoute] = useState(null)
    const [registerGathering, setRegisterGathering] = useState(null)
    const [registerClassification, setRegisterClassification] = useState(null)
    const [registerRawMaterial, setRegisterRawMaterial] = useState(null)
    const [updated, setUpdated] = useState(null)
 
    useEffect(() => {
      dataAppointments.refetch()
      dataRoutes.refetch()
      dataCollections.refetch()
      dataRawMaterials.refetch()
    }, [updated])

    return (
        <RegisterContext.Provider
         value={{
            dataRegisterAppointment: registerAppointment,
            dataRegisterRoute: registerRoute,
            dataRegisterGathering: registerGathering,
            dataRegisterClassification: registerClassification,
            dataRegisterRawMaterial: registerRawMaterial,
            appointments: dataAppointments.loading ? [] : dataAppointments.data.getAllDate,
            routes: dataRoutes.loading ? [] : dataRoutes.data.getAllRoute,
            collections: dataCollections.loading ? [] : dataCollections.data.getAllCollection,
            rawMaterials: dataRawMaterials.loading ? [] : dataRawMaterials.data.materials,
            updated,
            setUpdated,
            setRegisterAppointment,
            setRegisterRoute,
            setRegisterGathering,
            setRegisterClassification,
            setRegisterRawMaterial,
            dataProviders: providers.loading ? [] : providers.data.getAllProviders,
            dataUsers: dataUsers.loading ? [] : dataUsers.data.getAllUsers,
            dataProcedureType: dataProcedureType.loading ? [] : dataProcedureType.data.procedure,
            dataPayTypes: dataPayType.loading ? [] : dataPayType.data.getAllPayType,
            materialTypes: dataMaterialType.loading ? [] : dataMaterialType.data.getAllMaterialType
         }}>
            {children}
        </RegisterContext.Provider>
    )
}

export default RegisterProvider