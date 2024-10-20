import { createContext } from "react"
import { Appointments, Classifications, Collections, dataProcedureType, dataProviders, dataRawMaterial, dataUsers, idPayType, materialType, RegisterAppointment, RegisterClassification, RegisterGathering, RegisterRawMaterial, RegisterRoute, Routes } from "../RegisterTypes"

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
    rawMaterials: dataRawMaterial[]
    materialTypes: materialType[]
    classifications?: Classifications[]
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
    dataPayTypes: null,
    rawMaterials: null,
    materialTypes: null,
    //classifications: null
}



const RegisterContext = createContext(registerContext)

export default RegisterContext

