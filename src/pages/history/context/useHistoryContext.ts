import { useContext } from "react"
import HistoryContext from "./historyContext"

const useHistoryContext = () => {
    return useContext(HistoryContext)
}

export default useHistoryContext