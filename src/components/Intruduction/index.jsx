import styles from "./Introduction.module.css"

const Introduction = () => {
    
    return (
        <header>
            <h1 className={styles.title}>Calculadora IMC</h1>
            <h2 className={styles.title}>Antes de Tudo, Oque é o IMC?</h2>
            <p className={styles.text}>IMC (Índice de Massa Corporal) é um cálculo usado para avaliar se o peso de uma pessoa está adequado em relação à sua altura. Ele é obtido dividindo o peso (em kg) pela altura ao quadrado (em metros). O resultado indica categorias como abaixo do peso, peso normal, sobrepeso ou obesidade.</p>
        </header>
    )
}

export default Introduction;