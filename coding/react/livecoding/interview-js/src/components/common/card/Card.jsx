import React from 'react';
import styles from './Card.module.css';

const Card = React.memo(({ children }) => {
  return <section className={styles.card}>{children}</section>;
});

Card.displayName = 'Card';

export default Card;
