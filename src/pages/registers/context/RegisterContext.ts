import { createContext } from "react"
import { dataProcedureType, dataProviders, dataUsers, RegisterAppointment, RegisterClassification, RegisterGathering, RegisterRawMaterial, RegisterRoute } from "../RegisterTypes"

type RegisterContextType = {
    dataRegisterAppointment: RegisterAppointment
    dataRegisterRoute: RegisterRoute
    dataRegisterGathering: RegisterGathering
    dataRegisterClassification: RegisterClassification
    dataRegisterRawMaterial: RegisterRawMaterial
    setRegisterAppointment?
    setRegisterRoute?
    setRegisterGathering?
    setRegisterClassification?
    setRegisterRawMaterial?
    dataProviders: dataProviders[]
    dataUsers: dataUsers[]
    dataProcedureType: dataProcedureType[]
}

const registerContext: RegisterContextType = {
    dataRegisterAppointment: null,
    dataRegisterRoute: null,
    dataRegisterGathering: null,
    dataRegisterClassification: null,
    dataRegisterRawMaterial: null,
    dataProviders: null,
    dataUsers: null,
    dataProcedureType: null
}



const RegisterContext = createContext(registerContext)

export default RegisterContext

