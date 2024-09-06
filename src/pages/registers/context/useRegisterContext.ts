import { useContext } from "react";
import RegisterContext from "./RegisterContext";

const useRegisterContext = () => {
    return useContext(RegisterContext)
}

export default useRegisterContext