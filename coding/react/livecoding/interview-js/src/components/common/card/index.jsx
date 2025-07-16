import styles from './index.module.css';

const Card = ({ children }) => {
  return <section className={styles.card}>{children}</section>;
};

export default Card;
