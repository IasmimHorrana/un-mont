import styles from './FlorPlaceholder.module.css';

/** Placeholder ilustrado (SVG simples colorido pela espécie) até existirem os PNGs finais em /assets/flores. */
export function FlorPlaceholder({ cor = '#e3a72f', size = 96, isSpecial = false }) {
  const classes = [styles.wrap, isSpecial ? styles.dourado : ''].filter(Boolean).join(' ');
  return (
    <svg
      className={classes}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Ilustração de flor"
    >
      <g transform="translate(50,50)">
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-22"
            rx="14"
            ry="24"
            fill={cor}
            opacity="0.9"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle r="14" fill={isSpecial ? '#fff3c4' : '#fff8e6'} />
      </g>
    </svg>
  );
}
