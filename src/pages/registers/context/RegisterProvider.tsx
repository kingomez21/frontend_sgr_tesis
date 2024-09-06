import { useState } from "react"
import RegisterContext from "./RegisterContext"

const RegisterProvider = ({children}) => {

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
            setRegisterRawMaterial
         }}>
            {children}
        </RegisterContext.Provider>
    )
}

export default RegisterProvider