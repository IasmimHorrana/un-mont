import styles from './Button.module.css';

export function Button({ variant = 'primary', className = '', ...props }) {
  const classes = [styles.button, variant === 'secondary' ? styles.secondary : '', className]
    .filter(Boolean)
    .join(' ');
  return <button type="button" className={classes} {...props} />;
}
