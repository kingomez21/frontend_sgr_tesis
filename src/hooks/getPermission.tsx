import { gql, useQuery } from "@apollo/client"
import { useEffect} from "react"
import { useContextUserAuth } from "../store"

const GET_PERMISSIONS_USER = gql`
query getPermissionOneUser($idUserRol: String){
  permissionsUser: getPermissionOneUser(idUserRol: $idUserRol){
    id
    nameView
    descriptionPermission
    isActive
    
  }
}

`

type dataPermission = {
  id: string
  nameView: string
  descriptionPermission: string
  isActive: boolean
}

type props = {
  dataPermissions: dataPermission[]
  namePermission: string
}

const GetPermission = (nameModulePermission: string) => {

  const dataP = useContextUserAuth((state) => state.data)
  const { data, loading, refetch } = useQuery(GET_PERMISSIONS_USER, {
    variables: {
      idUserRol: dataP !== null && dataP.rol !== null ? dataP.rol.id : "prueba"
    }
  })

  useEffect(() => {
    refetch()
  }, [nameModulePermission])

  return loading ? false : PermissionsView({dataPermissions: data.permissionsUser, namePermission: nameModulePermission})

}

const PermissionsView = ({dataPermissions, namePermission}: props) => {

  const result = dataPermissions.find((value) => {
      return value.nameView.trim().toUpperCase() === namePermission.trim().toUpperCase() && value.isActive === true
    }) ? true : false

  return result
}

export default GetPermission