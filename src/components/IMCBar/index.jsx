import styles from "./IMCBar.module.css";

const IMCBar = ({ imc }) => {

    const needlePosition = (valor) => {
        if (valor <= 0) return 0;
    
        const faixas = [
            { min: 0, max: 18.5, width: 360 },
            { min: 18.5, max: 24.9, width: 256.64 },
            { min: 25, max: 29.9, width: 196.49 },
            { min: 30, max: 34.9, width: 196.49 }, 
            { min: 35, max: 50, width: 253 },    
        ];

        let pos = 0;
        for (let i = 0; i < faixas.length; i++) {
            const faixa = faixas[i];
            if (valor > faixa.max) {
                pos += faixa.width;
            } else if (valor >= faixa.min) {
                pos += ((valor - faixa.min) / (faixa.max - faixa.min) * faixa.width)
                break;
            }
        }
        return pos;
    }

    const left = needlePosition(imc)

    return (
        <div className={styles.ruler}>
            <div className={styles.colors}> 
            <div className={styles.blue}></div>
            <div className={styles.green}></div>
            <div className={styles.yellow}></div>
            <div className={styles.orange}></div>
            <div className={styles.red}></div>
            
            <div className={styles.needle}
                style={{ left: `${left}px`}}></div>
            
            </div>
        </div>
    )
}

export default IMCBar;