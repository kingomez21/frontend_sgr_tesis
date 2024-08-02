import { useContext } from "react"
import HistoryContext from "./HistoryContext"

const useHistoryContext = () => {
    return useContext(HistoryContext)
}

export default useHistoryContext