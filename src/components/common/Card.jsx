import styles from './Card.module.css';

export function Card({ as: Component = 'div', onClick, className = '', children, ...props }) {
  const classes = [styles.card, onClick ? styles.clickable : '', className]
    .filter(Boolean)
    .join(' ');
  const Tag = onClick && Component === 'div' ? 'button' : Component;
  return (
    <Tag
      className={classes}
      onClick={onClick}
      type={Tag === 'button' ? 'button' : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
