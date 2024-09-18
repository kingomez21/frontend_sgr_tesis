import { createContext } from "react"
import { Appointments, Collections, dataProcedureType, dataProviders, dataUsers, idPayType, RegisterAppointment, RegisterClassification, RegisterGathering, RegisterRawMaterial, RegisterRoute, Routes } from "../RegisterTypes"

type RegisterContextType = {
    dataRegisterAppointment: RegisterAppointment
    dataRegisterRoute: RegisterRoute
    dataRegisterGathering: RegisterGathering
    dataRegisterClassification: RegisterClassification
    dataRegisterRawMaterial: RegisterRawMaterial
    appointments: Appointments[]
    routes: Routes[]
    collections: Collections[]
    updated: string
    setUpdated?
    setRegisterAppointment?
    setRegisterRoute?
    setRegisterGathering?
    setRegisterClassification?
    setRegisterRawMaterial?
    dataProviders: dataProviders[]
    dataUsers: dataUsers[]
    dataProcedureType: dataProcedureType[]
    dataPayTypes: idPayType[]
}

const registerContext: RegisterContextType = {
    dataRegisterAppointment: null,
    dataRegisterRoute: null,
    dataRegisterGathering: null,
    dataRegisterClassification: null,
    dataRegisterRawMaterial: null,
    appointments: null,
    routes: null,
    collections: null,
    updated: "",
    dataProviders: null,
    dataUsers: null,
    dataProcedureType: null,
    dataPayTypes: null
}



const RegisterContext = createContext(registerContext)

export default RegisterContext

