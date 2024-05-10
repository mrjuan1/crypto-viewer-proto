import Image from "next/image";
import styles from "./titlebar.module.css";

export interface TitlebarProps {
  title: string;
}

export const Titlebar = (props: TitlebarProps) => {
  return (
    <div className={styles.titlebar}>
      <div className={styles.logo}></div>
      {props.title}
    </div>
  );
};

export default Titlebar;
