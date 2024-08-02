import { createContext } from "react"
import { ClassificationsType } from "../../inventory/Itypes"

type historyContextType = {
    dataClassifications: ClassificationsType[]
}

const historyContextData: historyContextType = {
    dataClassifications: []
}

const HistoryContext = createContext(historyContextData)

export default HistoryContext