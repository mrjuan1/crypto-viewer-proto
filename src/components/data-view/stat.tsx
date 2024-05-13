import { ReactNode, useEffect, useState } from "react";

import styles from "./stat.module.css";

interface StatProps {
  label: string;
  inline?: boolean;
  valueChange?: number;
  children: ReactNode;
}

const Stat = (props: StatProps): ReactNode => {
  const [valueClass, setValueClass] = useState<string | undefined>("");

  useEffect(() => {
    if (props.valueChange === undefined) {
      setValueClass(undefined);
    } else {
      if (props.valueChange >= 0) {
        setValueClass(styles.increased);
      } else {
        setValueClass(styles.decreased);
      }
    }
  }, [props.valueChange]);

  // TODO: Remove below, used for debugging
  useEffect(() => {
    console.log(valueClass);
  }, [valueClass]);

  return (
    <div
      className={`${styles.stat}${props.inline ? ` ${styles["inline-stat"]}` : ""}`}
    >
      <div className={styles["stat-label"]}>{props.label}</div>
      <div className={valueClass}>{props.children}</div>
    </div>
  );
};

export default Stat;
