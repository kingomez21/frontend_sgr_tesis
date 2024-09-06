import { createContext } from "react"
import { RegisterAppointment, RegisterClassification, RegisterGathering, RegisterRawMaterial, RegisterRoute } from "../RegisterTypes"

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
}

const registerContext: RegisterContextType = {
    dataRegisterAppointment: null,
    dataRegisterRoute: null,
    dataRegisterGathering: null,
    dataRegisterClassification: null,
    dataRegisterRawMaterial: null
}



const RegisterContext = createContext(registerContext)

export default RegisterContext

