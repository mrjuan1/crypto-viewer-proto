import styles from "./loader.module.css";

const Loader = () => (
  <div className={styles.container}>
    <div className={styles.background}></div>
    <div className={styles.loader}></div>
  </div>
);

export default Loader;
