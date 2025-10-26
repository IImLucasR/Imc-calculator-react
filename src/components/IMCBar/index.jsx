import React, { useEffect, useRef, useState } from "react";
import styles from "./IMCBar.module.css";

const faixas = [
  { min: 0, max: 18.5 },
  { min: 18.5, max: 24.9 },
  { min: 25, max: 29.9 },
  { min: 30, max: 34.9 },
  { min: 35, max: 50 },
];

export default function IMCBar({ imc = 0 }) {
  const rulerRef = useRef(null);
  const colorsRef = useRef(null);
  const [measuredWidths, setMeasuredWidths] = useState([]);
  const [colorsOffset, setColorsOffset] = useState(0);

  useEffect(() => {
    const measure = () => {
      const ruler = rulerRef.current;
      const colors = colorsRef.current;
      if (!ruler || !colors) return;

      const children = Array.from(colors.children);
      const widths = children.map((ch) =>
        Math.round(ch.getBoundingClientRect().width)
      );
      setMeasuredWidths(widths);

      const offset = Math.round(
        colors.getBoundingClientRect().left - ruler.getBoundingClientRect().left
      );
      setColorsOffset(offset);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const totalColorsWidth = measuredWidths.reduce((a, b) => a + b, 0);
  const rulerWidth = rulerRef.current?.getBoundingClientRect().width || 0;

  const maxLeft = Math.min(colorsOffset + totalColorsWidth, rulerWidth);

  const needlePosition = (valor) => {
    if (!measuredWidths.length) return 0;

    const minValue = faixas[0].min;
    const maxValue = faixas[faixas.length - 1].max;
    const clampedValue = Math.max(minValue, Math.min(valor, maxValue));

    let pos = 0;
    for (let i = 0; i < faixas.length; i++) {
      const faixa = faixas[i];
      const w = measuredWidths[i] || 0;

      if (clampedValue > faixa.max) {
        pos += w;
      } else if (clampedValue >= faixa.min) {
        const ratio =
          (clampedValue - faixa.min) / (faixa.max - faixa.min || 1);
        pos += ratio * w;
        break;
      }
    }

    const finalLeft = colorsOffset + pos;
    return Math.max(0, Math.min(finalLeft, maxLeft));
  };

  const left = needlePosition(Number(imc) || 0);

  return (
    <div className={styles.ruler} ref={rulerRef}>
      <div className={styles.colors} ref={colorsRef}>
        <div className={styles.blue}></div>
        <div className={styles.green}></div>
        <div className={styles.yellow}></div>
        <div className={styles.orange}></div>
        <div className={styles.red}></div>
        <div
          className={styles.needle}
          style={{ left: `${left}px` }}
          aria-hidden
        ></div>
      </div>
    </div>
  );
}
