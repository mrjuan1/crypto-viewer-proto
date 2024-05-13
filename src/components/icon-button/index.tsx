import { MouseEventHandler, ReactNode } from "react";

import styles from "./styles.module.css";

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}

const IconButton = (props: IconButtonProps): ReactNode => {
  return (
    <div className={styles.button} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default IconButton;
