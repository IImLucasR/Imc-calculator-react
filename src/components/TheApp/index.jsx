import IMCBar from "../IMCBar"
import Introduction from "../Intruduction"
import Inputs from "../Inputs"

import styles from "./TheApp.module.css"
import { useState } from "react"


const Calculator = () => {
    const [imc, setImc] = useState(0);

    return (
        <div className={styles.container}>
            <Introduction/>
            <IMCBar imc={imc}/>
            <Inputs imc={imc} setImc={setImc}/>
        </div>
    )
}

export default Calculator