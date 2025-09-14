import { useState } from "react"
import styles from "./Inputs.module.css"

const Inputs = ({ imc, setImc }) => {
    const [altura, setAltura] = useState("");
    const [peso, setPeso] = useState("");

    const calculate = (e) => {
        e.preventDefault();
        const num1 = Number(altura);
        const num2 = Number(peso);
        if (num1 > 0 && num2 > 0) {
            setImc(num2 / (num1 * num1));
        }
    };
    
    return(
        <div className={styles.container}>
            <form onSubmit={calculate}>
                <label>
                    Altura (m)
                    <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="Metros" min="0.5" max="2.5" step="0.01"/>
                </label>
                <label>
                    Peso (kg)
                    <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Quilos" min="10" max="300"/>
                </label>
                    <button type="submit">Calcular</button>
            </form>
            <div className={styles.results}>
                <p>O seu IMC é: </p>
                <span>{imc ? imc.toFixed(2) : "—"}</span>
            </div>
        </div>
    )   
}

export default Inputs