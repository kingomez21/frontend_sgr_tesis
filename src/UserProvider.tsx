import { gql, useMutation } from "@apollo/client"
import { createContext, useContext, useState } from "react"

const VERIFY_TOKEN = gql`
    mutation($tok: String!){
        verifyToken(token: $tok){
        payload
        }
    }
`

const PERSON_AUTH = gql`
query($user: String){
    getUserAuthInfo(username: $user){
      id
      idPerson{
        id
        identityNumber
        firstName
        lastName
        homeAddress
        neighborhood
        gender
        phoneNumber1
        phoneNumber2
        admissionDate
        jobPosition
        birthday
        maritalStatus
        bloodType
      }
      idCompany{
        id
        name
        nit
        address
        phoneNumber
        society
      }
      
    }
  }

`

type contextUserType = {
    data: object
    token: any
    setData: Function
    setToken: Function 
  }
  
  const contextUserData: contextUserType = {
    data: {},
    token: null,
    setData: () => {},
    setToken: () => {},
  }
  
  const ContextUser = createContext(contextUserData)
  
  
  export const UserProvider = ({children}: any) => {
    const [dataUser, setDataUser] = useState({})
    const [tokenUser, setTokenUser] = useState("")
    const [payload, setPayload] = useState(null)
    const [verifyToken, ] = useMutation(VERIFY_TOKEN)
    const [getUserAuthInfo, ] = useMutation(PERSON_AUTH)

    const setData = () => {
        verifyToken({
            variables: {
                tok: tokenUser
            }
        })
        .then( (data) => {
            setPayload(data.data.verifyToken.payload)
        })
        .catch( (err) => console.error(err))

        getUserAuthInfo({
            variables: {
                user: payload
            }
        })
        .then( (data) => {
            setDataUser(data.data.getUserAuthInfo)
        })
        .catch( (err) => console.error(err))

    }

    const setToken = (token: string) => {
        setTokenUser(token)
    }

    return (
        <ContextUser.Provider
            value={{
                data: dataUser,
                token: tokenUser,
                setData,
                setToken
            }}
        
        >
            {children}
        </ContextUser.Provider>
    )

  }

  export function useContextUserAuthNOUSE() {
    return useContext(ContextUser)
  }